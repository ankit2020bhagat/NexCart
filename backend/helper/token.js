import Jwt from "jsonwebtoken";
const createtoken = (id) => {
  return Jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
export default createtoken;
