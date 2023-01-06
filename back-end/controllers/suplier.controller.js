const response = require("../utils/response");
const db = require("../config/db.con");

const getSuplierAll = (req, res) => {
  db.query(`SELECT * FROM suplier`, (err, rows, fields) => {
    if (err)
      return response(res, 500, { code: err.code, sqlMessage: err.sqlMessage });

    return response(res, 200, "Berhasil", rows, { jumlah_data: rows.length });
  });
};

const getSuplierById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_suplier FROM suplier WHERE id_suplier=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `SELECT * FROM suplier WHERE id_suplier=${id}`,
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

const addSuplier = (req, res) => {
  const data = req.body;

  db.query(`INSERT INTO suplier SET ?`, [data], (err, rows, fields) => {
    if (err)
      return response(res, 500, {
        code: err.code,
        sqlMessage: err.sqlMessage,
      });

    return response(res, 200, "Berhasil menambahkan data");
  });
};

const updateSuplier = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  db.query(
    `SELECT id_suplier FROM suplier WHERE id_suplier=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `UPDATE suplier SET ? WHERE id_suplier=${id}`,
            [data],
            (err, rows, fields) => {
              if (err)
                return response(res, 500, {
                  code: err.code,
                  sqlMessage: err.sqlMessage,
                });
              return response(res, 200, `Berhasil memperbarui data '${id}'`);
            }
          );
        } else {
          return response(res, 404, `Tidak ada data dengan id ${id}`);
        }
      }
    }
  );
};

const deleteSuplier = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_suplier FROM suplier WHERE id_suplier=${id}`,
    (err, rows, fields) => {
      if (err) return response(res, 500, err.message);

      if (rows.length > 0) {
        db.query(
          `DELETE FROM suplier WHERE id_suplier=${id}`,
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
  getSuplierAll,
  getSuplierById,
  addSuplier,
  updateSuplier,
  deleteSuplier,
};
