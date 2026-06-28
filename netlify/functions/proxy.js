exports.handler = async (event) => {
  try {
    const channels = {
      HubSensasiHD:
        "https://ucdn.starhubgo.com/bpk-tv/HubSensasiHD/output/manifest.mpd"
    };

    let url = null;

    // ======================
    // 1. QUERY ?channel=
    // ======================
    const channel = event.queryStringParameters?.channel;
    if (channel && channels[channel]) {
      url = channels[channel];
    }

    // ======================
    // 2. PATH METHOD
    // ======================
    if (!url) {
      let path = event.path || "";
      path = path.replace("/api/proxy/", "").replace("/.netlify/functions/proxy/", "");
      path = decodeURIComponent(path);

      if (path.startsWith("http")) {
        url = path;
      }
    }

    // ======================
    // 3. HARD CHECK
    // ======================
    if (!url) {
      return {
        statusCode: 400,
        body: "Missing URL or channel"
      };
    }

    // ======================
    // 4. FETCH
    // ======================
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://ucdn.starhubgo.com/",
        "Origin": "https://ucdn.starhubgo.com"
      }
    });

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: "Upstream error: " + res.status
      };
    }

    const data = await res.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/dash+xml"
      },
      body: data
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString()
    };
  }
};
