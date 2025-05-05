const mongoose = require("mongoose");
const express = require("express");
const url = "mongodb://localhost:27017/student";
const app = express();
const port = 8085;


const nameSchema = new mongoose.Schema({ user: String, pass: Number });
const Name = mongoose.model("stud", nameSchema);


mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, family: 4 })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


app.use(express.urlencoded({ extended: true }));


app.get("/insert", async (req, res) => {
  const { user, password } = req.query;
  if (!user || !password) {
    return res.send("User and Password are required!");
  }

  const newUser = new Name({ user, pass: parseInt(password) });
  await newUser.save();
  res.send("User inserted successfully!");
});


app.get("/update", async (req, res) => {
  const { user, password } = req.query;
  if (!user || !password) {
    return res.send("User and Password are required for updating!");
  }

  const updatedUser = await Name.findOneAndUpdate(
    { user },
    { pass: parseInt(password) },
    { new: true }
  );

  if (updatedUser) {
    res.send(`Updated ${user} with new password: ${password}`);
  } else {
    res.send("User not found!");
  }
});


app.get("/delete", async (req, res) => {
  const { user } = req.query;
  if (!user) {
    return res.send("User is required for deletion!");
  }

  const result = await Name.deleteOne({ user });
  if (result.deletedCount > 0) {
    res.send(`User ${user} deleted successfully!`);
  } else {
    res.send("User not found!");
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});