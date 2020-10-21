import React from "react";

import { useAuth } from "../hooks/auth";
import { Link } from "react-router-dom";

export default function Header() {
  const auth = useAuth();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <div>
        {auth.loggedIn ? (
          <>Hello {auth.username} - <button type="button" onClick={auth.logout}>Logout</button></>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}
