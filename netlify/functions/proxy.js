exports.handler = async (event) => {
  try {
    let fullPath = event.path || "";

    // buang prefix api/proxy/
    let url = fullPath.replace("/api/proxy/", "");

    // decode kalau ada encoding
    url = decodeURIComponent(url);

    if (!url.startsWith("http")) {
      return {
        statusCode: 400,
        body: "Invalid URL: " + url
      };
    }

    const res = await fetch(url);
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
