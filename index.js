const express = require('express');
const RoamPrivateApi = require('roam-research-private-api');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || "8000";

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  const body = req.body.Body;
  console.log(body);
  const roam = new RoamPrivateApi(process.env.ROAM_GRAPH_NAME, process.env.ROAM_EMAIL, process.env.ROAM_PASSWORD, {
    headless: true,
  });
  roam.quickCapture( [ body ] );
  res.status(200).send("success");
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
