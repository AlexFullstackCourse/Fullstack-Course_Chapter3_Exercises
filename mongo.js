const mongoose = require("mongoose");

const numberOfCmdLineArgs = process.argv.length;

if (numberOfCmdLineArgs < 3) {
  console.log(
    "give password, name (in quotes) and number OR just the passwort as argument"
  );
  process.exit(1);
} else {
  const password = process.argv[2];

  const url = `mongodb+srv://alexanderheidorn:${password}@cluster0.h6hnwap.mongodb.net/Phonebook?retryWrites=true&w=majority`;

  mongoose.set("strictQuery", false);
  mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);

  if (numberOfCmdLineArgs > 3) {
    const newName = process.argv[3];
    const newNumber = process.argv[4];

    const person = new Person({
      name: newName,
      number: newNumber,
    });

    person.save().then((result) => {
      console.log(
        `Added ${newName} with phone number ${newNumber} to phonebook!`
      );
      mongoose.connection.close();
    });
  } else {
    console.log("Phonebook:");
    Person.find({}).then((result) => {
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
      mongoose.connection.close();
    });
  }
}
