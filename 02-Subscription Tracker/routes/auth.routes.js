import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { schemaValidator } from "../utils/schemas/index.js";
import { SignInSchema, SignUpSchema } from "../utils/schemas/auth.schema.js";

const authRouter = Router();

authRouter.post("/sign-up", schemaValidator(SignUpSchema), signUp);

authRouter.post("/sign-in", schemaValidator(SignInSchema), signIn);

authRouter.post("/sign-out", signOut);

export default authRouter;
