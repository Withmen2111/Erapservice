import { useLocation } from "react-router-dom";

export default function useIsForm3() {
  const location = useLocation();
  return location.pathname === "/routes/3";
}
