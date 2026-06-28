exports.handler = async (event) => {
  try {
    const fullPath = event.path; 
    const url = fullPath.replace("/.netlify/functions/proxy/", "");

    if (!url) {
      return {
        statusCode: 400,
        body: "Missing URL"
      };
    }

    const res = await fetch(url);
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
      body: err.toString()
    };
  }
};
