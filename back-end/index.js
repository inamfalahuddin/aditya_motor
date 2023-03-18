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
const pembayaranRoute = require("./routes/rekening.routes");
const loginRoute = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const sharp = require("sharp");

const multer = require("multer");

dotenv.config();

app.use(bodyParser.json());
app.use(cookieParser());
app.use("/v1/images", express.static("uploads"));

app.use(
  cors({
    credentials: true,
    origin: `http://${process.env.HOST}:3000`,
  })
);

// trying upload image to server
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
});

app.post("/v1/upload", upload.single("image-upload"), async (req, res) => {
  try {
    await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toFile(__dirname + `/uploads/${req.file.originalname}`);

    const pathFile = `${__dirname}/uploads/${req.file.originalname}`;

    res.status(201).send("Image uploaded succesfully");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// routes
app.use(loginRoute);
app.use(mekanikRoute);
app.use(barangRoute);
app.use(suplierRoute);
app.use(pesananRoute);
app.use(customerRoute);
app.use(kendaraanRoute);
app.use(transaksiRoute);
app.use(pembayaranRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `Aditya Motor app listening on http://${process.env.HOST}/${process.env.PORT}`
  );
});
