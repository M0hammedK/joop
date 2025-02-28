import { z } from "zod";
import UserSchema from "./userSchema";
import { userRegisterSharedSchema } from "./userRegisterSharedSchema";

const jobSeekerSchema = userRegisterSharedSchema.extend({
  resume: z.string().min(1, "Resume is required"),
  skills: z.string().min(1, "").optional(),
});

class JobSeekerSchema extends UserSchema {
  public resume: string;
  public skills?: string;

  constructor(data: any) {
    const { resume, skills, ...rest } = data;
    super({ ...rest });
    const parsed = jobSeekerSchema.parse({ resume, skills });
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
