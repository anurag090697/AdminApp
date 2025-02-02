/** @format */

import "dotenv/config";
import jwt from "jsonwebtoken";

export function generateJwtToken(user) {
  return jwt.sign(
    {
      userId: user._id,
      userMail: user.email,
      isVerified: true,
    },
    process.env.JWT_SECRET,
    { expiresIn: "5d" }
  );
}
