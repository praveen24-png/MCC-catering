const BASE = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

// ─── HTTP helper ────────────────────────────────────────────────────────────
async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('feast_crm_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  /* The auth middleware returns 401 only when NO token is sent, and 403 when
     jwt.verify() throws — which is what an EXPIRED token produces. Handling
     401 alone left an expired session stuck: the UI still looked logged in,
     but every read 403'd forever and no refresh could clear it. Treat both
     as "this session is dead" and bounce to login. */
  if (res.status === 401 || res.status === 403) {
    if (token) {
      localStorage.removeItem('feast_crm_token');
      window.location.reload();
    }
    throw new Error('Session expired. Please sign in again.');
  }
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ─── Transform helpers (backend snake_case → CRM camelCase) ─────────────────

function mapQuotationStatus(s: string) {
  if (!s) return 'Pending';
  const v = s.toLowerCase();
  if (v === 'accepted') return 'Approved';
  if (v === 'rejected') return 'Rejected';
  return 'Pending'; // draft, sent, expired → Pending
}

function mapInvoiceStatus(s: string) {
  if (!s) return 'Unpaid';
  const v = s.toLowerCase();
  if (v === 'paid') return 'Paid';
  if (v === 'partial' || v === 'overdue') return 'Partial';
  return 'Unpaid';
}

function mapOrderStatus(s: string) {
  if (!s) return 'Confirmed';
  const v = s.toLowerCase();
  if (v === 'completed') return 'Completed';
  if (v === 'cancelled') return 'Completed';
  if (v === 'in_progress') return 'Cooking';
  if (v === 'confirmed') return 'Confirmed';
  if (v === 'pending') return 'Confirmed';
  return 'Confirmed';
}

function mapStatusToQuotationBackend(s: string) {
  if (s === 'Approved') return 'accepted';
  if (s === 'Rejected') return 'rejected';
  return 'draft';
}

function mapStatusToInvoiceBackend(s: string) {
  if (s === 'Paid') return 'paid';
  if (s === 'Partial') return 'partial';
  return 'draft';
}

function transformQuotation(row: any) {
  return {
    id: String(row.id),
    number: row.quotation_number || row.number || '',
    clientName: row.client_name || row.clientName || '',
    phone: (row.client_phone || row.phone || '').replace(/^\+91\s?/, '').trim(),
    email: row.client_email || row.email || '',
    eventDate: row.event_date || row.eventDate || '',
    eventType: row.event_type || row.eventType || '',
    venue: row.venue || '',
    guests: row.no_of_guests || row.guests || 0,
    ratePerPlate: row.guests ? Math.round((row.total_amount || 0) / row.guests) : (row.ratePerPlate || 0),
    total: row.total_amount || row.total || 0,
    status: mapQuotationStatus(row.status),
    items: Array.isArray(row.items) ? row.items.map((it: any) => it.item_name || it) : (row.items || []),
    notes: row.notes || '',
    createdAt: (row.created_at || row.createdAt || '').split('T')[0],
  };
}

function transformInvoice(row: any) {
  return {
    id: String(row.id),
    number: row.invoice_number || row.number || '',
    clientName: row.client_name || row.clientName || '',
    phone: (row.client_phone || row.phone || '').replace(/^\+91\s?/, '').trim(),
    email: row.client_email || row.email || '',
    eventDate: row.event_date || row.eventDate || '',
    eventType: row.event_type || row.eventType || '',
    venue: row.venue || '',
    totalAmount: row.total_amount || row.totalAmount || 0,
    paidAmount: row.advance_paid || row.paidAmount || 0,
    status: mapInvoiceStatus(row.payment_status || row.status),
    dueDate: row.due_date || row.dueDate || '',
    gstIncluded: (row.tax_percentage || 0) > 0,
    notes: row.notes || '',
    createdAt: (row.created_at || row.createdAt || '').split('T')[0],
  };
}

function transformOrder(row: any) {
  return {
    id: String(row.id),
    orderNo: row.order_number || row.orderNo || '',
    clientName: row.client_name || row.clientName || '',
    phone: (row.client_phone || row.phone || '').replace(/^\+91\s?/, '').trim(),
    eventDate: row.event_date || row.eventDate || '',
    eventType: row.event_type || row.eventType || '',
    venue: row.venue || '',
    guests: row.no_of_guests || row.guests || 0,
    headChef: row.head_chef || row.headChef || '',
    staffCount: row.staff_count || row.staffCount || 0,
    status: mapOrderStatus(row.status),
    specialInstructions: row.notes || row.specialInstructions || '',
  };
}

function transformClient(row: any) {
  return {
    id: String(row.id),
    name: row.name || '',
    phone: (row.phone || '').replace(/^\+91\s?/, '').trim(),
    email: row.email || '',
    location: row.city || row.location || '',
    totalEvents: row.totalEvents || 0,
    totalSpent: row.totalSpent || 0,
    notes: row.notes || '',
  };
}

// ─── CRM API ────────────────────────────────────────────────────────────────

export interface EnquiryItem {
  menu_item_id?: number | null;
  item_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface EnquiryPayload {
  name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  event_type?: string;
  event_date: string;          // required by the backend
  venue?: string;
  guests?: number;
  package?: string;
  special_requests?: string;
  items?: EnquiryItem[];
  total_amount?: number;
}

/** Public — no auth. Creates a client + a `pending` order + order_items,
 *  which is exactly what the CRM dashboard reads. */
export const publicAPI = {
  submitEnquiry: (payload: EnquiryPayload) =>
    apiFetch('/enquiries', { method: 'POST', body: JSON.stringify(payload) }),
};

export const crmAPI = {
  login: async (email: string, password: string) => {
    const res = await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    // Backend returns { success, data: { token, user } } — CRM expects { token }
    if (res?.data?.token) return { token: res.data.token };
    if (res?.token) return { token: res.token };
    return res;
  },

  getOrders: async () => {
    const res = await apiFetch('/orders');
    const rows = res?.data || [];
    return { data: rows.map(transformOrder) };
  },

  createOrder: async (data: any) => {
    const body: any = {
      event_date: data.eventDate,
      event_type: data.eventType,
      venue: data.venue,
      no_of_guests: data.guests,
      status: 'pending',
      total_amount: 0,
      notes: data.specialInstructions,
    };
    if (data.clientName || data.phone) {
      const clientId = await ensureClient(data.clientName, data.phone, data.email);
      if (clientId) body.client_id = clientId;
    }
    return apiFetch('/orders', { method: 'POST', body: JSON.stringify(body) });
  },

  updateOrder: (id: number, data: any) => apiFetch(`/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteOrder: (id: number) => apiFetch(`/orders/${id}`, { method: 'DELETE' }),

  getQuotations: async () => {
    const res = await apiFetch('/quotations');
    const rows = res?.data || [];
    return { data: rows.map(transformQuotation) };
  },

  createQuotation: async (data: any) => {
    const body: any = {
      event_date: data.eventDate,
      event_type: data.eventType,
      venue: data.venue,
      no_of_guests: data.guests,
      subtotal: data.total || 0,
      total_amount: data.total || 0,
      tax_amount: 0,
      discount_amount: 0,
      status: mapStatusToQuotationBackend(data.status || 'Pending'),
      notes: data.notes,
      items: (data.items || []).map((name: string) => ({
        item_name: name,
        quantity: 1,
        unit_price: 0,
        total_price: 0,
      })),
    };
    if (data.clientName || data.phone) {
      const clientId = await ensureClient(data.clientName, data.phone, data.email);
      if (clientId) body.client_id = clientId;
    }
    return apiFetch('/quotations', { method: 'POST', body: JSON.stringify(body) });
  },

  updateQuotation: (id: number, data: any) => apiFetch(`/quotations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteQuotation: (id: number) => apiFetch(`/quotations/${id}`, { method: 'DELETE' }),

  getInvoices: async () => {
    const res = await apiFetch('/invoices');
    const rows = res?.data || [];
    return { data: rows.map(transformInvoice) };
  },

  createInvoice: async (data: any) => {
    const body: any = {
      invoice_date: data.createdAt || new Date().toISOString().split('T')[0],
      due_date: data.dueDate,
      event_date: data.eventDate,
      event_type: data.eventType,
      venue: data.venue,
      no_of_guests: 0,
      subtotal: data.totalAmount || 0,
      tax_percentage: data.gstIncluded ? 18 : 0,
      tax_amount: data.gstIncluded ? Math.round((data.totalAmount || 0) * 0.18) : 0,
      discount_amount: 0,
      total_amount: data.totalAmount || 0,
      advance_paid: data.paidAmount || 0,
      balance_due: (data.totalAmount || 0) - (data.paidAmount || 0),
      payment_status: mapStatusToInvoiceBackend(data.status || 'Unpaid'),
      status: 'draft',
      notes: data.notes,
      items: [],
    };
    if (data.clientName || data.phone) {
      const clientId = await ensureClient(data.clientName, data.phone, data.email);
      if (clientId) body.client_id = clientId;
    }
    return apiFetch('/invoices', { method: 'POST', body: JSON.stringify(body) });
  },

  updateInvoice: (id: number, data: any) => apiFetch(`/invoices/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteInvoice: (id: number) => apiFetch(`/invoices/${id}`, { method: 'DELETE' }),

  getClients: async () => {
    const res = await apiFetch('/clients');
    const rows = res?.data || [];
    return { data: rows.map(transformClient) };
  },

  createClient: async (data: any) => {
    const body: any = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      city: data.location,
      notes: data.notes,
    };
    return apiFetch('/clients', { method: 'POST', body: JSON.stringify(body) });
  },

  updateClient: (id: number, data: any) => apiFetch(`/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteClient: (id: number) => apiFetch(`/clients/${id}`, { method: 'DELETE' }),

  getMenuItems: () => apiFetch('/menu-items'),
};

// ─── Helper: find or create client by phone, return client_id ────────────────

async function ensureClient(name: string, phone: string, email?: string): Promise<number | null> {
  try {
    const cleanPhone = (phone || '').replace(/\D/g, '').slice(-10);
    if (!cleanPhone) return null;

    // Try to find existing client by phone
    const res = await apiFetch('/clients');
    const clients = res?.data || [];
    const existing = clients.find((c: any) => {
      const cPhone = (c.phone || '').replace(/\D/g, '').slice(-10);
      return cPhone === cleanPhone;
    });
    if (existing) return parseInt(existing.id, 10);

    // Create new client
    const createRes = await apiFetch('/clients', {
      method: 'POST',
      body: JSON.stringify({ name, phone: cleanPhone, email: email || null, countryCode: '+91' }),
    });
    if (createRes?.data?.id) return createRes.data.id;
    return null;
  } catch {
    return null;
  }
}
