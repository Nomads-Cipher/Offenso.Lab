"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { graphqlRequest } from "@/lib/api";
import { setToken, setUser } from "@/lib/auth";

type RegisterData = {
  register: {
    token: string;
    user: { id: string; username: string; email: string; isAdmin: boolean };
  };
};

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await graphqlRequest<RegisterData>(
        `mutation Register($username:String!,$email:String!,$password:String!){ register(username:$username,email:$email,password:$password){ token user { id username email isAdmin } } }`,
        { username, email, password }
      );
      setToken(data.register.token);
      setUser(data.register.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main">
      <div className="card">
        <div className="cardHeader">
          <div className="pill">Create account</div>
        </div>
        <div className="cardBody">
          <h1 style={{ fontSize: 26, marginBottom: 12 }}>Get started</h1>
          <p className="hint" style={{ marginBottom: 16 }}>
            Create your CipherDocs account to upload and manage documents.
          </p>

          <form onSubmit={onSubmit} className="row" style={{ maxWidth: 520 }}>
            <div className="field">
              <div className="label">Username</div>
              <input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
            </div>
            <div className="field">
              <div className="label">Email</div>
              <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div className="field">
              <div className="label">Password</div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                placeholder="Choose a password"
              />
            </div>

            <div className="btnRow">
              <button className="btn btnPrimary" type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create account"}
              </button>
              <a className="btn" href="/login">
                Sign in
              </a>
            </div>

            {error ? (
              <div className="hint" style={{ color: "var(--danger)" }}>
                {error}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}

