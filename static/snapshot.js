
(function () {
  const files = {
    "/state": "data/state.json",
    "/events": "data/events.json",
    "/tab/dataset": "data/tab-dataset.json",
    "/tab/experiment": "data/tab-experiment.json",
    "/tab/decision": "data/tab-decision.json",
    "/tab/teaching": "data/tab-teaching.json",
    "/tab/graph": "data/tab-graph.json",
    "/tab/evidence": "data/tab-evidence.json"
  };
  const orig = window.fetch.bind(window);
  window.fetch = function (input, init) {
    const url = typeof input === "string" ? input : (input && input.url) || "";
    const path = url.split("?")[0];
    if (files[path]) return orig(files[path], { cache: "no-store" });
    if (path.startsWith("/action/") || path.startsWith("/job/") || path.startsWith("/fleet")) {
      const body = JSON.stringify({
        status: "idle",
        error: "This GitHub Page is a snapshot of the bayesian-active-learning run. Live jobs stay on the local server."
      });
      const status = path.startsWith("/action/") ? 400 : 200;
      return Promise.resolve(new Response(body, { status: status, headers: { "Content-Type": "application/json" } }));
    }
    return orig(input, init);
  };
})();
