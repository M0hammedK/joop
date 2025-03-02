import EmployerSchema from "@/models/employerSchema";
import JobSeekerSchema from "@/models/jobSekeerSchema";
import UserSchema from "@/models/userSchema";

export const checkComplateProfile = (
  user: any
): boolean => {
  try {
    switch (user.role) {
      case "JOB_SEEKER":
        return JobSeekerSchema.validate(user) === null;

      case "EMPLOYER":
        return EmployerSchema.validate(user) === null;
      default:
        return false;
    }
  } catch (err) {
    return false;
  }
};
