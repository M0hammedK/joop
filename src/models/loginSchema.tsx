import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

class LoginSchema {
  public email: string;
  public password: string;

  constructor(data: any) {
    const parsed = loginSchema.parse(data);
    this.email = parsed.email;
    this.password = parsed.password;
  }

  static validate(data: any) {
    const validate = loginSchema.safeParse(data);
    if(validate.success) return null
    return (validate.error.errors.map((err) => err.message)) as string[]
  }
}

export default LoginSchema;
