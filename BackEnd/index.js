// Loading node packages

const dotenv = require("dotenv")
const express = require("express");
const cors = require("cors");
const app = express();
const { hash, compare } = require("bcrypt");
const { MongoClient } = require("mongodb");

// Env variables

dotenv.config();

// Setting mongodb

const mclient = new MongoClient(
  process.env.MONGODBHREF
);

const accounts = mclient.db().collection("accounts");

// Setting app

app.set("trust proxy", true);
app.use(
  cors({ origin: ["http://localhost:9000"] })
);
app.use(express.json());

// Turn on the server

app.listen(3000, () => {
  console.log("Server on");
});

// Create account

app.post("/createAccount", async function (request, response) {
  // Finding account by name

  const account = await accounts.findOne({ name: request.body.name });

  // Returning errors

  if (!request.body.password || !request.body.name) {
    response.send({ req: "No password or name" });
  } else if (account) {
    response.send({
      req: "There is account with this name. Choose another one",
    });
  }

  // Loading success information

  else {

    // Hashing password

    hash(request.body.password, 10, (err, hashing) => {
      if (err) {
        console.log(err);
      }

      // Hashing ip for token

      hash(String(request.ip), 10, (err, authToken) => {
        if (err) {
          console.log(err);
        } else {

          // Inserting token to database
          
          const data = { name: request.body.name, password: hashing, token: authToken };
          accounts.insertOne(data);
          const resp = {
            req: "Success",
            token: data.token,
            info: { name: data.name },
          };
          response.send(resp);
        }
      });
    });
  }
});

// Login account

app.post("/loginAccount", async function (request, response) {
  // Getting acount from database

  const account = await accounts.findOne({
    name: request.body.name,
  });

  // Returning error

  if (!account) {
    response.send({ req: "Incorrect name or password" });
    return;
  }

  // Comparison password with hash

  compare(request.body.password, account.password, (err, result) => {
    if (err) {
      console.log(err);
    }

    // Hashing ip for token

    else if (result) {
      hash(String(request.ip), 10, (err, token) => {
        if (err) {
          console.log(err);
        } else {

          // Updating token of account in database

          accounts.updateOne(
            { name: request.body.name },
            { $set: { token: token } }
          );

          // Returning account information

          response.send({
            req: "Success",
            token: token,
            info: { name: account.name },
          });
        }
      });
    }

    // Returning information without token

    else if (result) {
      response.send({ req: "Success", info: { name: account.name } });
    }

    // Returning error

    else {
      response.send({ req: "Incorrect name or password" });
    }
  });
});

// Comparing token from autologin

app.post("/getInfo", function (request, response) {

  // Comparison user ip and token

  compare(String(request.ip), request.body.token, async (err, succ) => {
    if (succ) {

      // Getting account by token

      const account = await accounts.findOne({ token: request.body.token });
      if (account) {

        // Returning user info

        response.send({ name: account.name });
      }
    }
    response.send(undefined)
  });
});