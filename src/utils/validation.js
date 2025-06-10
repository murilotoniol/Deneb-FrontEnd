export const validateCPF = (cpf) => {
  const cpfClean = cpf.replace(/[^\d]/g, "");

  if (cpfClean.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cpfClean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpfClean.charAt(i)) * (10 - i);
  }

  let rest = 11 - (sum % 11);
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpfClean.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpfClean.charAt(i)) * (11 - i);
  }

  rest = 11 - (sum % 11);
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpfClean.charAt(10))) return false;

  return true;
};

export const validatePhone = (phone) => {
  const phoneClean = phone.replace(/[^\d]/g, "");
  return phoneClean.length >= 10 && phoneClean.length <= 11;
};

export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid:
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar,
    errors: {
      length: password.length < minLength,
      upperCase: !hasUpperCase,
      lowerCase: !hasLowerCase,
      numbers: !hasNumbers,
      specialChar: !hasSpecialChar,
    },
  };
};

export const validateDate = (date) => {
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!dateRegex.test(date)) return false;

  const [day, month, year] = date.split("/").map(Number);
  const dateObj = new Date(year, month - 1, day);

  return (
    dateObj.getDate() === day &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getFullYear() === year &&
    dateObj <= new Date()
  );
};
