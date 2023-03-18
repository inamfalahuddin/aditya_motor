const response = require("../utils/response");
const db = require("../config/db.con");
const dateFormat = require("../utils/date");

const getTransaksiAll = (req, res) => {
  db.query(
    `SELECT a.id_transaksi, a.tanggal, a.biaya_operasi, b.username, c.no_polisi, c.merk_kendaraan, d.nama_mekanik FROM transaksi a
    JOIN customer b ON a.id_customer=b.id_customer
    JOIN pesanan c ON a.id_pesanan=c.id_pesanan
    JOIN mekanik d ON a.id_mekanik=d.id_mekanik`,
    (err, rows, fields) => {
      if (err)
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });

      const result = rows.map((row) => ({
        ...row,
        tanggal: dateFormat(row.tanggal),
      }));

      return response(res, 200, "Berhasil", result, {
        jumlah_data: rows.length,
      });
    }
  );
};

const getTransaksiById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT a.id_transaksi, a.tanggal, a.biaya_operasi, b.username, c.no_polisi, c.merk_kendaraan, c.permasalahan, d.nama_mekanik, a.barang, a.total, a.qty FROM transaksi a
      JOIN customer b ON a.id_customer=b.id_customer
      JOIN pesanan c ON a.id_pesanan=c.id_pesanan
      JOIN mekanik d ON a.id_mekanik=d.id_mekanik
      WHERE a.id_transaksi='${id}'
     `,
    (err, rows, fields) => {
      if (err)
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });

      const result = rows.map((row) => ({
        ...row,
        tanggal: dateFormat(row.tanggal),
      }));

      return response(res, 200, "Berhasil", result, {
        jumlah_data: rows.length,
      });
    }
  );
};

// const getTransaksiById = (req, res) => {
//   const { id } = req.params;

//   db.query(
//     `SELECT id_transaksi FROM transaksi WHERE id_transaksi=${id}`,
//     (err, rows, fields) => {
//       if (err) {
//         return response(res, 500, {
//           code: err.code,
//           sqlMessage: err.sqlMessage,
//         });
//       } else {
//         if (rows.length > 0) {
//           db.query(
//             `SELECT * FROM transaksi WHERE id_transaksi=${id}`,
//             (err, rows, fields) => {
//               if (err)
//                 return response(res, 500, {
//                   code: err.code,
//                   sqlMessage: err.sqlMessage,
//                 });

//               return response(res, 200, "Berhasil", rows);
//             }
//           );
//         } else {
//           return response(res, 404, `Tidak ada data dengan id ${id}`);
//         }
//       }
//     }
//   );
// };

const getTransaksiByUserId = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_transaksi FROM transaksi WHERE id_customer=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `SELECT a.id_transaksi, a.tanggal, a.biaya_operasi, b.username, c.no_polisi, c.merk_kendaraan, d.nama_mekanik, e.status FROM transaksi a
            JOIN customer b ON a.id_customer=b.id_customer
            JOIN pesanan c ON a.id_pesanan=c.id_pesanan
            JOIN mekanik d ON a.id_mekanik=d.id_mekanik
            LEFT JOIN pembayaran e ON a.id_transaksi=e.id_transaksi
            WHERE a.id_customer='${id}'
            `,
            (err, rows, fields) => {
              if (err)
                return response(res, 500, {
                  code: err.code,
                  sqlMessage: err.sqlMessage,
                });

              const result = rows.map((row) => ({
                ...row,
                tanggal: dateFormat(row.tanggal),
              }));

              return response(res, 200, "Berhasil", result, {
                jumlah_data: rows.length,
              });
            }
          );
        } else {
          return response(res, 404, `Tidak ada data dengan id ${id}`);
        }
      }
    }
  );
};

const addTransaksi = (req, res) => {
  const data = req.body;

  const date = new Date();
  const today = date.toISOString().slice(0, 10);

  db.query(
    `INSERT INTO transaksi SET ?`,
    [{ ...data, tanggal: today }],
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

const updateTransaksi = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  db.query(
    `SELECT id_transaksi FROM transaksi WHERE id_transaksi=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `UPDATE transaksi SET ? WHERE id_transaksi=${id}`,
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

const deleteTransaksi = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_transaksi FROM transaksi WHERE id_transaksi=${id}`,
    (err, rows, fields) => {
      if (err) return response(res, 500, err.message);

      if (rows.length > 0) {
        db.query(
          `DELETE FROM transaksi WHERE id_transaksi=${id}`,
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
  getTransaksiAll,
  getTransaksiById,
  getTransaksiByUserId,
  addTransaksi,
  updateTransaksi,
  deleteTransaksi,
};
