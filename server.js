const express = require('express');
const RoamPrivateApi = require('roam-research-private-api');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || "8000";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  const body = req.body.Body;

  console.log(body); // For logging only

  const roam = new RoamPrivateApi(process.env.ROAM_GRAPH_NAME, process.env.ROAM_EMAIL, process.env.ROAM_PASSWORD, {
    headless: true,
    args: ['--no-sandbox']
  });

  const dailyNoteUid = roam.dailyNoteUid();

  roam.logIn()
      .then( () => roam.createBlock( body, dailyNoteUid ))
      .then( result => roam.close() );

  res.status(200).send("success");
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
