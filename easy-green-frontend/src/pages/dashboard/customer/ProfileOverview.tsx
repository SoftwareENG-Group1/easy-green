import { Edit } from '@mui/icons-material'; // Import the Edit icon from MUI
import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { Avatar } from '@mui/material';

function ProfileSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Munachim',
    lastName: 'Anya',
    email: 'munachianya@gmail.com',
    phoneNumber: '09011718329',
    dateOfBirth: '26-12-2005',
    gender: 'Male',
    nextOfKinFirstName: 'Collins',
    nextOfKinLastName: 'Anya',
    nextOfKinPhoneNumber: '08032741290',
    nextOfKinRelationship: 'Brother',
    nextOfKinStreet: '27, Water Corporation Dr',
    nextOfKinCountry: 'Lagos',
    companyName: 'Apple Inc',
    jobTitle: 'Senior Creative Developer',
    companyAddress: 'Silicon Valley',
    occupation: 'Developer',
    monthlyIncome: 'Too much money',
    bankName: 'Kuda Bank',
    accountNumber: '2036412435'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Profile Data:", formData);
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="w-screen h-screen p-8 mx-auto text-black bg-[#0F5015]">
      {/* Display User Info */}
      <div className="grid h-full grid-cols-2 gap-8">
        {/* Profile Info Section */}
        <div className="flex items-center justify-around bg-gray-100 rounded-lg shadow-md">
          <Avatar 
          sx={{
            width: 200,
            height: 200,
          }}
          />
          <div className="flex flex-col items-start space-y-2">
            <div className="text-lg font-semibold text-gray-700">
              {`${formData.firstName} ${formData.lastName}`}
            </div>
            <div className="text-gray-600">{formData.email}</div>
            <div className="text-gray-600">{formData.phoneNumber}</div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 text-blue-500 hover:text-blue-700"
            >
              <Edit /> Edit Profile
            </button>
          </div>
        </div>

        {/* Bank Info Section */}
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="mb-4 text-3xl font-semibold text-gray-700">Bank Info</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <strong className="text-lg text-gray-700">Bank Name:</strong>
              <span>{formData.bankName}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg text-gray-700">Account Number:</strong>
              <span>{formData.accountNumber}</span>
            </div>
          </div>
        </div>

        {/* Next of Kin Info Section */}
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="mb-4 text-3xl font-semibold text-gray-700">Next of Kin Info</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <strong className="text-lg text-gray-700">Next of Kin Name:</strong>
              <span>{`${formData.nextOfKinFirstName} ${formData.nextOfKinLastName}`}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg text-gray-700">Phone Number:</strong>
              <span>{formData.nextOfKinPhoneNumber}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg text-gray-700">Relationship:</strong>
              <span>{formData.nextOfKinRelationship}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg text-gray-700">Address:</strong>
              <span>{`${formData.nextOfKinStreet}, ${formData.nextOfKinCountry}`}</span>
            </div>
          </div>
        </div>

        {/* Employment Info Section */}
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="mb-4 text-3xl font-semibold text-gray-700">Employment Info</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <strong className="text-lg text-gray-700">Company Name:</strong>
              <span>{formData.companyName}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg text-gray-700">Job Title:</strong>
              <span>{formData.jobTitle}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg text-gray-700">Company Address:</strong>
              <span>{formData.companyAddress}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg text-gray-700">Occupation:</strong>
              <span>{formData.occupation}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg text-gray-700">Monthly Income:</strong>
              <span>{`$${formData.monthlyIncome}`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Updating Information */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
            <h4 className="mb-4 text-2xl font-semibold">Update Your Profile</h4>
            <Tab.Group>
              <Tab.List className="flex mb-4 space-x-4">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-4 py-2 rounded-lg focus:outline-none",
                      selected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                    )
                  }
                >
                  Personal Info
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-4 py-2 rounded-lg focus:outline-none",
                      selected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                    )
                  }
                >
                  Next of Kin
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-4 py-2 rounded-lg focus:outline-none",
                      selected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                    )
                  }
                >
                  Employment Info
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "px-4 py-2 rounded-lg focus:outline-none",
                      selected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                    )
                  }
                >
                  Bank Info
                </Tab>
              </Tab.List>
              <Tab.Panels>
                {/* Personal Information Tab */}
                <Tab.Panel className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block font-medium">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                  </div>
                </Tab.Panel>

                {/* Next of Kin Tab */}
                <Tab.Panel className="space-y-4">
                  {/* Next of Kin Fields */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block font-medium">Next of Kin First Name</label>
                      <input
                        type="text"
                        name="nextOfKinFirstName"
                        value={formData.nextOfKinFirstName}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Next of Kin Last Name</label>
                      <input
                        type="text"
                        name="nextOfKinLastName"
                        value={formData.nextOfKinLastName}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Next of Kin Phone</label>
                      <input
                        type="text"
                        name="nextOfKinPhoneNumber"
                        value={formData.nextOfKinPhoneNumber}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Relationship</label>
                      <input
                        type="text"
                        name="nextOfKinRelationship"
                        value={formData.nextOfKinRelationship}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Next of Kin Address</label>
                      <input
                        type="text"
                        name="nextOfKinStreet"
                        value={formData.nextOfKinStreet}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Next of Kin Country</label>
                      <input
                        type="text"
                        name="nextOfKinCountry"
                        value={formData.nextOfKinCountry}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                  </div>
                </Tab.Panel>

                {/* Employment Tab */}
                <Tab.Panel className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block font-medium">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Job Title</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Company Address</label>
                      <input
                        type="text"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Occupation</label>
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Monthly Income</label>
                      <input
                        type="text"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                  </div>
                </Tab.Panel>

                {/* Bank Info Tab */}
                <Tab.Panel className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block font-medium">Bank Name</label>
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-medium">Account Number</label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        className="w-full p-2 border-2 border-[#D6DEE0] rounded-md"
                      />
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSettings;