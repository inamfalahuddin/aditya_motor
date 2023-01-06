const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mekanikRoute = require("./routes/mekanik.routes");
const barangRoute = require("./routes/barang.routes");
const suplierRoute = require("./routes/suplier.routes");
const pesananRoute = require("./routes/pesanan.routes");
const customerRoute = require("./routes/customer.routes");
const kendaraanRoute = require("./routes/kendaraan.routes");
const transaksiRoute = require("./routes/transaksi.routes");

dotenv.config();

const app = express();

app.use(bodyParser.json());

// routes
app.use(mekanikRoute);
app.use(barangRoute);
app.use(suplierRoute);
app.use(pesananRoute);
app.use(customerRoute);
app.use(kendaraanRoute);
app.use(transaksiRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `Aditya Motor app listening on http://${process.env.HOST}/${process.env.PORT}`
  );
});
