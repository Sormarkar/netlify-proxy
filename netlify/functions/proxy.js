exports.handler = async (event) => {
  try {
    // =========================
    // CHANNEL MAP (SHORT NAME)
    // =========================
    const channels = {
      HubSensasiHD:
        "https://ucdn.starhubgo.com/bpk-tv/HubSensasiHD/output/manifest.mpd"
    };

    let url = "";

    // =========================
    // 1. QUERY METHOD
    // /api/proxy?channel=HubSensasiHD
    // =========================
    const channel = event.queryStringParameters?.channel;
    if (channel && channels[channel]) {
      url = channels[channel];
    }

    // =========================
    // 2. PATH METHOD (FULL URL)
    // /api/proxy/https://example.com/manifest.mpd
    // =========================
    if (!url) {
      url = event.path.replace("/api/proxy/", "");
      url = decodeURIComponent(url);
    }

    // =========================
    // 3. VALIDATE URL
    // =========================
    if (!url || !url.startsWith("http")) {
      return {
        statusCode: 400,
        body: "Invalid URL: " + url
      };
    }

    // =========================
    // 4. FETCH STREAM
    // =========================
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        "Referer": "https://ucdn.starhubgo.com/",
        "Origin": "https://ucdn.starhubgo.com"
      }
    });

    // =========================
    // 5. HANDLE ERROR
    // =========================
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: `Upstream error: ${res.status}`
      };
    }

    const data = await res.text();

    // =========================
    // 6. RESPONSE HEADERS
    // =========================
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Content-Type": "application/dash+xml",
        "Cache-Control": "public, max-age=60"
      },
      body: data
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Function error: " + err.toString()
    };
  }
};
