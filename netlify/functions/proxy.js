export default async (req) => {
  const url = new URL(req.url);
  const get = url.searchParams.get("get") || "";

  const mpdUrl =
    "https://ucdn.starhubgo.com/bpk-tv/HubSensasiHD/output/manifest.mpd" +
    get;

  const res = await fetch(mpdUrl);

  const data = await res.text();

  return new Response(data, {
    headers: {
      "content-type": "application/dash+xml",
      "access-control-allow-origin": "*"
    }
  });
};
