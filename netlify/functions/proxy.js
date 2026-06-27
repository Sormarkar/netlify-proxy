export default async (req) => {
  try {
    const url = new URL(req.url);
    const get = url.searchParams.get("get") || "";

    const mpdUrl =
      "https://ucdn.starhubgo.com/bpk-tv/HubSensasiHD/output/manifest.mpd" +
      get;

    const res = await fetch(mpdUrl);

    const text = await res.text();

    return new Response(text, {
      status: res.status,
      headers: {
        "content-type":
          res.headers.get("content-type") || "text/plain",
        "access-control-allow-origin": "*",
      },
    });
  } catch (err) {
    return new Response(err.stack || err.message, {
      status: 500,
    });
  }
};
