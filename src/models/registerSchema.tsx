import { z } from "zod";

export const userRoleEnum = ["JOB SEEKER", "EMPLOYER"] as const;

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(userRoleEnum).refine((val) => userRoleEnum.includes(val), {
    message: "Invalid role value",
  }),
  imagePath: z.string()
});

export interface UserSchema{
  name: string;
  email: string;
  password: string;
  role: string;
  imagePath: string;
}

class RegisterSchema implements UserSchema {
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public imagePath: string;

  constructor(data: any) {
    const parsed = registerSchema.parse(data);
    this.name = parsed.name;
    this.password = parsed.password;
    this.email = parsed.email;
    this.role = parsed.role;
    this.imagePath = parsed.imagePath;
  }

  static validate(data: any) {
    const validate = registerSchema.safeParse(data);
    if(validate.success) return null
    return (validate.error.errors.map((err) => err.message)) as string[]
  }
}

export default RegisterSchema