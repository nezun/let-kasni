const scenario = process.env.MOCK_PRODUCTION_SCENARIO || "healthy";
const gitCommitSha = scenario === "wrong-sha" ? "stale-sha" : "fixture-production-sha";
const supabaseConfigured = scenario !== "missing-supabase";

globalThis.fetch = async (input, init = {}) => {
  const url = new URL(String(input));
  const route = `${url.pathname}${url.search}`;

  if (scenario === "network-error") {
    throw new TypeError("mock network failure");
  }

  if (init.method === "POST" && route === "/claim/submit") {
    if (scenario === "unexpected-submit") {
      return Response.json({ ok: true }, { status: 200 });
    }
    return Response.json({ error: "invalid_input" }, { status: 400 });
  }

  if (route === "/api/health") {
    if (scenario === "malformed-health") {
      return new Response("not-json", { status: 200 });
    }
    if (scenario === "health-not-ok") {
      return Response.json({ ok: false }, { status: 503 });
    }
    return Response.json({
      ok: true,
      deployment: { gitCommitSha },
      checks: { supabaseConfigured },
    });
  }

  const pages = {
    "/": "Let je kasnio 3+ sata Šta se dogodilo sa Vašim letom?",
    "/en": `<title>letkasni.rs</title> Flight delayed 3+ hours ${scenario === "missing-locale" ? "" : "What happened to your flight?"}`,
    "/proveri-let?step=2&issue=delay": "Detalji Vašeg leta",
    "/en/check-flight?step=2&issue=delay": "Your flight details",
  };

  if (scenario === "page-500" && route === "/") {
    return new Response("server error", { status: 500 });
  }

  return new Response(pages[route] || "not found", {
    status: pages[route] ? 200 : 404,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
};
