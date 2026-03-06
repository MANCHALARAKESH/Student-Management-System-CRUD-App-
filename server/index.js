const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to the Student Management System API");
});

//================== Routes =================
const AuthRoutes = require("./routes/AuthRoutes");
app.use("/api", AuthRoutes);

const UserRoutes = require("./routes/user_route");
app.use("/api", UserRoutes);






mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch((err) => console.error(" Connection error:", err));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
