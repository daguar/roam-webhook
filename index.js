const express = require('express');
const RoamPrivateApi = require('roam-research-private-api');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || "8000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  const body = req.body.myparam;
  console.log(body);
  const roam = new RoamPrivateApi(process.env.ROAM_GRAPH_NAME, process.env.ROAM_EMAIL, process.env.ROAM_PASSWORD, {
    headless: true,
  });

  const dailyNoteUid = roam.dailyNoteUid();

  roam.logIn()
      .then( () => roam.createBlock( body, dailyNoteUid ))
      .then( result => roam.close() );
  //roam.quickCapture( [ body ] );
  //res.status(200).send("success");
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
