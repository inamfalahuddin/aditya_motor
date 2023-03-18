const response = require("../utils/response");
const db = require("../config/db.con");
const sharp = require("sharp");
const path = require("path");

const getRekening = (req, res) => {
  db.query(`SELECT * FROM rekening`, (err, rows, fields) => {
    if (err)
      return response(res, 500, {
        code: err.code,
        sqlMessage: err.sqlMessage,
      });

    return response(res, 200, "Berhasil", rows, {
      jumlah_data: rows.length,
    });
  });
};

const getPembayaran = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT * FROM pembayaran WHERE id_transaksi=${id}`,
    (err, rows, fields) => {
      if (err)
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });

      return response(res, 200, "Berhasil", rows, {
        jumlah_data: rows.length,
      });
    }
  );
};

const updateRekening = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  console.log(data);
  const idRekening = 2154882;

  db.query(
    `UPDATE rekening SET 
       atas_nama='${data.nama}',
       nama_bank='${data.bank}',
       no_rekening='${data.no_rek}'
       WHERE id_rekening=${idRekening}`,
    (err, rows, fields) => {
      if (err)
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      return response(res, 200, `Berhasil memperbarui data '${id}'`);
    }
  );
};

const addPembayaran = async (req, res) => {
  const data = req.body;

  if (req.file) {
    const imageURL = path.join(
      __dirname,
      "..",
      `/uploads/${req.file.originalname}`
    );

    try {
      await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toFile(imageURL);

      db.query(
        `INSERT INTO pembayaran SET ?`,
        [
          {
            id_transaksi: data.id_transaksi,
            metode: data.metode,
            bukti_pembayaran: `/images/${req.file.originalname}`,
            status: data.status,
          },
        ],
        (err, rows, fields) => {
          if (err)
            return res.status(500).send({
              code: err.code,
              sqlMessage: err.sqlMessage,
            });
        }
      );

      return res
        .status(201)
        .set({
          "Content-Type": "multipart/form-data",
        })
        .json({ message: "Berhasil menambahkan data" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ data: error });
    }
  } else {
    console.log("oke masuk");
    try {
      db.query(
        `INSERT INTO pembayaran SET ?`,
        [
          {
            id_transaksi: data.id_transaksi,
            metode: data.metode,
            bukti_pembayaran: "",
            status: data.status,
          },
        ],
        (err, rows, fields) => {
          if (err)
            return res.status(500).send({
              code: err.code,
              sqlMessage: err.sqlMessage,
            });
        }
      );

      return res
        .status(201)
        .set({
          "Content-Type": "multipart/form-data",
        })
        .json({ message: "Berhasil menambahkan data" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ data: error });
    }
  }
};

module.exports = { getRekening, getPembayaran, addPembayaran, updateRekening };
