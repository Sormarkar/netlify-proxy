exports.handler = async (event) => {
  try {
    let url = "";

    // ===============================
    // 1. Ambil URL dari PATH
    // /api/proxy/https://example.com/xxx
    // ===============================
    if (event.path.includes("/api/proxy/")) {
      url = event.path.replace("/api/proxy/", "");
    }

    // ===============================
    // 2. Backup: ambil dari QUERY
    // /api/proxy?url=https://example.com
    // ===============================
    if (!url) {
      url = event.queryStringParameters?.url;
    }

    // decode URL kalau encoded
    if (url) {
      url = decodeURIComponent(url);
    }

    // ===============================
    // 3. Validate URL
    // ===============================
    if (!url || !url.startsWith("http")) {
      return {
        statusCode: 400,
        body: "Invalid URL: " + url
      };
    }

    // ===============================
    // 4. FETCH STREAM
    // ===============================
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        "Referer": "https://ucdn.starhubgo.com/",
        "Origin": "https://ucdn.starhubgo.com"
      }
    });

    // ===============================
    // 5. HANDLE FORBIDDEN / ERROR
    // ===============================
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: `Upstream error: ${res.status}`
      };
    }

    const data = await res.text();

    // ===============================
    // 6. RESPONSE
    // ===============================
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
