const response = require("../utils/response");
const db = require("../config/db.con");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  db.query(
    `SELECT a.id_customer, a.email, a.password, b.role FROM customer a JOIN auth b ON a.id_customer=b.id_customer WHERE email='${req.body.email}'`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      }

      if (rows.email == undefined) {
        return response(res, 404, "Email tidak terdaftar");
      } else {
        const match = bcrypt.compareSync(req.body.password, rows[0].password);
        const { email, role } = rows[0];

        if (match) {
          const accessToken = jwt.sign(
            { email, role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "200s" }
          );
          const refreshToken = jwt.sign(
            { email, role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );

          db.query(
            `UPDATE auth SET token='${refreshToken}' WHERE id_customer='${rows[0].id_customer}'`,
            (err, rows, fields) => {
              if (err) {
                return response(res, 500, {
                  code: err.code,
                  sqlMessage: err.sqlMessage,
                });
              } else {
                res.cookie("refreshToken", refreshToken, {
                  httpOnly: true,
                  maxAge: 24 * 60 * 60 * 1000,
                });

                return response(res, 200, "Login berhasil", {
                  token: accessToken,
                  expire: "1 day",
                });
              }
            }
          );
        } else {
          return response(res, 404, "Password salah");
        }
      }
    }
  );
  return response(res, 404, "Tidak ada data");
};

const logout = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return response(res, 204, "Tidak ada konten");
  } else {
    db.query(
      `SELECT * FROM auth WHERE token='${refreshToken}'`,
      (err, rows, fields) => {
        if (err) {
          return response(res, 500, {
            code: err.code,
            sqlMessage: err.sqlMessage,
          });
        }

        const { email } = rows[0];

        db.query(
          `UPDATE auth SET token='' WHERE email='${email}'`,
          (err, rows, fields) => {
            if (err) {
              return response(res, 500, {
                code: err.code,
                sqlMessage: err.sqlMessage,
              });
            }

            return response(res, 200, "Logout berhasil");
          }
        );
      }
    );
  }
};

module.exports = { login, logout };
