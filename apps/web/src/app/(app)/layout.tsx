import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="appShell">
      <header className="topNav">
        <div className="topNavInner">
          <Link href="/" className="brand">
            CipherDocs
          </Link>
          <nav className="navLinks">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </nav>
        </div>
      </header>
      <main className="main">{children}</main>
    </div>
  );
}

