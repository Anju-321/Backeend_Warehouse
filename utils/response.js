module.exports = (res, { code = 200, message, data,token } = {}) => {
  if (data)
    if (code != 200) {
      message = message ?? "Internal server error";
    }
  return res.status(code ?? 500).json({
    data,
    message,
    token,
  });
};



// module.exports = (req, res, next) => {
//   res.handleResponse = ({ code = 200, message, data }) => {

//     res.status(code).json({ code, message, data });
//   };
//   next();
// };
