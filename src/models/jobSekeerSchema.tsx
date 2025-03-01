import { z } from "zod";
import UserSchema from "./userSchema";
import { userRegisterSharedSchema, userRoleEnum } from "./userRegisterSharedSchema";

const jobSeekerSchema = z.object({
  id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(userRoleEnum),
    imagePath: z.string(),
  resume: z.string().min(1, "Resume is required"),
  skills: z.string().min(1, "").optional(),
});

class JobSeekerSchema {
  public id?: number;
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public imagePath: string;
  public resume: string;
  public skills?: string;

  constructor(data: any) {
    const parsed = jobSeekerSchema.parse(data);
    this.id = parsed.id;
    this.name = parsed.name;
    this.password = parsed.password;
    this.email = parsed.email;
    this.role = parsed.role;
    this.imagePath = parsed.imagePath
    this.resume = parsed.resume;
    this.skills = parsed.skills;
  }

  static validate(data: any) {
    const validate = jobSeekerSchema.safeParse(data);
    if (validate.success) return null;
    return validate.error.errors.map((err) => err.message) as string[];
  }
}
export default JobSeekerSchema;
