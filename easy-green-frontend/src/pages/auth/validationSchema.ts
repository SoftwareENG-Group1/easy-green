import { z } from 'zod'

export const UserSchema = z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    phoneNumber: z
      .string()
      .regex(/^\d{11}$/, "Phone Number must be 11 digits")
      .nonempty("Phone Number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    country: z.string().nonempty("Country is required"),
    state: z.string().nonempty("State is required"),
    streetAddress: z.string().nonempty("Street address is required"),
    city: z.string().nonempty("City is required"),
    zip: z.string().nonempty("Zip code is required"),
    bvn: z
      .string()
      .regex(/^\d{11}$/, "BVN must be 11 digits")
      .nonempty("BVN is required"),
    identification: z
    .instanceof(File)
    .refine((file) => file.size < 5 * 1024 * 1024, "File size must be under 5MB")
    .or(z.null()),
    nextOfKinName: z.string().nonempty("Required"),
    nextOfKinRelationship: z.string().nonempty("Required"),
    nextOfKinPhone: z
      .string()
      .regex(/^\d{11}$/, "Phone number must be 11 digits")
      .nonempty("phone number is required"),
    nextOfKinCountry: z.string().nonempty("Country is required"),
    nextOfKinState: z.string().nonempty("State is required"),
    nextOfKinStreetAddress: z.string().nonempty("Street address is required"),
    nextOfKinCity: z.string().nonempty("City is required"),
    nextOfKinZip:z.string().nonempty("Zip code is required"),
    companyName: z.string().nonempty("Company Name is required"),
    companyAddress: z.string().nonempty("Company Address is required"),
    monthlyIncome: z.string().regex(/^\d+$/, "ZIP code must contain only numbers"),
    accountName: z.string().nonempty("Monthly income is required"),
    bankName: z.string().nonempty("Monthly income is required"),
    employmentStatus: z.string().nonempty("Employment Status income is required"),
    accountNumber: z
      .string()
      .regex(/^\d{11}$/, "Account Number must be 11 digits")
      .nonempty("Account Number is required"),
    bankStatement: z
    .instanceof(File)
    .refine((file) => file.size < 5 * 1024 * 1024, "File size must be under 5MB")
    .or(z.null()),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: "custom",
      });
    }
  });

