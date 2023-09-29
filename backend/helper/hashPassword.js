import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const hashedpassword = await bcrypt.hash(password, 10);
  return hashedpassword;
};

export default hashPassword;
