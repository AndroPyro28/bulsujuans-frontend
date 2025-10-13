import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useSidebarState(cookieKey = "sidebar_state") {
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const cookieValue = Cookies.get(cookieKey);
    setIsOpen(cookieValue === "true");
  }, [cookieKey]);

  const handleChange = (open: boolean) => {
    Cookies.set(cookieKey, String(open), { expires: 7 }); // persists for 7 days
    setIsOpen(open);
  };

  return { isOpen, handleChange };
}
