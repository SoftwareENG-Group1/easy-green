import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProgressBar from "../../components/progressBar";
import Logo from "../../assets/images/Easy-Green.png";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import rightArrow from "../../assets/icons/arrow-right.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const personalInfoSchema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    phone: z
      .string()
      .regex(/^\d{11}$/, "Phone Number must be 11 digits")
      .nonempty("Phone Number is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    bvn: z
      .string()
      .regex(/^\d{11}$/, "BVN must be 11 digits")
      .nonempty("BVN is required"),
    identification: z
      .any()
      .refine((file) => file instanceof File, "Please upload a valid file"),
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

const addressSchema = z.object({
  country: z.string().nonempty("Country is required"),
  state: z.string().nonempty("State is required"),
  streetAddress: z.string().nonempty("Street address is required"),
  city: z.string().nonempty("City is required"),
  zip: z.string().nonempty("Zip code is required"),
});

const nextOfKinSchema = z.object({
  nextOfKinName: z.string().nonempty("Next of kin name is required"),
  nextOfKinPhone: z
    .string()
    .regex(/^\d{11}$/, "Phone number must be 11 digits")
    .nonempty("Phone number is required"),
  nextOfKinCountry: z.string().nonempty("Country is required"),
  nextOfKinState: z.string().nonempty("State is required"),
  nextOfKinStreetAddress: z.string().nonempty("Street address is required"),
  nextOfKinCity: z.string().nonempty("City is required"),
  nextOfKinZip: z.string().nonempty("Zip code is required"),
});

const employmentInfoSchema = z.object({
  companyName: z.string().nonempty("Company Name is required"),
  companyAddress: z.string().nonempty("Company Address is required"),
  monthlyIncome: z.string().nonempty("Monthly income is required"),
  accountName: z.string().nonempty("Account name is required"),
  bankName: z.string().nonempty("Bank name is required"),
  accountNumber: z
    .string()
    .regex(/^\d{11}$/, "Account Number must be 11 digits")
    .nonempty("Account Number is required"),
  bankStatement: z
    .any()
    .refine((file) => file instanceof File, "Please upload a valid file"),
});

type PersonalInfo = z.infer<typeof personalInfoSchema>;
type AddressInfo = z.infer<typeof addressSchema>;
type NextOfKinInfo = z.infer<typeof nextOfKinSchema>;
type EmploymentInfo = z.infer<typeof employmentInfoSchema>;

type FormData = PersonalInfo & AddressInfo & NextOfKinInfo & EmploymentInfo;

const CreateAccount: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [subStep, setSubStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [userType, setUserType] = useState("customer");
  const schemas = [
    personalInfoSchema,
    addressSchema,
    nextOfKinSchema,
    employmentInfoSchema,
  ];
  const defaultValues = {
    0: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      bvn: "",
      identification: "",
    },
    1: {
      country: "",
      state: "",
      streetAddress: "",
      city: "",
      zip: "",
    },
    2: {
      nextOfKinName: "",
      nextOfKinPhone: "",
      nextOfKinCountry: "",
      nextOfKinState: "",
      nextOfKinStreetAddress: "",
      nextOfKinCity: "",
      nextOfKinZip: "",
    },
    3: {
      companyName: "",
      companyAddress: "",
      monthlyIncome: "",
      accountName: "",
      bankName: "",
      accountNumber: "",
    },
  };
  const steps = [
    "Personal Info",
    "Next of Kin Details",
    "Employment & Financial Info",
  ];

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemas[subStep]),
    defaultValues: defaultValues[subStep],
  });

  const handleNext = async () => {
    if (activeStep === 0 && subStep === 0) {
      await submitFirstPage();
    } else if (activeStep === 0 && subStep < 1) {
      setSubStep(subStep + 1);
    } else if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
      setSubStep(0);
    }
  };

  const handleBack = () => {
    if (activeStep == 0 && subStep <= 1) {
      toast.info(
        <div>
          User Information cannot be altered
          <br />
          <strong>Please Login</strong> to alter any personal details
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          style: {
            border: "1px",
            borderRadius: "8px",
            color: "#333",
            fontSize: "16px",
          },
        }
      );
    }
    if (subStep > 1) {
      setSubStep(subStep - 1);
    } else if (activeStep > 0) {
      setActiveStep(activeStep - 1);
      setSubStep(1);
    }
  };

  const submitFirstPage = async () => {
    const firstPageData = getValues([
      "firstName",
      "lastName",
      "email",
      "phone",
      "password",
      "confirmPassword",
    ]);
    try {
      console.log("Submitting first page:", firstPageData);

      setSubmitted(true);
      setSubStep(1);
    } catch (error) {
      console.error("Error submitting first page:", error);
    }
  };

  const onSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data })); // Save current step data
    if (subStep < schemas.length - 1) {
      setSubStep((prev) => prev + 1); // Go to next step
    } else {
      console.log("Final Data:", { ...formData, ...data }); // Submit all data
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="grid self-center w-full h-full grid-cols-3 bg-white rounded-md shadow-md">
        <div className="flex flex-col items-center justify-center p-8 text-white bg-[#003300]">
          <div className="mb-4">
            <img src={Logo} alt="Easy Green Logo" className="w-full h-full" />
          </div>
        </div>

        <div className="flex items-center justify-center min-h-screen col-span-2 p-10">
          <div className="flex flex-col min-w-[80%] gap-10">
            <h2 className="mb-4 font-bold text-center text-[#003300] text-7xl">
              Create your account
            </h2>

            <div className="flex justify-center gap-6 mb-4">
              <button
                className={`px-4 py-2 ${
                  userType === "admin"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => setUserType("admin")}
              >
                Admin
              </button>
              <button
                className={`px-4 py-2 ${
                  userType === "customer"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => setUserType("customer")}
              >
                Customer
              </button>
            </div>

            <ProgressBar steps={steps} activeStep={activeStep} />

            <form onSubmit={handleSubmit(onSubmit)} className="pt-16 space-y-4 text-[#003300]">
              {activeStep === 0 && subStep === 0 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        {...register("firstName")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="First Name"
                        disabled={submitted}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        {...register("lastName")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="Last Name"
                        disabled={submitted}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm">
                      Email
                    </label>
                    <input
                      id="email"
                      {...register("email")}
                      className="w-full p-2 bg-white border rounded-md"
                      placeholder="Email"
                      disabled={submitted}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm">
                      Phone
                    </label>
                    <input
                      id="phone"
                      {...register("phone")}
                      className="w-full p-2 bg-white border rounded-md"
                      placeholder="Phone"
                      disabled={submitted}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      {...register("password")}
                      className="w-full p-2 bg-white border rounded-md"
                      placeholder="Password"
                      disabled={submitted}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      {...register("confirmPassword")}
                      className="w-full p-2 bg-white border rounded-md"
                      placeholder="Confirm Password"
                      disabled={submitted}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              {activeStep === 0 && subStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="country" className="block text-sm">
                        Country
                      </label>
                      <input
                        id="country"
                        {...register("country")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="Country"
                      />
                      {errors.country && (
                        <p className="text-sm text-red-500">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm">
                        State
                      </label>
                      <input
                        id="state"
                        {...register("state")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="State"
                      />
                      {errors.state && (
                        <p className="text-sm text-red-500">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="streetAddress" className="block text-sm">
                      Street Address
                    </label>
                    <input
                      id="streetAddress"
                      {...register("streetAddress")}
                      className="w-full p-2 bg-white border rounded-md"
                      placeholder="Street Address"
                    />
                    {errors.streetAddress && (
                      <p className="text-sm text-red-500">
                        {errors.streetAddress.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm">
                        City
                      </label>
                      <input
                        id="city"
                        {...register("city")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm">
                        Zip Code
                      </label>
                      <input
                        id="zip"
                        {...register("zip")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="Zip Code"
                      />
                      {errors.zip && (
                        <p className="text-sm text-red-500">
                          {errors.zip.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bvn">BVN</label>
                    <input
                      id="bvn"
                      {...register("bvn")}
                      className="w-full p-2 bg-white border rounded-md"
                      placeholder="BVN"
                    />
                    {errors.bvn && (
                      <p className="text-sm text-red-500">
                        {errors.bvn.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <div className="flex flex-col items-center justify-center p-4 border border-gray-400 border-dashed rounded-md">
                      <CloudUploadRoundedIcon className="text-2xl text-gray-500" />
                      <input
                        id="identification"
                        type="file"
                        {...register("identification")}
                        className="hidden"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0];
                        }}
                      />
                      <span className="mt-2 text-sm text-gray-500">
                        Upload one identification either NIN, Passport Page or
                        Driver's License
                      </span>
                    </div>
                    {errors.identification && (
                      <p className="text-sm text-red-500">
                        {errors.identification.message}
                      </p>
                    )}
                  </div>
                </>
              )}
              {activeStep === 1 && (
                <>
                  <div>
                    <label htmlFor="nextOfKinName" className="block text-sm">
                      Next of Kin Name
                    </label>
                    <input
                      id="nextOfKinName"
                      {...register("nextOfKinName")}
                      className="w-full p-2 bg-white border rounded-md"
                      placeholder="Next of Kin Name"
                    />
                    {errors.nextOfKinName && (
                      <p className="text-sm text-red-500">
                        {errors.nextOfKinName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="nextOfKinPhone" className="block text-sm">
                      Next of Kin Phone
                    </label>
                    <input
                      id="nextOfKinPhone"
                      {...register("nextOfKinPhone")}
                      className="w-full p-2 bg-white border rounded-md"
                      placeholder="Next of Kin Phone"
                    />
                    {errors.nextOfKinPhone && (
                      <p className="text-sm text-red-500">
                        {errors.nextOfKinPhone.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="country" className="block text-sm">
                        Country
                      </label>
                      <input
                        id="country"
                        {...register("country")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="Country"
                      />
                      {errors.country && (
                        <p className="text-sm text-red-500">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm">
                        State
                      </label>
                      <input
                        id="state"
                        {...register("state")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="State"
                      />
                      {errors.state && (
                        <p className="text-sm text-red-500">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="streetAddress" className="block text-sm">
                      Street Address
                    </label>
                    <input
                      id="streetAddress"
                      {...register("streetAddress")}
                      className="w-full p-2 bg-white border rounded-md"
                      placeholder="Street Address"
                    />
                    {errors.streetAddress && (
                      <p className="text-sm text-red-500">
                        {errors.streetAddress.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm">
                        City
                      </label>
                      <input
                        id="city"
                        {...register("city")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="City"
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm">
                        Zip Code
                      </label>
                      <input
                        id="zip"
                        {...register("zip")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="Zip Code"
                      />
                      {errors.zip && (
                        <p className="text-sm text-red-500">
                          {errors.zip.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeStep === 2 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="Employment Status"
                        className="block text-sm"
                      >
                        Employment Status
                      </label>
                      <input
                        id="city"
                        {...register("city")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="Employment Status"
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="monthlyIncome" className="block text-sm">
                        Monthly Income
                      </label>
                      <input
                        id="monthlyIncome"
                        {...register("monthlyIncome")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="Monthly Income"
                      />
                      {errors.monthlyIncome && (
                        <p className="text-sm text-red-500">
                          {errors.monthlyIncome.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="companyName" className="block text-sm">
                      Company Name
                    </label>
                    <input
                      id="companyName"
                      {...register("companyName")}
                      className="w-full p-2 bg-white border rounded-md"
                      placeholder="Company Name"
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-500">
                        {errors.companyName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="Company Address" className="block text-sm">
                      Company Address
                    </label>
                    <input
                      id="companyAddress"
                      {...register("companyAddress")}
                      className="w-full p-2 bg-white border rounded-md"
                      placeholder="Company Address"
                    />
                    {errors.companyAddress && (
                      <p className="text-sm text-red-500">
                        {errors.companyAddress.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="Account Name" className="block text-sm">
                      Account Name
                    </label>
                    <input
                      id="accountName"
                      {...register("companyAddress")}
                      className="w-full p-2 bg-white border rounded-md"
                      placeholder="Account Name"
                    />
                    {errors.accountName && (
                      <p className="text-sm text-red-500">
                        {errors.accountName.message}
                      </p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="accountNumber" className="block text-sm">
                        Account Number
                      </label>
                      <input
                        id="accountNumber"
                        {...register("accountNumber")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="Account Number"
                      />
                      {errors.accountNumber && (
                        <p className="text-sm text-red-500">
                          {errors.accountNumber.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="bankName" className="block text-sm">
                        Bank Name
                      </label>
                      <input
                        id="bankName"
                        {...register("monthlyIncome")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="Bank Name"
                      />
                      {errors.bankName && (
                        <p className="text-sm text-red-500">
                          {errors.bankName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col items-center justify-center p-4 border border-gray-400 border-dashed rounded-md">
                      <CloudUploadRoundedIcon className="text-2xl text-gray-500" />
                      <input
                        id="bankStatement"
                        type="file"
                        {...register("bankStatement")}
                        className="hidden"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0] || null;
                        }}
                      />
                      <span className="mt-2 text-sm text-gray-500">
                        Upload Bank Statement (6 months minimum)
                      </span>
                    </div>
                    {errors.bankStatement && (
                      <p className="text-sm text-red-500">
                        {errors.bankStatement.message}
                      </p>
                    )}
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-900 rounded-md"
                  disabled={activeStep === 0 && subStep === 0}
                >
                  Back
                </button>
                <button
                  type={
                    userType === "admin" || activeStep === steps.length - 1
                      ? "submit"
                      : "button"
                  }
                  onClick={
                    userType !== "admin" && activeStep !== steps.length - 1
                      ? handleNext
                      : undefined
                  }
                  className={`flex items-center gap-1 px-6 py-4 rounded-md ${
                    activeStep === steps.length - 1
                      ? "text-sm text-white bg-green-600"
                      : "text-green-800 bg-white border border-green-800"
                  }`}
                >
                  {userType === "admin" || activeStep === steps.length - 1 ? (
                    "Submit"
                  ) : (
                    <>
                      Continue
                      <img src={rightArrow} alt="Right arrow" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
