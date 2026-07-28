// Step 1 of the GitHub OAuth handshake Decap CMS needs: send the editor
// to GitHub's consent screen. Deployed separately (see ../README.md)
// since the main site is a static export with no server of its own.
export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    res.status(500).send("Missing OAUTH_CLIENT_ID env var.");
    return;
  }

  const proto = req.headers["x-forwarded-proto"] || "https";
  const redirectUri = `${proto}://${req.headers.host}/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo,user",
  });

  res.writeHead(302, { Location: `https://github.com/login/oauth/authorize?${params}` });
  res.end();
}
