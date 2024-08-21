"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
// import bcrypt from "bcrypt";
const bcrypt = require("bcrypt");
// import { generateToken } from "../utils/generateToken";
const generateToken = require("../utils/generateToken");
// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "Please enter email  or password",
                success: false,
            });
        }
        const existingmail = yield prisma.user.findMany({
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
        const hashed = yield bcrypt.hash(password, 10);
        if (hashed) {
            yield prisma.user.create({
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
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "Please enter email and password",
                success: false,
            });
        }
        const existingUser = yield prisma.user.findFirst({
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
        const passwordMatches = yield bcrypt.compare(password, existingUser.password);
        if (!passwordMatches) {
            return res.status(400).json({
                error: "Incorrect password",
                success: false,
            });
        }
        const token = yield generateToken(existingUser.id, existingUser.email);
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
});
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
