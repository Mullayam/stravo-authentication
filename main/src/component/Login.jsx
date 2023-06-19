import React from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
export default function Login() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  React.useEffect(() => {
    const access_token = cookies.get("access_token") || null;
    if (access_token) {
      return navigate("/my-activities");
    }
  });
  return (
    <div className="App">
      <header className="App-header">
        <a className="App-link" href="/login" rel="noopener noreferrer">
          Click Here To Login
        </a>
      </header>
    </div>
  );
}
