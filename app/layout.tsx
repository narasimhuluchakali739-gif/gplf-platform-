/* @ts-ignore: side-effect CSS import has no module declaration */
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        
        {/* 🔥 NAVBAR */}
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 30px",
          backgroundColor: "#222",
          color: "white"
        }}>
          <h2>Golf Charity</h2>
          <div>
  <a href="/login">
    <button style={{
      marginRight: "10px",
      padding: "6px 12px",
      backgroundColor: "white",
      color: "black",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}>
      Login
    </button>
  </a>
  <a href="/register">
    <button style={{
      padding: "6px 12px",
      backgroundColor: "white",
      color: "black",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}>
      Register
    </button>
  </a>
</div>
        </nav>

        {/* PAGE CONTENT */}
        {children}

      </body>
    </html>
  );
}