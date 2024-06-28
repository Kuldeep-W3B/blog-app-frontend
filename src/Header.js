import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      if (response.ok) {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
        });
      }
    });
  }, [setUserInfo]);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    }).then(() => {
      setUserInfo(null);
    });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">CodersBlog</Link>
      <nav>
        {username ? (
          <>
            <Link className="create-post" to="/create">Create Post</Link>
            <button className="create-post-button" onClick={logout}>Logout ({username})</button>
          </>
        ) : (
          <>
            <Link className="nav-login" to="/login">Login</Link>
            <Link className="nav-register" to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
