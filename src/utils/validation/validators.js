export const isRequired = (name, value) => {
  if (value.length === 0) {
    return `Please enter your ${name}`;
  } else if (!value.trim()) {
    return `${name} is empty`;
  }
  return;
};

export const validateLength = (minLength, maxLength) => (name, value) => {
  if (value.length < minLength) {
    return `${name} should NOT be shorter than ${minLength} characters`;
  } else if (value.length > maxLength) {
    return `${name} should NOT be longer than ${maxLength} characters`;
  }
  return;
};

export const validateEmail = (email) => {
  const emailPattern = /^\s*[\w\-+_]+(\.[\w\-+_]+)*@[\w\-+_]+\.[\w\-+_]+(\.[\w\-+_]+)*\s*$/;
  if (emailPattern.test(email)) return;
  return 'email should match format "yourname@example.com"';
};
