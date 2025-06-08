const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/dbConfig");
const cors = require("cors");
const http = require("http");
const fileRouter = require("./routes/fileRoute");

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    exposedHeaders: ["Authorization", "x-access-token", "data-access-token"],
  })
);

app.use("/files", fileRouter);

sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });

const PORT = 4001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});