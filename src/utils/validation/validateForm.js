import { isRequired, validateLength, validateEmail } from "./validators";

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
