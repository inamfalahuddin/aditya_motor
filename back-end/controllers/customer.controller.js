const response = require("../utils/response");
const db = require("../config/db.con");
const bcrypt = require("bcrypt");
// const removeSpaces = require("../utils/removeSpaces");

const getCustomer = (req, res) => {
  db.query(
    `SELECT a.id_customer, a.username, a.email, a.alamat, a.no_tlp, b.nomor_polisi, b.merk_kendaraan FROM customer a
    JOIN kendaraan b
    ON a.id_customer=b.id_customer`,
    (err, rows, fields) => {
      if (err)
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });

      return response(res, 200, "Berhasil", rows, { jumlah_data: rows.length });
    }
  );
};

const getCustomerById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_customer FROM customer WHERE id_customer=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `SELECT id_customer, username, email, alamat, no_tlp FROM customer WHERE id_customer=${id}`,
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

const addCustomer = (req, res) => {
  const data = req.body;

  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(data.password, salt);
  const generateID = Math.floor(100000 + Math.random() * 900000);

  db.query(
    `SELECT email FROM customer WHERE email='${data.email}'`,
    (err, rows, fields) => {
      if (err) return response(res, 500, err.message);

      if (rows.length === 0) {
        db.query(
          `INSERT INTO customer SET ?`,
          [
            {
              ...data,
              id_customer: generateID,
              password: hashPassword,
            },
          ],
          (err, rows, fields) => {
            if (err) return response(res, 500, err.message);
            db.query(
              `INSERT INTO auth SET ?`,
              [
                {
                  id_customer: generateID,
                  token: "",
                  role: "user",
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
          }
        );
      } else {
        return response(res, 404, "Email sudah terdaftar");
      }
    }
  );
};

const updateCustomer = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  db.query(
    `SELECT id_customer FROM customer WHERE id_customer=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `UPDATE customer SET 
             username='${data.username}',
             alamat='${data.alamat}'
             WHERE id_customer=${id}`,
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

const deleteCustomer = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_customer FROM customer WHERE id_customer=${id}`,
    (err, rows, fields) => {
      if (err) return response(res, 500, err.message);

      if (rows.length > 0) {
        db.query(
          `DELETE FROM customer WHERE id_customer=${id}`,
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

const searchCustomer = (req, res) => {};

module.exports = {
  getCustomer,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
