const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/dbConnection");
const port = process.env.PORT || 3000;
const userRegister = require("./routes/userRoute");
const addProduct=require("./routes/productRoute");
const addwarehouse=require("./routes/warehouseroute")
const stocks=require("./routes/stocksRoute")
dotenv.config();



app.use(cors({origin: "*",}));
app.use(express.json());
database.connect();

app.use("/users", userRegister);
app.use("/products",addProduct);
app.use("/warehouse",addwarehouse)
// app.use('/stocks',stocks)

app.listen(port, () => {
  console.log(`server is running port number ${port}`);
});
