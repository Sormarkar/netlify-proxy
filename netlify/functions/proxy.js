exports.handler = async (event) => {

  const urlPath = event.path.replace("/api/proxy/", "");

  const baseUrl = "https://ucdn.starhubgo.com/bpk-tv/HubSensasiHD/output/manifest.mpd";

  // kalau kau nak ignore path sepenuhnya:
  const targetUrl = baseUrl;

  try {
    const res = await fetch(targetUrl);

    const data = await res.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/dash+xml",
        "Access-Control-Allow-Origin": "*"
      },
      body: data
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Proxy error"
    };
  }
};
