export default function CmsHomePage() {
  return (
    <main>
      <h1>Payload CMS</h1>
      <p>
        Admin: <a href="/admin">/admin</a>
      </p>
      <p>Public site runs separately (Vite). Point the marketing app at this API (proxied as /api).</p>
    </main>
  );
}
