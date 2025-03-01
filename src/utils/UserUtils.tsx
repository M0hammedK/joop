import EmployerSchema from "@/models/employerSchema";
import JobSeekerSchema from "@/models/jobSekeerSchema";
import UserSchema from "@/models/userSchema";

export const setTypeUser = (
  user: UserSchema,
  profile: JobSeekerSchema | EmployerSchema
): EmployerSchema | JobSeekerSchema | null => {
  switch (user.role) {
    case "JOB_SEEKER":
      const { resume, skills } = profile as JobSeekerSchema;
      if (JobSeekerSchema.validate({ ...user, resume, skills }) === null)
        return new JobSeekerSchema({ ...user, resume, skills });
    case "EMPLOYER":
      const { companyWebsite, companyName } = profile as EmployerSchema;
      if (
        EmployerSchema.validate({
          ...user,
          companyWebsite: companyWebsite || "http://localhost:3000",
          companyName,
        }) === null
      )
        return new EmployerSchema({
          ...user,
          companyName,
          companyWebsite: companyWebsite || "http://localhost:3000",
        });
    default:
      return null;
  }
};