const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/dbConnection");
const port = process.env.PORT || 3000;
const userRegister = require("./routes/userRoute");
const addProduct=require("./routes/productRoute");
const addwarehouse=require("./routes/warehouseroute")
const addstock=require("./routes/stocksRoute")
const addmovement=require("./routes/movementRoutes")
const deadstock=require("./routes/deadstockRoutes")
dotenv.config();



app.use(cors({origin: "*",}));
const ipaddress=process.env.IP_ADDRESS || '0.0.0.0';
app.use(express.json());
database.connect();
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRegister);
app.use("/products",addProduct);
 app.use("/warehouses",addwarehouse);
 app.use('/stocks', addstock);
app.use('/movements',addmovement);
app.use('/deadstocks',deadstock);

// app.use('/stock/warehouse/:warehouseId', stockRoutes);
// app.use('/stock/product/:productId', stockRoutes);

// app.use('/stocks',stocks)

app.listen(port,ipaddress,() => {
  console.log(`server is running port number ${ipaddress} ${port}`);
});
