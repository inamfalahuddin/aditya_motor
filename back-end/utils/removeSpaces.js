const removeSpaces = (text) => {
  str = text.replace(/\s/g, "");

  if (str) {
    return str;
  }

  return text;
};

module.exports = removeSpaces;
