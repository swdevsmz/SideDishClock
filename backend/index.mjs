import https from "https";

export const handler = async (event, context) => {
  let body = "";
  let statusCode = 200;

  const promise = await sendRequest().then(
    (res) => {
      statusCode = 200;
      body = res;
    },
    (error) => {
      statusCode = 500;
      body = "error";
    }
  );

  const response = {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
  };

  return response;
};

async function sendRequest() {
  return new Promise((resolve, reject) => {
    // DMM API ID
    const apiId = "";
    // DMM アフィリエイトID
    const affiliateId = "";
    const min = 1;
    const max = 50000;
    const offset = Math.floor(Math.random() * (max + 1 - min)) + min;
    // DMM 商品検索API URL
    const url =
      `https://api.dmm.com/affiliate/v3/ItemList?` +
      `api_id=${apiId}` +
      `&affiliate_id=${affiliateId}` +
      `&site=FANZA` +
      `&service=digital` +
      `&floor=videoa` +
      `&hits=1` +
      `&offset=${offset}` +
      `&sort=rank` +
      `&output=json`;

    let body = [];
    const req = https.get(url, (res) => {
      res.on("data", (chunk) => body.push(chunk));
      res.on("end", () => {
        const data = Buffer.concat(body);
        resolve(JSON.parse(data));
      });
    });
    req.on("error", (e) => {
      reject(e);
    });
    req.end();
  });
}
