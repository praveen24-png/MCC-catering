import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

const HEADER_HEIGHT = 180;
const RETRY_INTERVAL = 50;
const MAX_RETRIES = 30;

function scrollToHash(hash: string) {
  if (!hash) return;
  const id = hash.slice(1);
  let retries = 0;

  const tryScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }
    if (retries < MAX_RETRIES) {
      retries++;
      setTimeout(tryScroll, RETRY_INTERVAL);
    }
  };

  requestAnimationFrame(() => setTimeout(tryScroll, 50));
}

export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      scrollToHash(hash);
    }
  }, [hash, pathname]);

  useEffect(() => {
    const onHashChange = () => {
      scrollToHash(window.location.hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
