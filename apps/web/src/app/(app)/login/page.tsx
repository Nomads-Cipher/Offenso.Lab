"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { graphqlRequest } from "@/lib/api";
import { setToken, setUser } from "@/lib/auth";

type LoginData = {
  login: {
    token: string;
    user: { id: string; username: string; email: string; isAdmin: boolean };
  };
};

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await graphqlRequest<LoginData>(
        `mutation Login($username:String!,$password:String!){ login(username:$username,password:$password){ token user { id username email isAdmin } } }`,
        { username, password }
      );
      setToken(data.login.token);
      setUser(data.login.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="main">
      <div className="card">
        <div className="cardHeader">
          <div className="pill">Sign in</div>
        </div>
        <div className="cardBody">
          <h1 style={{ fontSize: 26, marginBottom: 12 }}>Welcome back</h1>
          <p className="hint" style={{ marginBottom: 16 }}>
            Sign in to access your documents and recent activity.
          </p>

          <form onSubmit={onSubmit} className="row" style={{ maxWidth: 520 }}>
            <div className="field">
              <div className="label">Email or username</div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="admin or admin@cipherdocs.local"
              />
            </div>
            <div className="field">
              <div className="label">Password</div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
              />
            </div>

            <div className="btnRow">
              <button className="btn btnPrimary" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <a className="btn" href="/register">
                Create account
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

