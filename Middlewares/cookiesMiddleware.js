// const cookiesMiddleware = (req, res, next) => {
//   let token = req.cookies.token;
//   let decoded;
//   if (!token) {
//     token = req.cookies.refresh_token;
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH);
//     } catch (err) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//   }
// };
// module.exports = cookiesMiddleware;
