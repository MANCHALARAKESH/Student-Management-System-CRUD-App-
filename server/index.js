const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});


// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/student-management-system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB:", err));    




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));