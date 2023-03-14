const response = require("../utils/response");
const db = require("../config/db.con");

const sharp = require("sharp");
const path = require("path");

const getMekanikAll = (req, res) => {
  db.query(`SELECT * FROM mekanik`, (err, rows, fields) => {
    if (err)
      return response(res, 500, { code: err.code, sqlMessage: err.sqlMessage });
    return response(res, 200, "Berhasil", rows);
  });
};

const getMekanikById = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_mekanik FROM mekanik WHERE id_mekanik=${id}`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `SELECT * FROM mekanik WHERE id_mekanik=${id}`,
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

const addMekanik = async (req, res) => {
  const data = req.body;
  const imageURL = path.join(
    __dirname,
    "..",
    `/uploads/${req.file.originalname}`
  );

  try {
    await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toFile(path.join(__dirname, "..", `/uploads/${req.file.originalname}`));

    db.query(
      `INSERT INTO mekanik SET ?`,
      [
        {
          nama_mekanik: data.username,
          alamat: data.alamat,
          no_hp: data.no_hp,
          jabatan: data.jabatan,
          foto: imageURL,
        },
      ],
      (err, rows, fields) => {
        if (err)
          // return response(res, 500, {
          //   code: err.code,
          //   sqlMessage: err.sqlMessage,
          // });

          return res.status(500).send({
            code: err.code,
            sqlMessage: err.sqlMessage,
          });

        // return response(res, 200, "Berhasil menambahkan data");
        // return res.status(201).send("Berhasil menambahkan data");
      }
    );

    // return response(res, 201, "Berhasil menambahkan image");

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
};

const updateMekanik = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  db.query(
    `SELECT id_mekanik FROM mekanik WHERE id_mekanik=${id}`,
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        if (rows.length > 0) {
          db.query(
            `UPDATE mekanik SET ? WHERE id_mekanik=${id}`,
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
                `Berhasil memperbarui data '${data.nama_mekanik}'`
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

const deleteMekanik = (req, res) => {
  const { id } = req.params;

  db.query(
    `SELECT id_mekanik FROM mekanik WHERE id_mekanik=${id}`,
    (err, rows, fields) => {
      if (err) return response(res, 500, err.message);

      if (rows.length > 0) {
        db.query(
          `DELETE FROM mekanik WHERE id_mekanik=${id}`,
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
  getMekanikAll,
  getMekanikById,
  addMekanik,
  updateMekanik,
  deleteMekanik,
};
