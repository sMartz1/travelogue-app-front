import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../Forms/LoginForm";
export default function Login() {
  return (
    <article className="form-login-container">
      <LoginForm />
      <Link className="login--link-register" to={`/register`}>You do not have an account?</Link>
    </article>
  );
}
