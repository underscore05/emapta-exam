import * as yup from "yup";

export const ApplicantFormSchema = yup
  .object({
    firstName: yup.string().required().label("First name"),
    lastName: yup.string().required().label("Last name"),
    mobileNumber: yup
      .string()
      .required()
      .matches(/^(09|\+639)\d{9}$/, {
        message: "Invalid Philippine phone number"
      })
      .label("Mobile number"),
    email: yup.string().email().required().label("Email address"),
    isPrimary: yup.boolean().required().label("Email address")
  })
  .required();

export type ApplicantFormType = yup.InferType<typeof ApplicantFormSchema>;

export const ApplicantArrayFormSchema = yup.object({
  applicants: yup.array().of(ApplicantFormSchema).required()
});

export type ApplicantArrayFormType = yup.InferType<
  typeof ApplicantArrayFormSchema
>;
