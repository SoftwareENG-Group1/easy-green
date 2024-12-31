import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import { z } from "zod";
import { UserSchema } from "../validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import Logo from "../../../assets/images/Easy-Green.png";
import { toast } from "react-toastify";
import Modal from "./component/modal";
import { createUser, createBorrower } from "./component/api";

type Inputs = z.infer<typeof UserSchema>;

const steps: { id: string; name: string; fields: (keyof Inputs)[] }[] = [
  {
    id: "Step 1",
    name: "Personal Info",
    fields: ["firstName", "lastName", "phoneNumber", "email", "password"],
  },
  {
    id: "Step 2",
    name: "Address & ID Verification",
    fields: [
      "country",
      "state",
      "city",
      "streetAddress",
      "zip",
      "bvn",
      "identification",
    ],
  },
  {
    id: "Step 3",
    name: "Next of Kin Details",
    fields: [
      "nextOfKinName",
      "nextOfKinPhone",
      "nextOfKinCountry",
      "nextOfKinState",
      "nextOfKinStreetAddress",
      "nextOfKinCity",
      "nextOfKinZip",
    ],
  },
  {
    id: "Step 4",
    name: "Employment & Financial Info",
    fields: [
      "companyName",
      "companyAddress",
      "monthlyIncome",
      "accountName",
      "bankName",
      "accountNumber",
    ],
  },
];

export default function Form() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState("customer");
  const [fileName1, setFileName1] = useState<File | null>(null);
  const [fileName2, setFileName2] = useState<File | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const delta = currentStep - previousStep;

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(UserSchema),
  });

  const employmentStatus = watch("employmentStatus");
  const isMonthlyIncomeDisabled =
    employmentStatus === "student" ||
    employmentStatus === "retired" ||
    employmentStatus === "unemployed";
  const processForm: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      if (userId) {
        await submitRemainingSteps(userId);
      }
      reset();
      setTimeout(() => {
        setIsModalVisible(true);
      }, 1000);
    } catch (error) {
      console.error("Error in processForm:", error);
    }
  };

  const submitAdmin = async () => {
    try {
      submitFirstStep();
      setTimeout(() => {
        setIsModalVisible(true);
        reset();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const submitFirstStep = async () => {
    const fieldsToSubmit = steps[0].fields;
    const valuesToSubmit = fieldsToSubmit.reduce((acc, field) => {
      const value = getValues(field);
      acc[field] = value;
      return acc;
    }, {} as Record<string, unknown>);

    try {
      const response = await createUser(valuesToSubmit);
      console.log("API Response:", response);
      const userId = response.userId;
      console.log(`user id = ${userId}`);
      setUserId(userId);
      return userId;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error during submission:", errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        style: {
          borderRadius: "8px",
          fontSize: "16px",
        },
      });
    }
  };

  const submitRemainingSteps = async (userId: unknown) => {
    const fieldsToSubmit = steps.slice(1).flatMap((step) => step.fields);
    const valuesToSubmit = fieldsToSubmit.reduce((acc, field) => {
      const value = getValues(field);
      acc[field] = value;
      return acc;
    }, {} as Record<string, unknown>);

    try {
      const response = await createBorrower(valuesToSubmit, userId);
      if (!response.ok) {
        throw new Error("Failed to submit the remaining steps");
      }

      const data = await response.json();
      console.log("Final submission response:", data);
      toast.success("Form successfully submitted!", {
        position: "top-right",
        autoClose: 5000,
        style: {
          borderRadius: "8px",
          fontSize: "16px",
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      console.error("Error during final submission:", errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        style: {
          borderRadius: "8px",
          fontSize: "16px",
        },
      });
    }
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    console.log(steps.length);
    const fields = steps[currentStep].fields;
    console.log(fields);

    // Loop through each field to validate it individually
    const invalidFields: string[] = [];
    for (const field of fields) {
      const isValid = await trigger(field as FieldName, { shouldFocus: true });
      if (!isValid) {
        invalidFields.push(field);
      }
    }

    // If there are any invalid fields, log them and return early
    if (invalidFields.length > 0) {
      console.log("Invalid fields:", invalidFields);
      toast.error(
        `The following fields are invalid: ${invalidFields.join(", ")}`,
        {
          position: "top-right",
          autoClose: 5000,
          style: {
            borderRadius: "8px",
            fontSize: "16px",
          },
        }
      );
      return;
    }

    if (currentStep === 0) {
      try {
         const userId = await submitFirstStep();
        if (!userId) {
          throw new Error("User ID creation failed");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred.";
        console.error("Error during Step 1 submission:", errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          style: {
            borderRadius: "8px",
            fontSize: "16px",
          },
        });
      }
    }
    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
      console.log(currentStep);
    } else if (currentStep === steps.length - 1) {
      console.log(currentStep);
    }
  };

  const prev = () => {
    if (currentStep > 1) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    } else {
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
  };

  const handleSubmitAction = async () => {
    if (currentStep === 0) {
      submitAdmin();
    } else {
      await handleSubmit(processForm)();
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleUserTypeSwitch = (newUserType: string) => {
    setUserType(newUserType);
    reset();
    setCurrentStep(0);
    setFileName1(null);
    setFileName2(null);
  };

  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setValue("identification", file, { shouldValidate: true });
    }
  };

  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFileName2(file);
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="grid self-center w-full h-full grid-cols-3 bg-white rounded-md shadow-md">
        <div className="flex flex-col items-center justify-center p-8 text-white bg-[#003300]">
          <div className="mb-4">
            <img src={Logo} alt="Easy Green Logo" className="w-full h-full" />
          </div>
        </div>
        <div className="flex items-center justify-center min-h-screen col-span-2 p-10 transform scale-90">
          <div className="flex flex-col min-w-[80%] gap-10">
            <h2 className="mb-4 font-[Glowfor] text-center text-[#003300] text-7xl">
              Create your account
            </h2>
            <div className="flex justify-center gap-6 mb-4">
              <button
                className={`px-8 py-4 rounded-md ${
                  userType === "admin"
                    ? "bg-[#114411] text-white"
                    : "bg-gray-300 text-[#114411]" 
                }`}
                onClick={() => handleUserTypeSwitch("admin")}
              >
                Admin
              </button>
              <button
                className={`px-8 py-4 rounded-md ${
                  userType === "customer"
                    ? "bg-[#114411] text-white"
                    : "bg-gray-300 text-[#114411]"
                }`}
                onClick={() => handleUserTypeSwitch("customer")}
              >
                Customer
              </button>
            </div>

            {/* steps */}
            <nav aria-label="Progress">
              <ol
                role="list"
                className="space-y-4 md:flex md:space-x-8 md:space-y-0"
              >
                {steps.map((step, index) => {
                  // If user is admin, only show Step 1
                  if (userType === "admin" && index !== 0) {
                    return null; // Skip rendering steps beyond Step 1 for admin
                  }

                  return (
                    <li key={step.name} className="md:flex-1">
                      {currentStep > index ? (
                        <div className="flex flex-col w-full py-2 pl-4 transition-colors border-l-4 border-green-900 group md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                          <span className="text-sm font-medium text-green-900 transition-colors">
                            {step.id}
                          </span>
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                        </div>
                      ) : currentStep === index ? (
                        <div
                          className="flex flex-col w-full py-2 pl-4 border-l-4 border-green-900 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                          aria-current="step"
                        >
                          <span className="text-sm font-medium text-green-900">
                            {step.id}
                          </span>
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col w-full py-2 pl-4 transition-colors border-l-4 border-gray-200 group md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                          <span className="text-sm font-medium text-gray-500 transition-colors">
                            {step.id}
                          </span>
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>

            {/* Form */}
            <form className="mt-12 text-black" onSubmit={handleSubmit(processForm)}>
              {currentStep === 0 && (
                <motion.div
                  initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="flex flex-col gap-4">
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
                        {...register("phoneNumber")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="Phone"
                      />
                      {errors.phoneNumber && (
                        <p className="text-sm text-red-500">
                          {errors.phoneNumber.message}
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
                      />
                      {errors.password && (
                        <p className="text-sm text-red-500">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm"
                      >
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="Confirm Password"
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-6">
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
                          accept=".jpg,.png,.pdf"
                          className="hidden"
                          onChange={handleFileChange1}
                        />

                        <label
                          htmlFor="identification"
                          className="mt-2 text-sm text-gray-500 cursor-pointer"
                        >
                          {fileName1?.name ||
                            "Click to upload one identification (NIN, Passport, or Driver's License)"}
                        </label>
                      </div>
                      {errors.identification && (
                        <p className="text-sm text-red-500">
                          {errors.identification.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="flex flex-col gap-4">
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
                    <div>
                      <label
                        htmlFor="nextOfKinRelationship"
                        className="block text-sm"
                      >
                        Relationship
                      </label>
                      <select
                        id="nextOfKinRelationship"
                        {...register("nextOfKinRelationship")}
                        className="w-full p-2 bg-white border rounded-md"
                      >
                        <option value="">Select Relationship</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Friend">Friend</option>
                      </select>
                      {errors.nextOfKinRelationship && (
                        <p className="text-sm text-red-500">
                          {errors.nextOfKinRelationship.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="nextOfKinCountry"
                          className="block text-sm"
                        >
                          Country
                        </label>
                        <input
                          id="nextOfKinCountry"
                          {...register("nextOfKinCountry")}
                          className="w-full p-2 bg-white border rounded-md"
                          placeholder="Country"
                        />
                        {errors.nextOfKinCountry && (
                          <p className="text-sm text-red-500">
                            {errors.nextOfKinCountry.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="nextOfKinState"
                          className="block text-sm"
                        >
                          State
                        </label>
                        <input
                          id="nextOfKinState"
                          {...register("nextOfKinState")}
                          className="w-full p-2 bg-white border rounded-md"
                          placeholder="State"
                        />
                        {errors.nextOfKinState && (
                          <p className="text-sm text-red-500">
                            {errors.nextOfKinState.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="nextOfKinStreetAddress"
                        className="block text-sm"
                      >
                        Street Address
                      </label>
                      <input
                        id="nextOfKinStreetAddress"
                        {...register("nextOfKinStreetAddress")}
                        className="w-full p-2 bg-white border rounded-md"
                        placeholder="Street Address"
                      />
                      {errors.nextOfKinStreetAddress && (
                        <p className="text-sm text-red-500">
                          {errors.nextOfKinStreetAddress.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="nextOfKinCity"
                          className="block text-sm"
                        >
                          City
                        </label>
                        <input
                          id="nextOfKinCity"
                          {...register("nextOfKinCity")}
                          className="w-full p-2 bg-white border rounded-md"
                          placeholder="City"
                        />
                        {errors.nextOfKinCity && (
                          <p className="text-sm text-red-500">
                            {errors.nextOfKinCity.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="nextOfKinZip" className="block text-sm">
                          Zip Code
                        </label>
                        <input
                          id="nextOfKinZip"
                          {...register("nextOfKinZip")}
                          className="w-full p-2 bg-white border rounded-md"
                          placeholder="Zip Code"
                        />
                        {errors.nextOfKinZip && (
                          <p className="text-sm text-red-500">
                            {errors.nextOfKinZip.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {currentStep === 3 && (
                <motion.div
                  initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="employmentStatus"
                          className="block text-sm"
                        >
                          Employment Status
                        </label>
                        <select
                          id="employmentStatus"
                          {...register("employmentStatus")}
                          className="w-full p-2 bg-white border rounded-md"
                        >
                          <option value="" disabled>
                            Select Employment Status
                          </option>
                          <option value="student">Student</option>
                          <option value="retired">Retired</option>
                          <option value="unemployed">Unemployed</option>
                          <option value="selfEmployed">Self Employed</option>
                          <option value="employed">Employed</option>{" "}
                          {/* Added "Employed" */}
                        </select>
                        {errors.employmentStatus && (
                          <p className="text-sm text-red-500">
                            {errors.employmentStatus.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="monthlyIncome"
                          className="block text-sm"
                        >
                          Monthly Income
                        </label>
                        <input
                          id="monthlyIncome"
                          {...register("monthlyIncome")}
                          {...register("monthlyIncome")}
                          className={`w-full p-2 bg-white border rounded-md ${
                            isMonthlyIncomeDisabled
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : ""
                          }`}
                          placeholder="Monthly Income"
                          disabled={
                            employmentStatus === "student" ||
                            employmentStatus === "retired" ||
                            employmentStatus === "unemployed"
                          }
                        />
                        {errors.monthlyIncome && (
                          <p className="text-sm text-red-500">
                            {errors.monthlyIncome.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Conditionally render Company Name and Address */}
                    {(employmentStatus === "selfEmployed" ||
                      employmentStatus === "employed") && (
                      <>
                        <div>
                          <label
                            htmlFor="companyName"
                            className="block text-sm"
                          >
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
                          <label
                            htmlFor="companyAddress"
                            className="block text-sm"
                          >
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
                      </>
                    )}

                    {/* Account Name */}
                    <div>
                      <label htmlFor="accountName" className="block text-sm">
                        Account Name
                      </label>
                      <input
                        id="accountName"
                        {...register("accountName")}
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
                        <label
                          htmlFor="accountNumber"
                          className="block text-sm"
                        >
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
                          {...register("bankName")}
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

                    {/* File Upload */}
                    <div>
                      <div className="flex flex-col items-center justify-center p-4 border border-gray-400 border-dashed rounded-md">
                        <CloudUploadRoundedIcon className="text-2xl text-gray-500" />
                        <input
                          id="identification"
                          type="file"
                          accept=".jpg,.png,.pdf" // Accept specific file types
                          {...register("identification", {
                            required: "File is required",
                            validate: (value) =>
                              (value instanceof File &&
                                value.size < 5 * 1024 * 1024) || // Limit file size to 5MB
                              "File size must be less than 5MB",
                          })}
                          onChange={handleFileChange2}
                          className="hidden"
                        />
                        <label
                          htmlFor="identification"
                          className="mt-2 text-sm text-gray-500 cursor-pointer"
                        >
                          {fileName2?.name ||
                            "Upload Bank Statement (6 months minimum)"}
                        </label>
                      </div>
                      {errors.identification && (
                        <p className="text-sm text-red-500">
                          {errors.identification.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </form>
            <Modal isVisible={isModalVisible} onClose={closeModal} />

            {/* Navigation */}
            <div className="pt-5 mt-8">
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prev}
                  disabled={currentStep === 0}
                  className="px-2 py-1 text-sm font-semibold bg-white rounded shadow-sm text-sky-900 ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                    Back
                  </div>
                </button>
                {userType === "admin" || currentStep === steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleSubmitAction}
                    className="flex items-center px-2 py-1 text-sm font-semibold bg-white rounded shadow-sm text-sky-900 ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={next}
                    disabled={currentStep === steps.length - 1}
                    className="flex items-center px-2 py-1 text-sm font-semibold bg-white rounded shadow-sm text-sky-900 ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
