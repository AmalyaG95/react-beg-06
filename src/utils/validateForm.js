const isRequired = (name, value) => {
  if (value.length === 0) {
    return `Please enter your ${name}`;
  } else if (!value.trim()) {
    return `${name} is empty`;
  }
  return;
};

const validateLength = (minLength, maxLength) => (name, value) => {
  if (value.length < minLength) {
    return `${name} should NOT be shorter than ${minLength} characters`;
  } else if (value.length > maxLength) {
    return `${name} should NOT be longer than ${maxLength} characters`;
  }
  return;
};

const validateEmail = (email) => {
  const emailPattern = /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/;
  if (emailPattern.test(email)) return;
  return 'email should match format "yourname@example.com"';
};

const validateForm = (name, value) => {
  const validateLength1_ = validateLength(1);
  const validateLength1_254 = validateLength(1, 254);
  const validateLength1_1000 = validateLength(1, 1000);

  return (
    isRequired(name, value) ||
    validateLength1_(name, value) ||
    (name === "email" && validateLength1_254(name, value)) ||
    (name === "email" && validateEmail(value)) ||
    (name === "message" && validateLength1_1000(name, value)) ||
    null
  );
};

export default validateForm;
