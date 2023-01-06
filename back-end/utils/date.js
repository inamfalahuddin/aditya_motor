const dateFormat = (data) => {
  const month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = data.toISOString().slice(0, 10);
  const indexedOfDay = Number(date.split("-")[2]);
  const indexedOfMonth = Number(date.split("-")[1] - 1);
  const indexedOfYear = Number(date.split("-")[0]);

  return `${indexedOfDay}, ${month[indexedOfMonth]} ${indexedOfYear}`;
};

module.exports = dateFormat;
