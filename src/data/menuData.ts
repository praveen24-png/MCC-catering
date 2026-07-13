export interface FoodItem {
  id: string;
  name: string;
  description: string;
  category: string;
  isVeg: boolean;
  isChefRecommended?: boolean;
  isPremium?: boolean;
  isTrending?: boolean;
  prepTime?: string;
  pricePerHead?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: FoodItem[];
}

export interface LiveCounter {
  id: string;
  name: string;
  description: string;
  icon: string;
  pricePerHead: number;
}

export interface PremiumAddon {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  unit: string;
}

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "welcome-drinks",
    name: "Welcome Drinks",
    icon: "🍹",
    items: [
      { id: "wd1", name: "Fresh Lime Soda", description: "Sweet or salted fresh lime with soda", category: "welcome-drinks", isVeg: true, pricePerHead: 15, prepTime: "5 min" },
      { id: "wd2", name: "Watermelon Juice", description: "Chilled fresh watermelon juice", category: "welcome-drinks", isVeg: true, pricePerHead: 20, prepTime: "5 min" },
      { id: "wd3", name: "Mango Lassi", description: "Creamy Alphonso mango yogurt drink", category: "welcome-drinks", isVeg: true, pricePerHead: 25, prepTime: "8 min", isTrending: true },
      { id: "wd4", name: "Buttermilk (Neer Mor)", description: "Spiced tempered buttermilk", category: "welcome-drinks", isVeg: true, pricePerHead: 12, prepTime: "5 min" },
      { id: "wd5", name: "Filter Coffee", description: "Traditional Kumbakonam degree filter coffee", category: "welcome-drinks", isVeg: true, pricePerHead: 18, prepTime: "10 min", isChefRecommended: true },
      { id: "wd6", name: "Masala Chaas", description: "Cumin-flavored spiced buttermilk", category: "welcome-drinks", isVeg: true, pricePerHead: 15, prepTime: "5 min" },
    ],
  },
  {
    id: "soups",
    name: "Soups",
    icon: "🥣",
    items: [
      { id: "sp1", name: "Tomato Shorba", description: "Spiced roasted tomato soup", category: "soups", isVeg: true, pricePerHead: 22, prepTime: "15 min" },
      { id: "sp2", name: "Rasam Soup", description: "Traditional pepper rasam broth", category: "soups", isVeg: true, pricePerHead: 18, prepTime: "12 min", isChefRecommended: true },
      { id: "sp3", name: "Sweet Corn Soup", description: "Creamy sweet corn with black pepper", category: "soups", isVeg: true, pricePerHead: 25, prepTime: "15 min" },
      { id: "sp4", name: "Veg Hot & Sour", description: "Spicy tangy vegetable broth", category: "soups", isVeg: true, pricePerHead: 25, prepTime: "15 min" },
    ],
  },
  {
    id: "starters",
    name: "Starters",
    icon: "🍛",
    items: [
      { id: "st1", name: "Paneer Tikka", description: "Chargrilled cottage cheese with mint chutney", category: "starters", isVeg: true, pricePerHead: 55, prepTime: "20 min", isTrending: true },
      { id: "st2", name: "Gobi 65", description: "Crispy Chettinad-style cauliflower fry", category: "starters", isVeg: true, pricePerHead: 40, prepTime: "15 min", isChefRecommended: true },
      { id: "st3", name: "Veg Spring Roll", description: "Golden fried mixed vegetable rolls", category: "starters", isVeg: true, pricePerHead: 45, prepTime: "20 min" },
      { id: "st4", name: "Onion Pakoda", description: "Crispy gram flour onion fritters", category: "starters", isVeg: true, pricePerHead: 30, prepTime: "15 min" },
      { id: "st5", name: "Veg Cutlet", description: "Spiced potato beetroot breaded cutlet", category: "starters", isVeg: true, pricePerHead: 35, prepTime: "20 min" },
      { id: "st6", name: "Paneer 65", description: "Spicy deep-fried cottage cheese cubes", category: "starters", isVeg: true, pricePerHead: 55, prepTime: "18 min", isPremium: true },
      { id: "st7", name: "Crispy Corn", description: "Sweet corn tossed in spicy masala", category: "starters", isVeg: true, pricePerHead: 40, prepTime: "15 min" },
      { id: "st8", name: "Mushroom Pepper Fry", description: "Button mushrooms in black pepper masala", category: "starters", isVeg: true, pricePerHead: 50, prepTime: "18 min" },
    ],
  },
  {
    id: "breakfast",
    name: "Breakfast",
    icon: "🌅",
    items: [
      { id: "bf1", name: "Soft Idly", description: "Fluffy steamed rice cakes", category: "breakfast", isVeg: true, pricePerHead: 15, prepTime: "10 min", isChefRecommended: true },
      { id: "bf2", name: "Ghee Roast Dosa", description: "Golden thin crispy roast in pure ghee", category: "breakfast", isVeg: true, pricePerHead: 20, prepTime: "12 min", isTrending: true },
      { id: "bf3", name: "Medu Vada", description: "Crispy lentil donut with ginger pepper", category: "breakfast", isVeg: true, pricePerHead: 18, prepTime: "15 min" },
      { id: "bf4", name: "Ven Pongal", description: "Ghee pepper cashew rice pongal", category: "breakfast", isVeg: true, pricePerHead: 20, prepTime: "15 min" },
      { id: "bf5", name: "Poori Masala", description: "Puffy fried poori with potato masala", category: "breakfast", isVeg: true, pricePerHead: 22, prepTime: "15 min" },
      { id: "bf6", name: "Kancheepuram Idly", description: "Tempered with pepper cumin cashews", category: "breakfast", isVeg: true, pricePerHead: 25, prepTime: "12 min", isPremium: true },
      { id: "bf7", name: "Rava Dosa", description: "Crispy semolina crepe with onions", category: "breakfast", isVeg: true, pricePerHead: 20, prepTime: "12 min" },
      { id: "bf8", name: "Mini Ghee Idly", description: "Tiny idlies floating in sambar with ghee", category: "breakfast", isVeg: true, pricePerHead: 22, prepTime: "10 min" },
      { id: "bf9", name: "Idiyappam", description: "Steamed string hoppers with coconut milk", category: "breakfast", isVeg: true, pricePerHead: 18, prepTime: "15 min" },
    ],
  },
  {
    id: "rice",
    name: "Rice",
    icon: "🍚",
    items: [
      { id: "rc1", name: "Seeraga Samba Veg Biryani", description: "Fragrant dum biryani in traditional style", category: "rice", isVeg: true, pricePerHead: 65, prepTime: "30 min", isChefRecommended: true, isTrending: true },
      { id: "rc2", name: "Lemon Rice", description: "Tangy tempered lemon rice with peanuts", category: "rice", isVeg: true, pricePerHead: 25, prepTime: "15 min" },
      { id: "rc3", name: "Curd Rice", description: "Creamy curd rice with pomegranate", category: "rice", isVeg: true, pricePerHead: 20, prepTime: "10 min" },
      { id: "rc4", name: "Bisibelabath", description: "Hot lentil rice with ghee and cashews", category: "rice", isVeg: true, pricePerHead: 40, prepTime: "20 min" },
      { id: "rc5", name: "Coconut Rice", description: "Tempered coconut rice with cashews", category: "rice", isVeg: true, pricePerHead: 25, prepTime: "15 min" },
      { id: "rc6", name: "Ghee Rice", description: "Golden cashew raisin ghee rice", category: "rice", isVeg: true, pricePerHead: 30, prepTime: "20 min" },
      { id: "rc7", name: "Vegetable Pulav", description: "Fragrant rice with mixed vegetables", category: "rice", isVeg: true, pricePerHead: 35, prepTime: "20 min" },
      { id: "rc8", name: "Veg Fried Rice", description: "Indo-Chinese style fried rice", category: "rice", isVeg: true, pricePerHead: 35, prepTime: "15 min" },
    ],
  },
  {
    id: "gravies",
    name: "Gravies",
    icon: "🫕",
    items: [
      { id: "gv1", name: "Paneer Butter Masala", description: "Rich creamy tomato gravy with paneer", category: "gravies", isVeg: true, pricePerHead: 55, prepTime: "20 min", isTrending: true },
      { id: "gv2", name: "Arachu Vitta Sambar", description: "Freshly roasted spice blend sambar", category: "gravies", isVeg: true, pricePerHead: 30, prepTime: "20 min", isChefRecommended: true },
      { id: "gv3", name: "Kalyana Vathakulambu", description: "Tangy sundakkai vathakulambu", category: "gravies", isVeg: true, pricePerHead: 35, prepTime: "25 min" },
      { id: "gv4", name: "Mushroom Masala", description: "Rich onion-tomato mushroom gravy", category: "gravies", isVeg: true, pricePerHead: 50, prepTime: "20 min" },
      { id: "gv5", name: "Kadai Vegetable", description: "Smoky bell pepper veggie kadai", category: "gravies", isVeg: true, pricePerHead: 45, prepTime: "20 min" },
      { id: "gv6", name: "Dal Makhani", description: "Slow-cooked creamy black lentil dal", category: "gravies", isVeg: true, pricePerHead: 45, prepTime: "25 min", isPremium: true },
      { id: "gv7", name: "Poondu Rasam", description: "Aromatic garlic pepper rasam", category: "gravies", isVeg: true, pricePerHead: 20, prepTime: "15 min" },
    ],
  },
  {
    id: "poriyal",
    name: "Poriyal",
    icon: "🥗",
    items: [
      { id: "py1", name: "Beans Poriyal", description: "French beans with fresh coconut", category: "poriyal", isVeg: true, pricePerHead: 22, prepTime: "12 min" },
      { id: "py2", name: "Carrot Poriyal", description: "Grated carrot with coconut and mustard", category: "poriyal", isVeg: true, pricePerHead: 22, prepTime: "12 min" },
      { id: "py3", name: "Cabbage Poriyal", description: "Shredded cabbage stir-fry with dal", category: "poriyal", isVeg: true, pricePerHead: 20, prepTime: "10 min" },
      { id: "py4", name: "Vazhaipoo Poriyal", description: "Banana flower coconut fry", category: "poriyal", isVeg: true, pricePerHead: 30, prepTime: "20 min", isPremium: true, isChefRecommended: true },
      { id: "py5", name: "Special Vegetable Avial", description: "Kerala style mixed vegetable avial", category: "poriyal", isVeg: true, pricePerHead: 35, prepTime: "20 min" },
      { id: "py6", name: "Beetroot Poriyal", description: "Beetroot stir-fry with coconut", category: "poriyal", isVeg: true, pricePerHead: 22, prepTime: "12 min" },
    ],
  },
  {
    id: "kootu",
    name: "Kootu",
    icon: "🍲",
    items: [
      { id: "kt1", name: "Chow Chow Kootu", description: "Chayote squash in coconut-lentil gravy", category: "kootu", isVeg: true, pricePerHead: 22, prepTime: "15 min" },
      { id: "kt2", name: "Urulai Pattani Masala", description: "Baby potato and peas masala", category: "kootu", isVeg: true, pricePerHead: 28, prepTime: "18 min" },
      { id: "kt3", name: "Mor Kuzhambu", description: "Tangy yogurt-based vegetable kootu", category: "kootu", isVeg: true, pricePerHead: 25, prepTime: "15 min", isChefRecommended: true },
      { id: "kt4", name: "Paruppu Urundai Kuzhambu", description: "Lentil balls in tangy tamarind gravy", category: "kootu", isVeg: true, pricePerHead: 30, prepTime: "25 min", isPremium: true },
    ],
  },
  {
    id: "sambar-rasam",
    name: "Sambar & Rasam",
    icon: "🥣",
    items: [
      { id: "sr1", name: "Hotel Sambar", description: "Shallot and drumstick sambar", category: "sambar-rasam", isVeg: true, pricePerHead: 18, prepTime: "15 min", isChefRecommended: true },
      { id: "sr2", name: "Mysore Rasam", description: "Spicy tangy rasam with garlic", category: "sambar-rasam", isVeg: true, pricePerHead: 15, prepTime: "10 min" },
      { id: "sr3", name: "Pepper Rasam", description: "Hot pepper rasam with cumin", category: "sambar-rasam", isVeg: true, pricePerHead: 15, prepTime: "10 min" },
      { id: "sr4", name: "Lemon Rasam", description: "Tangy lemon-flavored rasam", category: "sambar-rasam", isVeg: true, pricePerHead: 15, prepTime: "8 min" },
    ],
  },
  {
    id: "curd-extras",
    name: "Curd & Extras",
    icon: "🫙",
    items: [
      { id: "ce1", name: "Plain Curd", description: "Fresh thick homemade curd", category: "curd-extras", isVeg: true, pricePerHead: 10, prepTime: "2 min" },
      { id: "ce2", name: "Raita", description: "Curd with onion, tomato, cucumber", category: "curd-extras", isVeg: true, pricePerHead: 15, prepTime: "5 min" },
      { id: "ce3", name: "Appalam", description: "Crispy fried papadum", category: "curd-extras", isVeg: true, pricePerHead: 5, prepTime: "5 min" },
      { id: "ce4", name: "Pickle (Mango)", description: "Traditional homemade mango pickle", category: "curd-extras", isVeg: true, pricePerHead: 5, prepTime: "2 min" },
      { id: "ce5", name: "Banana (Ripe)", description: "Sweet ripened Nendran banana", category: "curd-extras", isVeg: true, pricePerHead: 8, prepTime: "1 min" },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    icon: "🍮",
    items: [
      { id: "ds1", name: "Elaneer Payasam", description: "Tender coconut payasam with cardamom", category: "desserts", isVeg: true, pricePerHead: 45, prepTime: "20 min", isChefRecommended: true, isPremium: true, isTrending: true },
      { id: "ds2", name: "Gulab Jamun", description: "Soft milk dumplings in sugar syrup", category: "desserts", isVeg: true, pricePerHead: 30, prepTime: "20 min", isTrending: true },
      { id: "ds3", name: "Rasamalai", description: "Cottage cheese discs in saffron milk", category: "desserts", isVeg: true, pricePerHead: 50, prepTime: "30 min", isPremium: true },
      { id: "ds4", name: "Traditional Mysurpa", description: "Melt-in-mouth ghee Mysurpa", category: "desserts", isVeg: true, pricePerHead: 35, prepTime: "25 min" },
      { id: "ds5", name: "Jangiri", description: "Traditional deep-fried urad dal sweet", category: "desserts", isVeg: true, pricePerHead: 30, prepTime: "20 min", isChefRecommended: true },
      { id: "ds6", name: "Gajar Ka Halwa", description: "Warm carrot halwa with dry fruits", category: "desserts", isVeg: true, pricePerHead: 35, prepTime: "30 min" },
    ],
  },
  {
    id: "sweets",
    name: "Sweets",
    icon: "🍬",
    items: [
      { id: "sw1", name: "Rasagulla", description: "Spongy cottage cheese balls in syrup", category: "sweets", isVeg: true, pricePerHead: 28, prepTime: "25 min" },
      { id: "sw2", name: "Adhirasam", description: "Traditional rice flour jaggery sweet", category: "sweets", isVeg: true, pricePerHead: 25, prepTime: "20 min", isChefRecommended: true },
      { id: "sw3", name: "Laddu (Boondi)", description: "Gram flour ghee laddu", category: "sweets", isVeg: true, pricePerHead: 22, prepTime: "30 min" },
      { id: "sw4", name: "Halwa (Wheat)", description: "Rich ghee wheat halwa", category: "sweets", isVeg: true, pricePerHead: 28, prepTime: "25 min" },
    ],
  },
  {
    id: "ice-cream",
    name: "Ice Cream",
    icon: "🍨",
    items: [
      { id: "ic1", name: "Vanilla Ice Cream", description: "Classic Madagascar vanilla", category: "ice-cream", isVeg: true, pricePerHead: 25, prepTime: "2 min" },
      { id: "ic2", name: "Kulfi", description: "Traditional saffron pistachio kulfi", category: "ice-cream", isVeg: true, pricePerHead: 30, prepTime: "2 min", isChefRecommended: true },
      { id: "ic3", name: "Mango Ice Cream", description: "Creamy Alphonso mango ice cream", category: "ice-cream", isVeg: true, pricePerHead: 28, prepTime: "2 min" },
      { id: "ic4", name: "Rose Petal Ice Cream", description: "Delicate rose-flavored ice cream", category: "ice-cream", isVeg: true, pricePerHead: 28, prepTime: "2 min", isPremium: true },
    ],
  },
  {
    id: "fruits",
    name: "Fruits",
    icon: "🍎",
    items: [
      { id: "fr1", name: "Fresh Fruit Platter", description: "Seasonal fresh fruits beautifully arranged", category: "fruits", isVeg: true, pricePerHead: 25, prepTime: "10 min" },
      { id: "fr2", name: "Fruit Salad with Ice Cream", description: "Mixed fruits topped with vanilla ice cream", category: "fruits", isVeg: true, pricePerHead: 35, prepTime: "8 min" },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "☕",
    items: [
      { id: "bv1", name: "Filter Coffee", description: "Traditional brass dabba filter coffee", category: "beverages", isVeg: true, pricePerHead: 18, prepTime: "10 min", isChefRecommended: true },
      { id: "bv2", name: "Masala Tea", description: "Cardamom-spiced hot tea", category: "beverages", isVeg: true, pricePerHead: 15, prepTime: "8 min" },
      { id: "bv3", name: "Fresh Lime Water", description: "Sweet or salted fresh lime", category: "beverages", isVeg: true, pricePerHead: 10, prepTime: "5 min" },
      { id: "bv4", name: "Sukku Malli Coffee", description: "Herbal ginger coriander coffee", category: "beverages", isVeg: true, pricePerHead: 20, prepTime: "10 min" },
      { id: "bv5", name: "Mineral Water", description: "Packaged drinking water", category: "beverages", isVeg: true, pricePerHead: 5, prepTime: "1 min" },
    ],
  },
  {
    id: "mocktails",
    name: "Mocktails",
    icon: "🧋",
    items: [
      { id: "mk1", name: "Virgin Mojito", description: "Fresh mint lime soda mocktail", category: "mocktails", isVeg: true, pricePerHead: 35, prepTime: "8 min", isTrending: true },
      { id: "mk2", name: "Mango Tango", description: "Mango puree with lime and soda", category: "mocktails", isVeg: true, pricePerHead: 40, prepTime: "8 min" },
      { id: "mk3", name: "Blue Lagoon", description: "Blue curacao with lemonade and ice", category: "mocktails", isVeg: true, pricePerHead: 40, prepTime: "8 min", isPremium: true },
      { id: "mk4", name: "Rose Petal Cooler", description: "Rose syrup with milk and basil seeds", category: "mocktails", isVeg: true, pricePerHead: 35, prepTime: "8 min" },
    ],
  },
];

export const LIVE_COUNTERS: LiveCounter[] = [
  { id: "lc1", name: "Live Dosa Counter", description: "Made-to-order crispy dosas with multiple varieties", icon: "🫓", pricePerHead: 45 },
  { id: "lc2", name: "Appam Counter", description: "Soft lacey appams with vegetable stew", icon: "🫓", pricePerHead: 50 },
  { id: "lc3", name: "Chaat Counter", description: "Pani puri, bhel puri, sev puri live station", icon: "🍿", pricePerHead: 40 },
  { id: "lc4", name: "Mocktail Station", description: "Fresh fruit mocktails prepared live", icon: "🍹", pricePerHead: 55 },
  { id: "lc5", name: "Fruit Carving", description: "Decorative fruit art display", icon: "🍉", pricePerHead: 80 },
  { id: "lc6", name: "Chocolate Fountain", description: "Cascading chocolate with dipping treats", icon: "🍫", pricePerHead: 60 },
];

export const PREMIUM_ADDONS: PremiumAddon[] = [
  { id: "pa1", name: "Welcome Girls", description: "Traditional welcome with aarti and kumkum", icon: "🙏", price: 3000, unit: "pair" },
  { id: "pa2", name: "Flower Decoration", description: "Premium floral mandap and table décor", icon: "🌸", price: 15000, unit: "event" },
  { id: "pa3", name: "Nadaswaram", description: "Traditional live nadaswaram musicians", icon: "🎵", price: 8000, unit: "event" },
  { id: "pa4", name: "Live Music", description: "Classical or contemporary live band", icon: "🎶", price: 12000, unit: "event" },
  { id: "pa5", name: "Photography", description: "Professional event photography", icon: "📸", price: 20000, unit: "event" },
  { id: "pa6", name: "Videography", description: "HD event videography with highlights", icon: "🎥", price: 35000, unit: "event" },
  { id: "pa7", name: "LED Wall", description: "Large LED display wall for visuals", icon: "📺", price: 25000, unit: "event" },
  { id: "pa8", name: "Return Gifts", description: "Premium packed return gift boxes", icon: "🎁", price: 150, unit: "guest" },
];

export const EVENT_TYPES = [
  { id: "wedding", label: "Wedding", icon: "💒" },
  { id: "reception", label: "Reception", icon: "🎉" },
  { id: "engagement", label: "Engagement", icon: "💍" },
  { id: "seemantham", label: "Seemantham", icon: "🤱" },
  { id: "birthday", label: "Birthday", icon: "🎂" },
  { id: "corporate", label: "Corporate", icon: "🏢" },
  { id: "housewarming", label: "Griha Pravesham", icon: "🏠" },
  { id: "other", label: "Other", icon: "✨" },
];

export const MEAL_TYPES = [
  { id: "breakfast", label: "Breakfast", icon: "🌅", time: "7 AM - 10 AM" },
  { id: "lunch", label: "Lunch", icon: "☀️", time: "12 PM - 3 PM" },
  { id: "dinner", label: "Dinner", icon: "🌙", time: "6 PM - 10 PM" },
  { id: "full-day", label: "Full Day", icon: "✨", time: "All meals" },
];

export const MENU_STYLES = [
  { id: "banana-leaf", label: "Banana Leaf Virundhu", desc: "Traditional course-by-course menu served on banana leaf", icon: "🍃" },
  { id: "buffet", label: "Premium Buffet", desc: "Elegant multi-cuisine buffet spread", icon: "🍽️" },
  { id: "thali", label: "Royal Thali", desc: "Grand individual thali service", icon: "🥘" },
  { id: "combo", label: "Mixed Combo", desc: "Banana leaf + live counters combination", icon: "✨" },
];
