exports.handler = async (event) => {
  const url = event.queryStringParameters.url;

  const res = await fetch(url);
  const text = await res.text();

  return {
    statusCode: res.status,
    headers: {
      "content-type": "application/dash+xml",
      "access-control-allow-origin": "*"
    },
    body: text
  };
};
