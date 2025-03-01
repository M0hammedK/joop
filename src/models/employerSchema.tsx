import { z } from "zod";
import { userRegisterSharedSchema, userRoleEnum } from "./userRegisterSharedSchema";
import UserSchema from "./userSchema";

const employerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(userRoleEnum),
  imagePath: z.string(),
  companyName: z.string().min(1, "Company name is required"),
  companyWebsite: z.string().url("Invalid URL").optional(),
});

class EmployerSchema {
  public id?: number;
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public imagePath: string;
  public companyName: string;
  public companyWebsite?: string;

  constructor(data: any) {
    const parsed = employerSchema.parse(data);
    this.id = parsed.id;
    this.name = parsed.name;
    this.password = parsed.password;
    this.email = parsed.email;
    this.role = parsed.role;
    this.imagePath = parsed.imagePath
    this.companyName = parsed.companyName;
    this.companyWebsite = parsed.companyWebsite;
  }

  static validate(data: any): string[] | null {
    const validate = employerSchema.safeParse(data);
    if (validate.success) return null;
    return validate.error.errors.map((err) => err.message) as string[];
  }
}

export default EmployerSchema;
