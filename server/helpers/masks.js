const normalizePhoneNumber = (value, withCountryCode = false) => {
  if (!value) return "";

  const cleaned = value.replace(/\D/g, "");

  if (withCountryCode) {
    return cleaned
      .replace(/(\d{2})(\d{2})(\d)/, "+$1 ($2) $3")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})(\d+?)/, "$1");
  }

  return cleaned
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};

const normalizeCnpjNumber = (value) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const normalizeCpfNumber = (value) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{2})$/, "$1-$2");
};

const normalizeCepNumber = (value) => {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
    .replace(/(-\d{3})(\d+?)/, "$1");
};

module.exports = {
  normalizePhoneNumber,
  normalizeCnpjNumber,
  normalizeCpfNumber,
  normalizeCepNumber,
};
