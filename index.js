const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/dbConnection");
const port = process.env.PORT || 3000;
const ipAddress = process.env.IP_ADDRESS || '192.168.1.75';
const userRegister = require("./routes/userRoute");
// const handleResponse=require('./utils/response')
dotenv.config();



app.use(
  cors({origin: "*",}));
app.use(express.json());
database.connect();

app.use("/users", userRegister);


// app.use((error, req, res) => res.status(error.statusCode ?? 500).json(error));
// app.use((error, req, res, next) => {
//     res.status(error.statusCode || 500).json({ error: error.message || "Internal Server Error" });
//   });

// const handleResponseMiddleware = (req, res, next) => {
//     res.handleResponse = ({ code = 200, message = '', data = '' }) => {
//       handleResponse(res, { code, message, data });
//     };
//     next();
//   };
//   app.use(handleResponseMiddleware);

app.listen(port,ipAddress, () => {
  console.log(`server is running port number,${ipAddress} ${port}`);
});
