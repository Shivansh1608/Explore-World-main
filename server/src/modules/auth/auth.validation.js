import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  bio: z.string().max(300).optional(),
  role: z.enum(["user", "blogger", "moderator", "admin"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err) {
    const errorMessages = err.errors?.map((e) => e.message) || ["Validation failed"];
    return res.status(400).json({
      success: false,
      message: errorMessages.join(", "),
      errors: err.errors,
    });
  }
};

