import { useRouterState } from "@tanstack/react-router";
import { getBanner } from "@/lib/site-imagery";
import { FullBleedBand } from "./FullBleedBand";

export function PageBanner() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  
  const banner = getBanner(pathname);
  if (!banner) return null;
  
  return (
    <FullBleedBand
      image={banner.image}
      alt={banner.alt}
      title={banner.title}
      subtitle={banner.subtitle}
      tone={banner.tone}
      height={banner.height}
    />
  );
}
