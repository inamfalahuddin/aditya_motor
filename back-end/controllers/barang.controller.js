const db = require("../config/db.con");
const response = require("../utils/response");

const getBarangAll = (req, res) => {
  db.query(`SELECT * FROM barang`, (err, rows, fields) => {
    if (err)
      return response(res, 500, { code: err.code, sqlMessage: err.sqlMessage });
    return response(res, 200, "Berhasil", rows, { jumlah_data: rows.length });
  });
};

const getBarangById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_barang FROM barang WHERE id_barang=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `SELECT * FROM barang WHERE id_barang=${id}`,
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

const addBarang = (req, res) => {
  const data = req.body;

  db.query(
    `INSERT INTO barang SET ?`,
    [{ ...data, id_barang: Math.floor(1000 + Math.random() * 9000) }],
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

const updateBarang = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  db.query(
    `SELECT id_barang FROM barang WHERE id_barang=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `UPDATE barang SET ? WHERE id_barang=${id}`,
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
                `Berhasil memperbarui data '${data.nama_barang}'`
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

const deleteBarang = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_barang FROM barang WHERE id_barang=${id}`,
    (err, rows, fields) => {
      if (err) return response(res, 500, err.message);

      if (rows.length > 0) {
        db.query(
          `DELETE FROM barang WHERE id_barang=${id}`,
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
  getBarangAll,
  getBarangById,
  addBarang,
  updateBarang,
  deleteBarang,
};
