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
exports.getSpecifictodo = exports.getAlltodo = exports.deletetodo = exports.updatetodo = exports.addtodo = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addtodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, userId } = yield req.body;
        // check user Exist
        const isUserExist = yield prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!isUserExist) {
            return res.status(400).json({
                error: "User not found",
                success: false,
            });
        }
        // add todo
        const todo = yield prisma.todo.create({
            data: {
                title,
                content,
                userId,
            },
        });
        return res.status(200).json({
            success: true,
            todo,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: err,
            success: false,
        });
    }
});
exports.addtodo = addtodo;
const updatetodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, titleId } = yield req.body;
        // check Todo Exist
        const isTodoExist = yield prisma.todo.findUnique({
            where: {
                id: titleId,
            },
        });
        if (!isTodoExist) {
            return res.status(400).json({
                error: "Todo not found",
                success: false,
            });
        }
        // update todo
        const todo = yield prisma.todo.update({
            where: {
                id: titleId,
            },
            data: {
                title,
                content,
                userId: isTodoExist.userId,
            },
        });
        return res.status(200).json({
            success: true,
            todo,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: err,
            success: false,
        });
    }
});
exports.updatetodo = updatetodo;
const deletetodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // check Todo Exist
        const isTodoExist = yield prisma.todo.findUnique({
            where: {
                id: id,
            },
        });
        if (!isTodoExist) {
            return res.status(400).json({
                error: "Todo not found",
                success: false,
            });
        }
        // delete todo
        const todo = yield prisma.todo.delete({
            where: {
                id: id,
            },
        });
        return res.status(200).json({
            success: true,
            todo,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: err,
            success: false,
        });
    }
});
exports.deletetodo = deletetodo;
const getAlltodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todos = yield prisma.todo.findMany({
            where: {
                userId: id,
            },
        });
        if (todos.length === 0) {
            return res.status(400).json({
                error: "Todo not found",
                success: false,
            });
        }
        return res.status(200).json({
            success: true,
            todos,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: err,
            success: false,
        });
    }
});
exports.getAlltodo = getAlltodo;
const getSpecifictodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield prisma.todo.findUnique({
            where: {
                id: id,
            },
        });
        return res.status(200).json({
            success: true,
            todo,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: err,
            success: false,
        });
    }
});
exports.getSpecifictodo = getSpecifictodo;
