// const User = require('../models/userModel');

// exports.registerUser = async (req, res) => {
//   try {
//     const { username, password, role } = req.body;
//     const user = new User({
//       username,
//       password,
//       role,
      
//     });

//    await user.save();
//     console.log(req.body);

//     res.status(200).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     // next(error);
//   }
// };



// module.exports = (res, { code = 200, message, data, is_next } = {}) => {
//   if (data) console.log(data);

//   if (code != 200) {
//     message = message ?? "Internal server error";
//   }

//   return res.status(code ?? 500).json({
//     data,
//     is_next,
//     message,
//   });
// };

// const saveData = await new UserRegisterData(RegisterData).save()
// if (saveData) {
//     return res.status(200).json({
//         success: true,
//         error: false,
//         message: "Register success"
//     })
// }
