const express = require("express");
let bodyParser = require("body-parser");
const { Users } = require("./data");
let cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Awesome Users API!");
});

app.get("/users/get", async (req, res) => {
  res.status(200).send(Users);
});

app.post("/users/create", async (req, res) => {
  try {
    const users = Users.filter((user) => user.name === req.body.name);

    if (users.length === 0) {
      Users.push(req.body);

      res.status(201).send({
        message: "User successfully registered",
        Users,
      });
    } else {
      res.status(401).send({
        message: "User already registered",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
