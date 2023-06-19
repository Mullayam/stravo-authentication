import React from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
export default function ProtectedLayout({ children }) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  React.useEffect(() => {
    const access_token = cookies.get("access_token") || null;
    if (!access_token) {
      return navigate("/");
    }
  }, []);

  return children;
}
