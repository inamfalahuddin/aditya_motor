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

      if (rows.length > 0) {
        const match = bcrypt.compareSync(req.body.password, rows[0].password);
        const { id_customer, email, role } = rows[0];

        if (!match) {
          return response(res, 404, "Password salah");
        }

        const accessToken = jwt.sign(
          { id_customer, role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "200s" }
        );

        const refreshToken = jwt.sign(
          { id_customer, role },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        db.query(
          `UPDATE auth SET token='${refreshToken}' WHERE id_customer='${id_customer}'`,
          (err, rows, fields) => {
            if (err) {
              return response(res, 500, {
                code: err.code,
                sqlMessage: err.sqlMessage,
              });
            }
          }
        );

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return response(res, 200, "Login berhasil", { token: accessToken });
      } else {
        return response(res, 404, "Email tidak terdaftar");
      }
    }
  );
};

const register = (req, res) => {
  const { username, alamat, no_tlp, email, password } = req.body;
  const idCustomer = generateIdCustomer();

  db.query(
    `INSERT INTO customer SET ?`,
    [
      {
        id_customer: idCustomer,
        username,
        alamat,
        no_tlp,
        email,
        password: hashPassword(password),
      },
    ],
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      } else {
        db.query(
          `INSERT INTO auth SET ?`,
          [
            {
              id_customer: idCustomer,
              role: "user",
            },
          ],
          (err, rows, fields) => {
            if (err) {
              return response(res, 500, {
                code: err.code,
                sqlMessage: err.sqlMessage,
              });
            } else {
              return response(res, 200, "Berhasil menambahkan data");
            }
          }
        );
      }
    }
  );
};

const logout = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return response(res, 204, "Tidak ada token");
  }

  db.query(
    `SELECT * FROM auth WHERE token='${refreshToken}'`,
    (err, rows, fields) => {
      if (err) {
        return response(res, 500, {
          code: err.code,
          sqlMessage: err.sqlMessage,
        });
      }

      if (rows.length > 0) {
        const { id_customer } = rows[0];

        db.query(
          `UPDATE auth SET token='' WHERE id_customer='${id_customer}'`,
          (err, rows) => {
            if (err) {
              return response(res, 500, {
                code: err.code,
                sqlMessage: err.sqlMessage,
              });
            }
            res.clearCookie("refreshToken");
            response(res, 200, "Logout berhasil");
            return res.end();
          }
        );
      } else {
        return response(res, 404, "Tidak ada user login");
      }
    }
  );
};

const refresh = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    db.query(
      `SELECT * FROM auth WHERE token='${refreshToken}'`,
      (err, rows, fields) => {
        if (err) {
          return response(res, 500, {
            code: err.code,
            sqlMessage: err.sqlMessage,
          });
        }

        if (rows.length > 0) {
          jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
              if (err) {
                return response(res, 403, "Forbidden");
              } else {
                const { id_customer, role } = rows[0];

                const accessToken = jwt.sign(
                  { id_customer, role },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: "200s" }
                );

                return response(res, 200, "Success", { accessToken });
              }
            }
          );
        } else {
          return response(res, 404, "Tidak ada user login");
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const editPassword = (req, res) => {
  if (req.body) {
    db.query(
      `SELECT a.id_customer, a.password, b.role FROM customer a JOIN auth b ON a.id_customer=b.id_customer WHERE a.id_customer='${req.query.id}'`,
      (err, rows, fields) => {
        if (err) {
          return response(res, 500, {
            code: err.code,
            sqlMessage: err.sqlMessage,
          });
        }

        if (rows.length > 0) {
          const match = bcrypt.compareSync(req.body.old, rows[0].password);
          const { id_customer, role } = rows[0];

          if (!match) {
            return response(res, 404, "Password salah");
          }

          // const accessToken = jwt.sign(
          //   { id_customer, role },
          //   process.env.ACCESS_TOKEN_SECRET,
          //   { expiresIn: "200s" }
          // );

          // const refreshToken = jwt.sign(
          //   { id_customer, role },
          //   process.env.REFRESH_TOKEN_SECRET,
          //   { expiresIn: "1d" }
          // );

          // db.query(
          //   `UPDATE auth SET token='${refreshToken}' WHERE id_customer='${id_customer}'`,
          //   (err, rows, fields) => {
          //     if (err) {
          //       return response(res, 500, {
          //         code: err.code,
          //         sqlMessage: err.sqlMessage,
          //       });
          //     }
          //   }
          // );

          db.query(
            `UPDATE customer SET password='${hashPassword(
              req.body.new
            )}' WHERE id_customer='${id_customer}'`,
            (err, rows, fields) => {
              if (err) {
                return response(res, 500, {
                  code: err.code,
                  sqlMessage: err.sqlMessage,
                });
              }
            }
          );

          // res.cookie("refreshToken", refreshToken, {
          //   httpOnly: true,
          //   maxAge: 24 * 60 * 60 * 1000,
          // });

          return response(res, 200, "Password berhasil diupdate");
        } else {
          return response(res, 404, "User tidak terdaftar");
        }
      }
    );
  }
};

function generateIdCustomer() {
  const min = 100000;
  const max = 999999;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hashPassword(password) {
  if (password) {
    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password, salt);

    return hashPassword;
  }
}

module.exports = { login, register, logout, refresh, editPassword };
