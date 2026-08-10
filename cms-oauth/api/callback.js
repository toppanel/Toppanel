// Step 2 of the handshake: GitHub redirects here with a `code`. Exchange
// it for an access token and hand that token back to the Decap CMS popup
// via postMessage, following Decap's github-backend handshake protocol
// (the popup waits for "authorizing:github" before it will accept the
// "authorization:github:success:..." message).
export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) {
    res.status(400).send("Missing OAuth code.");
    return;
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    res.status(500).send("Missing OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET env vars.");
    return;
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const data = await tokenRes.json();

  if (!data.access_token) {
    res.status(400).send(`OAuth exchange failed: ${data.error_description || data.error || "unknown error"}`);
    return;
  }

  const message = `authorization:github:success:${JSON.stringify({ token: data.access_token, provider: "github" })}`;

  res.setHeader("Content-Type", "text/html");
  res.send(`<!doctype html>
<html><body>
<script>
  (function () {
    function receiveMessage(e) {
      if (e.data !== "authorizing:github") return;
      window.opener.postMessage(${JSON.stringify(message)}, e.origin);
      window.removeEventListener("message", receiveMessage, false);
      window.close();
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
로그인 완료 — 이 창은 자동으로 닫힙니다.
</body></html>`);
}
