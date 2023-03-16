const response = require("../utils/response");
const db = require("../config/db.con");

const getRekening = (req, res) => {
  db.query(`SELECT * FROM rekening`, (err, rows, fields) => {
    if (err)
      return response(res, 500, {
        code: err.code,
        sqlMessage: err.sqlMessage,
      });

    console.log("oke lah ya");
    return response(res, 200, "Berhasil", rows, {
      jumlah_data: rows.length,
    });
  });
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

module.exports = { getRekening, updateRekening };
