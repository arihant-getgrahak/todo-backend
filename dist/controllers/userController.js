"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../utils/generateToken");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "Please enter email  or password",
                success: false,
            });
        }
        const existingmail = await prisma.user.findMany({
            where: {
                email: email,
            },
        });
        if (existingmail[0]) {
            return res.status(400).json({
                error: "Email already exist. Please login.",
                success: false,
            });
        }
        const hashed = await bcrypt_1.default.hash(password, 10);
        if (hashed) {
            await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashed,
                },
            });
            return res.status(200).json({
                message: "User Created Successfully!! ",
                success: true,
            });
        }
        else {
            return res.status(500).json({
                error: "Error encrypt password!!",
                success: false,
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            error: err,
            success: false,
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "Please enter email and password",
                success: false,
            });
        }
        const existingUser = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!existingUser) {
            return res.status(400).json({
                error: " email not found",
                success: false,
            });
        }
        const passwordMatches = await bcrypt_1.default.compare(password, existingUser.password);
        if (!passwordMatches) {
            return res.status(400).json({
                error: "Incorrect password",
                success: false,
            });
        }
        const token = await (0, generateToken_1.generateToken)(existingUser.id, existingUser.email);
        return res.status(200).json({
            message: "Login Successfully",
            token: token,
            success: true,
            user: existingUser,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};
exports.login = login;
// const updateProfile = asyncHandler(async (req, res) => {
//   try {
//     const data = req.body;
//     const { id } = req.params;
//     if (id != user.id) {
//       return res.status(403).json({
//         error: "You are not allowed to edit this profile",
//         success: false,
//       });
//     }
//     await prisma.user.update({
//       where: {
//         id: parseInt(user.id),
//       },
//       data: data,
//     });
//     return res.status(200).json({
//       message: "User Updated Successfully!!",
//       success: true,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       error: err.message,
//       success: false,
//     });
//   }
// });
// const updatePassword = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = req.user;
//     const { password, updatepassword } = req.body;
//     if (id != user.id) {
//       return res.status(403).json({
//         error: "You are not allowed to update the password",
//         success: false,
//       });
//     }
//     const checkpass = await prisma.user.findUnique({
//       where: {
//         id: parseInt(id),
//       },
//     });
//     const passwordcheck = await bcrypt.compare(password, checkpass.password);
//     if (passwordcheck) {
//       const hashedPass = await bcrypt.hash(updatepassword, 10);
//       if (hashedPass) {
//         await prisma.User.update({
//           where: {
//             id: parseInt(id),
//           },
//           data: {
//             password: hashedPass,
//           },
//         });
//       }
//       return res.status(200).json({
//         message: "User Password Updated Successfully!!",
//         success: true,
//       });
//     } else {
//       return res.status(500).json({
//         error: "Password is wrong",
//         success: false,
//       });
//     }
//   } catch (err) {
//     return res.status(500).json({
//       error: err.message,
//       success: false,
//     });
//   }
// });
