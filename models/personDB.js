/** Module handling the communication with the database */

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const uri = process.env.MONGODB_URI;
console.log("Connecting to", uri);

mongoose
  .connect(uri)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return v.length > 8 && /\b([0-9]{2}|[0-9]{3})-[0-9]+$/.test(v);
      },
      message: `Must be 8 digits or more, consist only of digits and be of the form xx-xxxxxx... or xxx-xxxxxx... !`,
    },
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
