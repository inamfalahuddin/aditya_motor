const db = require("../config/db.con");
const removeSpaces = require("../utils/removeSpaces");
const response = require("../utils/response");

const getKendaraanAll = (req, res) => {
  db.query(`SELECT * FROM kendaraan`, (err, rows, fields) => {
    if (err)
      return response(res, 500, { code: err.code, sqlMessage: err.sqlMessage });
    return response(res, 200, "Berhasil", rows, { jumlah_data: rows.length });
  });
};

const getKendaraanById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_kendaraan FROM kendaraan WHERE id_kendaraan=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `SELECT * FROM kendaraan WHERE id_kendaraan=${id}`,
            (err, rows, fields) => {
              if (err)
                return response(res, 500, {
                  code: err.code,
                  sqlMessage: err.sqlMessage,
                });

              return response(res, 200, "Berhasil", rows);
            }
          );
        } else {
          return response(res, 404, `Tidak ada data dengan id ${id}`);
        }
      }
    }
  );
};

const getKendaraanByCust = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_kendaraan FROM kendaraan WHERE id_customer=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `SELECT * FROM kendaraan WHERE id_customer=${id}`,
            (err, rows, fields) => {
              if (err)
                return response(res, 500, {
                  code: err.code,
                  sqlMessage: err.sqlMessage,
                });

              return response(res, 200, "Berhasil", rows);
            }
          );
        } else {
          return response(res, 404, `Tidak ada data dengan id ${id}`);
        }
      }
    }
  );
};

const addKendaraan = (req, res) => {
  const data = req.body;

  db.query(
    `INSERT INTO kendaraan SET ?`,
    [
      {
        ...data,
        nomor_polisi: removeSpaces(data.nomor_polisi.toUpperCase()),
      },
    ],
    (err, rows, fields) => {
      if (err)
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });

      return response(res, 200, "Berhasil menambahkan data");
    }
  );
};

const updateKendaraan = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  db.query(
    `SELECT id_kendaraan FROM kendaraan WHERE id_kendaraan=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `UPDATE kendaraan SET ? WHERE id_kendaraan=${id}`,
            [data],
            (err, rows, fields) => {
              if (err)
                return response(res, 500, {
                  code: err.code,
                  sqlMessage: err.sqlMessage,
                });

              return response(
                res,
                200,
                `Berhasil memperbarui data '${data.nomor_polisi}'`
              );
            }
          );
        } else {
          return response(res, 404, `Tidak ada data dengan id ${id}`);
        }
      }
    }
  );
};

const deleteKendaraan = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_kendaraan FROM kendaraan WHERE id_kendaraan=${id}`,
    (err, rows, fields) => {
      if (err) return response(res, 500, err.message);

      if (rows.length > 0) {
        db.query(
          `DELETE FROM kendaraan WHERE id_kendaraan=${id}`,
          (err, rows, fields) => {
            if (err) {
              return response(res, 500, err.message);
            } else {
              return response(
                res,
                200,
                `Berhasil menghapus data dengan Id ${id}`
              );
            }
          }
        );
      } else {
        return response(res, 404, `Tidak ada data dengan id ${id}`);
      }
    }
  );
};

module.exports = {
  getKendaraanAll,
  getKendaraanById,
  getKendaraanByCust,
  addKendaraan,
  updateKendaraan,
  deleteKendaraan,
};
