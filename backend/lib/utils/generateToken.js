import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
		httpOnly: true, // not accessible via JavaScript → mitigates XSS
		sameSite: "strict", // mitigates CSRF
		secure: process.env.NODE_ENV !== "development", // HTTPS only in production
	});
};