module.exports = async (req) => {
  try {
    const mpdUrl =
      "https://ucdn.starhubgo.com/bpk-tv/HubSensasiHD/output/manifest.mpd";

    const res = await fetch(mpdUrl);
    const text = await res.text();

    return {
      statusCode: res.status,
      headers: {
        "content-type":
          res.headers.get("content-type") || "application/dash+xml",
        "access-control-allow-origin": "*",
      },
      body: text,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};
