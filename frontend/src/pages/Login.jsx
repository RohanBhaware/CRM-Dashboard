import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const submit = async (e) => {

    e.preventDefault();

    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "role",
      res.data.role
    );

    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow w-96"
      >

        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>

        <input
          placeholder="Email"
          className="w-full border p-3 mb-4"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>

      </form>
    </div>
  );
}