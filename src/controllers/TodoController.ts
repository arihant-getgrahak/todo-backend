import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addtodo = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = await req.body;

    // check user Exist

    const isUserExist = await prisma.user.findUnique({
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

    const todo = await prisma.todo.create({
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
  } catch (err) {
    return res.status(500).json({
      error: err,
      success: false,
    });
  }
};
export const updatetodo = async (req: Request, res: Response) => {
  try {
    const { title, content, titleId } = await req.body;

    // check Todo Exist
    const isTodoExist = await prisma.todo.findUnique({
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
    const todo = await prisma.todo.update({
      where: {
        id: titleId,
      },
      data: {
        title,
        content,
      },
    });

    return res.status(200).json({
      success: true,
      todo,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      success: false,
    });
  }
};
export const deletetodo = async (req: Request, res: Response) => {
  try {
    const { titleId } = await req.body;

    // check Todo Exist
    const isTodoExist = await prisma.todo.findUnique({
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

    // delete todo
    const todo = await prisma.todo.delete({
      where: {
        id: titleId,
      },
    });

    return res.status(200).json({
      success: true,
      todo,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      success: false,
    });
  }
};
export const getAlltodo = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const todos = await prisma.todo.findMany({
      where: {
      userId: userId,
      },
    });

    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      success: false,
    });
  }
};
export const getSpecifictodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      success: true,
      todo,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      success: false,
    });
  }
};
