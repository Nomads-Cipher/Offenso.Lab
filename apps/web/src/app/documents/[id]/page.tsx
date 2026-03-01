"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { API_BASE } from "@/lib/config";
import { getToken, getUser } from "@/lib/auth";

type Doc = {
  id: number;
  uuid: string;
  title: string;
  status: string;
  ownerId: string;
  filename: string;
  fileSize: number;
  filePath: string;
  category: string;
  classification: string;
  createdAt?: string;
};

type Comment = {
  id: string;
  documentId: number;
  authorId: string;
  body: string;
  createdAt?: string;
};

export default function DocumentPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const token = useMemo(() => getToken(), []);
  const me = useMemo(() => getUser(), []);

  const [doc, setDoc] = useState<Doc | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !me) router.push("/login");
  }, [token, me, router]);

  async function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const d = await apiRequest<Doc>(`${API_BASE}/documents/${id}`, { token });
      const c = await apiRequest<{ comments: Comment[] }>(`${API_BASE}/documents/${id}/comments`, { token });
      setDoc(d);
      setComments(c.comments ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load document");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  async function onAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    try {
      await apiRequest(`${API_BASE}/documents/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: commentBody }),
        token
      });
      setCommentBody("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add comment");
    }
  }

  async function onDelete() {
    if (!token) return;
    try {
      await apiRequest(`${API_BASE}/documents/${id}/delete`, { method: "POST", token });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  async function onDownload() {
    if (!token || !doc) return;
    try {
      const res = await fetch(`${API_BASE}/documents/${doc.id}/download`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Download failed (${res.status})`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    }
  }

  if (loading) {
    return <div className="hint">Loading...</div>;
  }

  if (error) {
    return (
      <div className="card">
        <div className="cardBody">
          <div className="hint" style={{ color: "var(--danger)" }}>
            {error}
          </div>
          <div className="btnRow" style={{ marginTop: 12 }}>
            <Link className="btn" href="/dashboard">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!doc) return null;

  return (
    <div className="row" style={{ alignItems: "flex-start" }}>
      <div className="card" style={{ flex: "1 1 680px" }}>
        <div className="cardHeader">
          <div className="pill">Document #{doc.id}</div>
        </div>
        <div className="cardBody">
          <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900 }}>{doc.title}</div>
              <div className="hint">{doc.filename}</div>
            </div>
            <div className="btnRow">
              <button className="btn btnPrimary" onClick={onDownload}>
                Download
              </button>
              <button className="btn btnDanger" onClick={onDelete}>
                Delete
              </button>
              <Link className="btn" href="/dashboard">
                Back
              </Link>
            </div>
          </div>

          <div className="row" style={{ marginTop: 14 }}>
            <div className="card" style={{ flex: "1 1 320px" }}>
              <div className="cardBody">
                <div className="label">Owner</div>
                <div style={{ marginBottom: 10 }}>{doc.ownerId}</div>
                <div className="label">Category</div>
                <div style={{ marginBottom: 10 }}>
                  <span className="pill">{doc.category}</span>
                </div>
                <div className="label">Classification</div>
                <div>
                  <span className="pill">{doc.classification}</span>
                </div>
              </div>
            </div>
            <div className="card" style={{ flex: "2 1 420px" }}>
              <div className="cardBody">
                <div className="label">Storage</div>
                <div className="hint" style={{ wordBreak: "break-all" }}>
                  {doc.filePath}
                </div>
                <div style={{ height: 10 }} />
                <div className="label">UUID</div>
                <div className="hint" style={{ wordBreak: "break-all" }}>
                  {doc.uuid}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={{ fontWeight: 800, marginBottom: 10 }}>Comments</div>
            <div className="row" style={{ gap: 10 }}>
              <div className="card" style={{ flex: "1 1 520px" }}>
                <div className="cardBody">
                  {comments.length ? (
                    <div style={{ display: "grid", gap: 10 }}>
                      {comments.map((c) => (
                        <div key={c.id} className="card" style={{ boxShadow: "none" }}>
                          <div className="cardBody">
                            <div className="hint" style={{ marginBottom: 6 }}>
                              {c.authorId}
                            </div>
                            <div>{c.body}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="hint">No comments yet.</div>
                  )}
                </div>
              </div>
              <div className="card" style={{ flex: "1 1 320px" }}>
                <div className="cardBody">
                  <form onSubmit={onAddComment} className="row">
                    <div className="field">
                      <div className="label">Add comment</div>
                      <textarea value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
                    </div>
                    <button className="btn btnPrimary" type="submit">
                      Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

