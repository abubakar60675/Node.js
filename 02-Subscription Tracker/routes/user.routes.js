import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
} from "../controllers/user.controller.js";
import { schemaValidator } from "../utils/schemas/index.js";
import {
  UserSchema,
  UpdateUserSchema,
  UpdatePasswordSchema,
} from "../utils/schemas/user.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authMiddleware, getUsers);

userRouter.get("/:id", authMiddleware, getUserById);

userRouter.post("/", authMiddleware, schemaValidator(UserSchema), createUser);

userRouter.put(
  "/:id",
  authMiddleware,
  schemaValidator(UpdateUserSchema),
  updateUser,
);

userRouter.delete("/:id", authMiddleware, deleteUser);

userRouter.put(
  "/password/:id",
  authMiddleware,
  schemaValidator(UpdatePasswordSchema),
  updatePassword,
);

export default userRouter;
