import RegisterSchema, {
  userRoleEnum,
} from "@/models/userRegisterSharedSchema";

export const checkRegiterCredentials = (
  data: any
): string | string[] | null => {
  const { password, repeatPassword, role }: any = data;
  if (password !== repeatPassword) return "the passwoeds not match";
  if (!userRoleEnum.includes(role)) return "the role not correct";

  const { repeatPassword: repeat, ...rest }: any = data;
  const validateRegister = RegisterSchema.validate({
    ...rest,
    imagePath:
      "https://esoedmdnu28jvzvz.public.blob.vercel-storage.com/defaultImage.jpg",
  });
  if (validateRegister) return validateRegister;
  return null;
};

export const logout = () => {
  localStorage.clear();
};
