const response = (res, status, message, data, meta) => {
  res
    .status(status)
    .setHeader("Access-Control-Allow-Headers", "Content-Type")
    .json({
      message,
      data,
      meta,
    });
};

module.exports = response;
