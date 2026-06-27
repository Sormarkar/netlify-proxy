exports.handler = async (event) => {

  const id = event.path.replace("/api/proxy/", "");

  const baseUrl = "https://ucdn.starhubgo.com/bpk-tv/";

  const targetUrl =
    baseUrl + id + "/output/manifest.mpd";

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
