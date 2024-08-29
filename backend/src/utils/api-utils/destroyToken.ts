import { Response } from "express";

const destroyToken = (res: Response) => {
  // Empty string to place in cookie instead of token
  const jwtToken = "";

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "none" as const,
    maxAge: 0, // Set maxAge to 0 milliseconds to expire the cookie immediately
    path: '/', // Ensure path is set
  };


  res.cookie("token", jwtToken, cookieOptions);
};

export default destroyToken;
