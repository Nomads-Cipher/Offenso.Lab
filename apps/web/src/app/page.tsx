export default function Home() {
  return (
    <div className="card">
      <div className="cardHeader">
        <div className="pill">Document storage • Search • Sharing • Comments</div>
      </div>
      <div className="cardBody">
        <h1 style={{ fontSize: 34, lineHeight: 1.1, marginBottom: 10 }}>CipherDocs</h1>
        <p className="hint" style={{ maxWidth: 720, marginBottom: 18 }}>
          Upload, organize, and collaborate on internal documents. Built for teams that need fast access
          to important files across projects and departments.
        </p>

        <div className="btnRow" style={{ marginBottom: 18 }}>
          <a className="btn btnPrimary" href="/register">
            Create account
          </a>
          <a className="btn" href="/login">
            Sign in
          </a>
          <a className="btn" href="/dashboard">
            Go to dashboard
          </a>
        </div>

        <div className="row">
          <div className="card" style={{ flex: "1 1 320px" }}>
            <div className="cardBody">
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Fast uploads</div>
              <div className="hint">Store PDFs, reports, checklists, and incident notes in one place.</div>
            </div>
          </div>
          <div className="card" style={{ flex: "1 1 320px" }}>
            <div className="cardBody">
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Team comments</div>
              <div className="hint">Leave context directly on documents to keep reviews moving.</div>
            </div>
          </div>
          <div className="card" style={{ flex: "1 1 320px" }}>
            <div className="cardBody">
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Simple access</div>
              <div className="hint">Quick navigation with predictable document links.</div>
            </div>
          </div>
        </div>

        <div
          style={{ display: "none" }}
          dangerouslySetInnerHTML={{
            __html: `<!--\nInternal notes:\n- Debug endpoints: /__debug/config /__debug/users /__debug/logs\n- Internal admin API: /api/v1/internal/admin\n- Debug header: X-Debug-Key = nvault_debug_2024_internal\n- Internal API key: nvk_d56f1953e015cc01e79c84028089135d\n\nKnown issues (backlog):\n- ENG-3456: JWT alg confusion hardening\n- ENG-4892: XSLT injection surface review\n- ENG-2892: Remove debug endpoints before next release\n-->`
          }}
        />
      </div>
    </div>
  );
}
