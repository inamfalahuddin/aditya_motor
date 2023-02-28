const response = require("../utils/response");
const db = require("../config/db.con");
const dateFormat = require("../utils/date");
const removeSpaces = require("../utils/removeSpaces");

const getPesananAll = (req, res) => {
  db.query(
    `SELECT a.id_customer, a.username, b.id_pesanan, b.alamat, b.no_hp, b.no_polisi, b.merk_kendaraan, b.permasalahan, b.pelayanan, b.tanggal, b.jam, b.status, b.no_antrian FROM customer a
            JOIN pesanan b ON a.id_customer=b.id_customer`,
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

const getPesananById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_pesanan FROM pesanan WHERE id_pesanan=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `SELECT a.id_customer, a.username, b.id_pesanan, b.alamat, b.no_hp, b.no_polisi, b.merk_kendaraan, b.permasalahan, b.pelayanan, b.tanggal, b.jam, b.status, b.no_antrian FROM customer a
            JOIN pesanan b ON a.id_customer=b.id_customer
            WHERE b.id_pesanan=${id}`,
            (err, rows, fields) => {
              if (err)
                return response(res, 500, {
                  code: err.code,
                  sqlMessage: err.sqlMessage,
                });

              return response(res, 200, "Berhasil", {
                ...rows[0],
                tanggal: dateFormat(rows[0].tanggal),
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

const getPesananByCustId = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_pesanan FROM pesanan WHERE id_customer=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `SELECT a.id_customer, a.username, b.id_pesanan, b.alamat, b.no_hp, b.no_polisi, b.merk_kendaraan, b.permasalahan, b.pelayanan, b.tanggal, b.jam, b.status, b.no_antrian FROM customer a
            JOIN pesanan b ON a.id_customer=b.id_customer
            WHERE b.id_customer=${id}`,
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

const addPesanan = (req, res) => {
  const data = req.body;
  const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
  const today = date.toISOString().slice(0, 10);
  const time = new Date();
  const currentTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

  db.query(
    `SELECT max(no_antrian) as antrian FROM pesanan WHERE tanggal='${today}'`,
    (err, rows, fields) => {
      if (err) return response(res, 500, "Server Error");

      const noAntrian = rows[0].antrian + 1;

      db.query(
        `INSERT INTO pesanan SET ?`,
        [
          {
            id_customer: data.id_customer,
            alamat: data.alamat,
            no_hp: data.no_hp,
            no_polisi: removeSpaces(data.no_polisi.toUpperCase()),
            merk_kendaraan: data.merk_kendaraan,
            permasalahan: data.permasalahan,
            pelayanan: data.pelayanan,
            tanggal: today,
            jam: currentTime,
            no_antrian: noAntrian,
            status: "pending",
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
};

const updatePesanan = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  db.query(
    `SELECT id_pesanan FROM pesanan WHERE id_pesanan=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `UPDATE pesanan SET 
            alamat='${data.alamat}', 
            no_hp='${data.no_hp}', 
            no_polisi='${data.no_polisi}', 
            merk_kendaraan='${data.merk_kendaraan}', 
            permasalahan='${data.permasalahan}', 
            pelayanan='${data.pelayanan}', 
            status='${data.status}' 
            WHERE id_pesanan=${id}`,
            (err, rows, fields) => {
              if (err)
                return response(res, 500, {
                  code: err.code,
                  sqlMessage: err.sqlMessage,
                });
              // db.query(
              //   `SELECT status FROM pesanan WHERE id_pesanan=${id}`,
              //   (err, rows, fields) => {
              //     if (err)
              //       return response(res, 500, {
              //         code: err.code,
              //         sqlMessage: err.sqlMessage,
              //       });
              //     console.log(rows[0].status);
              //   }
              // );
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

const deletePesanan = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_pesanan FROM pesanan WHERE id_pesanan=${id}`,
    (err, rows, fields) => {
      if (err) return response(res, 500, err.message);

      if (rows.length > 0) {
        db.query(
          `DELETE FROM pesanan WHERE id_pesanan=${id}`,
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

const getNamaPesananSelesai = (req, res) => {
  const { id } = req.query;

  db.query(
    `SELECT a.id_pesanan, c.id_customer, c.username, a.jam FROM pesanan a 
      LEFT JOIN transaksi b ON a.id_pesanan=b.id_pesanan 
      JOIN customer c ON a.id_customer=c.id_customer
      WHERE b.id_pesanan IS NULL`,
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

module.exports = {
  getPesananAll,
  getPesananById,
  getPesananByCustId,
  addPesanan,
  updatePesanan,
  deletePesanan,
  getNamaPesananSelesai,
};
