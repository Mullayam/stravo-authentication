const express = require("express");
const app = express();
const axios = require("axios");
const Config = require("./config.json");
const URL = `http://www.strava.com/oauth/authorize?client_id=${Config.Client_ID}&response_type=code&redirect_uri=${Config.Callback_URL}&approval_prompt=force&scope=read,activity:read,activity:read_all`;

const strava = require("strava-v3");
// const Stra = new strava.client("6029d55709cd1d50c68f2d6422eec56cef50520e");

if (Config.ENVIRONMENT === "PRODUCTION") {
  app.use("/",express.static("main/build"));
}
 

// Logine URL

app.get("/login", function (req, res) {
  res.redirect(URL);
});
// Authredirect

app.get("/callback", async function (req, res) {
  const { code } = req.query;
  const URL_PARAMS = new URLSearchParams({
    client_id: Config.Client_ID,
    client_secret: Config.Client_Secret,
    code: code,
    grant_type: "authorization_code",
  });
  const WholeURL = `https://www.strava.com/oauth/token?${URL_PARAMS}`;

  try {
    const { data } = await axios.post(WholeURL);
    const {refresh_token,access_token,athlete}= data      
    res.cookie("access_token", access_token);
    res.cookie("refresh_token", refresh_token);
    res.cookie("client", JSON.stringify(athlete));
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});
// Logoutt Route
app.get("/logout", async function (req, res) { 
 
  try {
    const { data } = await axios.post(
      "https://www.strava.com/oauth/deauthorize"
    );
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});
// Refresh Token Route
app.get("/refresh-token", async function (req, res) {
  const { refresh_token } = req.header || null;
  if (refresh_token === null  || refresh_token === "undefined") {
    return res.send({ message:"Refresh token is required"})
  }
  const URL_PARAMS = new URLSearchParams({
    client_id: Config.Client_ID,
    client_secret: Config.Client_Secret,
    refresh_token: ReplaceWithRefreshToken,
    grant_type: "refresh_token ",
  });
  const WholeURL = `https://www.strava.com/api/v3/oauth/token?${URL_PARAMS}`;

  try {
    const { data } = await axios.post(WholeURL);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});
 
app.listen(5200, () => console.log("http://localhost:5200"));
