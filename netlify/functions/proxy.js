exports.handler = async (event) => {
  try {
    const url = event.queryStringParameters?.url;

    const res = await fetch(url);
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
      body: err.message || "error",
    };
  }
};
