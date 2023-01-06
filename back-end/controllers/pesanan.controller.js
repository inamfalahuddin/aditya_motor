const response = require("../utils/response");
const db = require("../config/db.con");

const getPesananAll = (req, res) => {
  db.query(`SELECT * FROM pesanan`, (err, rows, fields) => {
    if (err)
      return response(res, 500, { code: err.code, sqlMessage: err.sqlMessage });

    return response(res, 200, "Berhasil", rows, { jumlah_data: rows.length });
  });
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
            `SELECT * FROM pesanan WHERE id_pesanan=${id}`,
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
            nama_customer: data.nama_customer,
            alamat: data.alamat,
            no_hp: data.no_hp,
            no_polisi: data.no_polisi,
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
            `UPDATE pesanan SET ? WHERE id_pesanan=${id}`,
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

module.exports = {
  getPesananAll,
  getPesananById,
  addPesanan,
  updatePesanan,
  deletePesanan,
};
