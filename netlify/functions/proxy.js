const cache = new Map();
const CACHE_TTL = 60000;

export default async (req) => {
  const urlPath = req.url.split("/api/proxy/")[1] || "";

  const baseUrl = "https://ucdn.starhubgo.com/bpk-tv/HubSensasiHD/output/manifest.mpd";
  const targetUrl = baseUrl + urlPath;

  const cached = cache.get(targetUrl);

  if (cached && Date.now() - cached.time < CACHE_TTL) {
    return new Response(cached.data, {
      headers: { "X-Cache": "HIT" }
    });
  }

  const res = await fetch(targetUrl);
  const data = await res.text();

  cache.set(targetUrl, {
    data,
    time: Date.now()
  });

  return new Response(data, {
    headers: { "X-Cache": "MISS" }
  });
};
