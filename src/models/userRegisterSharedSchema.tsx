import { z } from "zod";

export const userRoleEnum = ["JOB_SEEKER", "EMPLOYER"] as const;

export const userRegisterSharedSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(userRoleEnum),
  imagePath: z.string(),
});
abstract class UserRegisterSharedSchema {
  public id?: number;
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public imagePath: string;

  constructor(data: any) {
    const parsed = userRegisterSharedSchema.parse(data);
    this.id = parsed.id;
    this.name = parsed.name;
    this.password = parsed.password;
    this.email = parsed.email;
    this.role = parsed.role;
    this.imagePath = parsed.imagePath
  }

  static validate(data: any): string[] | null {
    const validate = userRegisterSharedSchema.safeParse(data);
    if (validate.success) return null;
    return validate.error.errors.map((err) => err.message) as string[];
  }
}

export default UserRegisterSharedSchema;
