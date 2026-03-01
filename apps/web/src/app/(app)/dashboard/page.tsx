"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { graphqlRequest, apiRequest } from "@/lib/api";
import { API_BASE } from "@/lib/config";
import { getToken, getUser, signOut } from "@/lib/auth";

type Doc = {
  id: number;
  title: string;
  ownerId: string;
  filename: string;
  category: string;
  classification: string;
  createdAt?: string | null;
};

type DocumentsData = {
  documents: Doc[];
};

export default function DashboardPage() {
  const router = useRouter();
  const token = useMemo(() => getToken(), []);
  const me = useMemo(() => getUser(), []);

  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [classification, setClassification] = useState("internal");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!token || !me) router.push("/login");
  }, [token, me, router]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await graphqlRequest<DocumentsData>(
          `query { documents { id title ownerId filename category classification createdAt } }`
        );
        if (!cancelled) setDocs(data.documents);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load documents");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const visibleDocs = useMemo(() => {
    if (!me) return docs;
    return showAll ? docs : docs.filter((d) => d.ownerId === me.id);
  }, [docs, showAll, me]);

  async function onUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    if (!file) {
      setError("Please choose a file");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("file", file);
      if (title) fd.set("title", title);
      fd.set("category", category);
      fd.set("classification", classification);

      await apiRequest(`${API_BASE}/documents/upload`, {
        method: "POST",
        body: fd,
        token
      });

      const data = await graphqlRequest<DocumentsData>(
        `query { documents { id title ownerId filename category classification createdAt } }`
      );
      setDocs(data.documents);
      setTitle("");
      setFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function onSignOut() {
    signOut();
    router.push("/login");
  }

  return (
    <div className="row" style={{ alignItems: "flex-start" }}>
      <div className="card" style={{ flex: "1 1 680px" }}>
        <div className="cardHeader">
          <div className="pill">Documents</div>
        </div>
        <div className="cardBody">
          <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>Dashboard</div>
              <div className="hint">{me ? `Signed in as ${me.username}` : ""}</div>
            </div>
            <div className="btnRow">
              <button className="btn" onClick={() => setShowAll((v) => !v)}>
                {showAll ? "Show mine" : "Show all"}
              </button>
              <button className="btn btnDanger" onClick={onSignOut}>
                Sign out
              </button>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            {loading ? (
              <div className="hint">Loading documents...</div>
            ) : error ? (
              <div className="hint" style={{ color: "var(--danger)" }}>
                {error}
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Class</th>
                    <th>File</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleDocs.map((d) => (
                    <tr key={d.id}>
                      <td>{d.id}</td>
                      <td>
                        <Link href={`/documents/${d.id}`} style={{ textDecoration: "underline" }}>
                          {d.title}
                        </Link>
                      </td>
                      <td>
                        <span className="pill">{d.category}</span>
                      </td>
                      <td>
                        <span className="pill">{d.classification}</span>
                      </td>
                      <td className="hint">{d.filename}</td>
                    </tr>
                  ))}
                  {!visibleDocs.length ? (
                    <tr>
                      <td colSpan={5} className="hint">
                        No documents yet.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <div className="card" style={{ flex: "1 1 360px" }}>
        <div className="cardHeader">
          <div className="pill">Upload</div>
        </div>
        <div className="cardBody">
          <form onSubmit={onUpload} className="row">
            <div className="field">
              <div className="label">Title</div>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Optional" />
            </div>
            <div className="field">
              <div className="label">Category</div>
              <input value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="field">
              <div className="label">Classification</div>
              <select value={classification} onChange={(e) => setClassification(e.target.value)}>
                <option value="internal">internal</option>
                <option value="confidential">confidential</option>
                <option value="restricted">restricted</option>
              </select>
            </div>
            <div className="field">
              <div className="label">File</div>
              <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            </div>
            <button className="btn btnPrimary" type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload document"}
            </button>
            <div className="hint">Tip: you can upload text files, reports, and checklists.</div>
          </form>
        </div>
      </div>
    </div>
  );
}

