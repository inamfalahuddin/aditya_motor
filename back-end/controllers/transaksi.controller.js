const response = require("../utils/response");
const db = require("../config/db.con");
const dateFormat = require("../utils/date");

const getTransaksiAll = (req, res) => {
  db.query(
    `SELECT a.id_transaksi, a.tanggal, b.username, e.no_polisi, e.merk_kendaraan, c.nama_mekanik, d.nama_barang, a.qty, d.harga_barang, e.permasalahan, a.total
     FROM transaksi a
     JOIN customer b ON a.id_customer=b.id_customer
     JOIN mekanik c ON a.id_mekanik=c.id_mekanik
     JOIN barang d ON a.id_barang=d.id_barang
     JOIN pesanan e ON a.id_pesanan=e.id_pesanan`,
    (err, rows, fields) => {
      if (err)
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });

      // console.log(result);
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
            `SELECT * FROM transaksi WHERE id_transaksi=${id}`,
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

const getTransaksiByUserId = (req, res) => {
  const { id } = req.params;
  console.log(id);

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
            `SELECT * FROM transaksi WHERE id_customer=${id}`,
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

const addTransaksi = (req, res) => {
  const data = req.body;

  console.log(data);

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
  deleteTransaksi,
};
