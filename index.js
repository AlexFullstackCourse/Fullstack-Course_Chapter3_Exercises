const express = require("express");
require("dotenv").config();
var morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/personDB");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("post_content", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post_content"
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  const timestamp = new Date();
  response.send(
    `<div>Phonebook has information about ${persons.length} people</div>
    <p>${timestamp.toString()}</p>`
  );
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: "Name and number required",
    });
  }

  /** Not required for the current task. Leave for later. */
  /*
  if (!!persons.find((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }*/

  /** Delete when the new functionality is working */
  /*
  const person = {
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number,
  };*/

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  // persons = persons.concat(person);

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
