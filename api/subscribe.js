export const config = { runtime: "edge" };

const REPO = "james20141606/ai_finance_news";
const FILE_PATH = "subscribers.json";

export default async function handler(req) {
  // CORS headers for the blog domain
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers }
    );
  }

  const ghToken = process.env.GH_SUBSCRIBER_TOKEN;
  if (!ghToken) {
    return new Response(
      JSON.stringify({ ok: false, error: "Service not configured" }),
      { status: 500, headers }
    );
  }

  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ ok: false, error: "Invalid email address" }),
        { status: 400, headers }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Fetch current subscribers file from GitHub
    const ghHeaders = {
      Authorization: `token ${ghToken}`,
      Accept: "application/vnd.github.v3+json",
    };

    let subscribers = [];
    let sha = null;

    const getRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      { headers: ghHeaders }
    );

    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
      const content = atob(data.content.replace(/\n/g, ""));
      subscribers = JSON.parse(content);
    }

    // Check duplicate
    if (subscribers.includes(normalizedEmail)) {
      return new Response(
        JSON.stringify({ ok: true, message: "Already subscribed" }),
        { status: 200, headers }
      );
    }

    // Add new subscriber
    subscribers.push(normalizedEmail);

    // Update file on GitHub
    const body = {
      message: `Add subscriber ${normalizedEmail}`,
      content: btoa(JSON.stringify(subscribers, null, 2)),
    };
    if (sha) body.sha = sha;

    const putRes = await fetch(
      `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`,
      {
        method: "PUT",
        headers: { ...ghHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!putRes.ok) {
      const err = await putRes.text();
      console.error("GitHub API error:", err);
      return new Response(
        JSON.stringify({ ok: false, error: "Failed to save subscription" }),
        { status: 500, headers }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      { status: 200, headers }
    );
  } catch (e) {
    console.error("Subscribe error:", e);
    return new Response(
      JSON.stringify({ ok: false, error: "Server error" }),
      { status: 500, headers }
    );
  }
}
