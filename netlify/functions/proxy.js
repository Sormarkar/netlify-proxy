exports.handler = async (event) => {

  const id = event.path.replace("/api/proxy/", "");
  const baseUrl = "http://nowult.accesscam.org/hubsports/HubSensasiHD.mpd.link";

  try {
    const res = await fetch(targetUrl);
    const contentType = res.headers.get("content-type") || "";

    const data = await res.text();

    // ❌ detect HTML block page
    if (contentType.includes("text/html") || data.trim().startsWith("<html")) {
      return {
        statusCode: 403,
        body: "Blocked or invalid stream response"
      };
    }

    // ✔️ valid MPD
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
