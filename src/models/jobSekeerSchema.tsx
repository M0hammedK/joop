import { z } from "zod";
import RegisterSchema, { registerSchema } from "./registerSchema";

const jobSekeerSchema = registerSchema.extend({
  resume: z.string().min(1, "Resume is required"),
  skills: z.string().min(1, "").optional(),
});

class JobSekeerSchema extends RegisterSchema {
  public resume: string;
  public skills?: string;

  constructor(data: any) {
    const { name, email, password, role } = data;
    const { resume, skills } = data;
    super({ name, email, password, role });
    const parsed = jobSekeerSchema.parse({ resume, skills });
    this.resume = parsed.resume;
    this.skills = parsed.skills;
  }
  
  static validate(data: any) {
    const validate = jobSekeerSchema.safeParse(data);
    if (validate.success) return null;
    return validate.error.errors.map((err) => err.message) as string[];
  }
}
export default JobSekeerSchema;
