function validateInput(input) {
  if (input === undefined || input === null || input === "") {
    return "Input harus diberikan";
  }
  return null;
}

function validateNumber(input) {
  if (isNaN(input)) {
    return "Input harus angka";
  }
  return null;
}

function validateAlphabet(input) {
  const regex = /^[A-Za-z]+$/;
  if (!regex.test(input)) {
    return "Input harus alfabet";
  }
  return null;
}

function validateName(input) {
  if (input.trim().split(" ").length <= 1) {
    return "Nama tidak boleh dari satu kata";
  }
  return null;
}

module.exports = {
  validateInput,
  validateNumber,
  validateAlphabet,
  validateName,
};
