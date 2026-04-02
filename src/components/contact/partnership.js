// components/PartnershipForm.js

import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

const PartnershipForm = () => {
  // Use Formspree's useForm hook with your unique Form ID
  const [state, handleSubmit] = useForm("xldlpkbr"); // <-- Replace this with your actual Form ID!
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    townCity: "",
    physicalAddress: "",
    spaceType: "",
    otherSpace: "",
    partnershipType: [],
    otherPartnership: "",
    monthlyReach: "",
    interest: "",
    startTime: "",
    laterStartTime: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => {
        if (checked) {
          return {
            ...prevData,
            partnershipType: [...prevData.partnershipType, value],
          };
        } else {
          return {
            ...prevData,
            partnershipType: prevData.partnershipType.filter(
              (item) => item !== value
            ),
          };
        }
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // If the form submitted successfully, show a thank you message
  if (state.succeeded) {
    return (
      <div className="!bg-gray-50 !min-h-screen !py-20 !flex !items-center !justify-center !text-center">
        <div className="!max-w-xl !mx-auto !bg-white !p-10 !rounded-2xl">
          <h1 className="!text-3xl !font-bold !text-green-800 !mb-4">
            Thank you for your submission!
          </h1>
          <p className="!text-lg !text-gray-600">
            We will review your request and get back to you within 2 working
            days.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="!bg-gray-50 !py-12 !px-4 sm:!px-6 lg:!px-8 !font-sans">
      <div className="!max-w-4xl !mx-auto !bg-white !p-10 md:!p-16 !rounded-2xl">
        <div className="!text-center !mb-10">
          <h1 className="!text-3xl md:!text-4xl !font-extrabold !text-green-800 !leading-tight">
            Partner with African Magic Deodorant
          </h1>
          <p className="!mt-4 !text-lg !text-gray-600">
            Thank you for your interest in partnering with us to bring natural,
            wellness-centred deodorant solutions to more people. Kindly fill in
            the form below, and we’ll get back to you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="!space-y-12">
          {/* Section 1: Contact Information */}
          <div>
            <h3 className="!text-2xl !font-bold !text-green-800 !mb-6">
              1. Contact Information
            </h3>
            <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-8">
              <div>
                <label
                  htmlFor="fullName"
                  className="!block !text-sm !font-medium !text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="!mt-2 !block !w-full !rounded-md !border-gray-300 !shadow-sm !py-3 !px-4 !text-gray-900 focus:!border-green-500 focus:!ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="businessName"
                  className="!block !text-sm !font-medium !text-gray-700"
                >
                  Business/Organization Name (if any)
                </label>
                <input
                  type="text"
                  name="businessName"
                  id="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="!mt-2 !block !w-full !rounded-md !border-gray-300 !shadow-sm !py-3 !px-4 !text-gray-900 focus:!border-green-500 focus:!ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="!block !text-sm !font-medium !text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="!mt-2 !block !w-full !rounded-md !border-gray-300 !shadow-sm !py-3 !px-4 !text-gray-900 focus:!border-green-500 focus:!ring-green-500"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="!mt-1 !text-sm !text-red-600"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="!block !text-sm !font-medium !text-gray-700"
                >
                  Phone Number (WhatsApp preferred)
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="!mt-2 !block !w-full !rounded-md !border-gray-300 !shadow-sm !py-3 !px-4 !text-gray-900 focus:!border-green-500 focus:!ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Location Details */}
          <div>
            <h3 className="!text-2xl !font-bold !text-green-800 !mb-6">
              2. Location Details
            </h3>
            <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-8">
              <div>
                <label
                  htmlFor="townCity"
                  className="!block !text-sm !font-medium !text-gray-700"
                >
                  Town/City
                </label>
                <input
                  type="text"
                  name="townCity"
                  id="townCity"
                  value={formData.townCity}
                  onChange={handleChange}
                  required
                  className="!mt-2 !block !w-full !rounded-md !border-gray-300 !shadow-sm !py-3 !px-4 !text-gray-900 focus:!border-green-500 focus:!ring-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="physicalAddress"
                  className="!block !text-sm !font-medium !text-gray-700"
                >
                  Physical Address (if applicable)
                </label>
                <input
                  type="text"
                  name="physicalAddress"
                  id="physicalAddress"
                  value={formData.physicalAddress}
                  onChange={handleChange}
                  className="!mt-2 !block !w-full !rounded-md !border-gray-300 !shadow-sm !py-3 !px-4 !text-gray-900 focus:!border-green-500 focus:!ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Type of Space */}
          <div>
            <h3 className="!text-2xl !font-bold !text-green-800 !mb-6">
              3. Type of Space
            </h3>
            <p className="!text-sm !text-gray-600 !mb-4">
              Select the option that best describes your business or space:
            </p>
            <div className="!grid !grid-cols-2 sm:!grid-cols-3 !gap-4">
              {[
                "Gym",
                "Spa",
                "Wellness Studio",
                "Community Group",
                "Retail Shop",
                "Online Store",
                "Personal Reseller",
                "Wellness Event",
              ].map((type) => (
                <div key={type} className="!flex !items-center">
                  <input
                    id={`space_${type.toLowerCase().replace(/\s/g, "_")}`}
                    name="spaceType"
                    type="radio"
                    value={type}
                    checked={formData.spaceType === type}
                    onChange={handleChange}
                    className="!h-4 !w-4 !text-green-600 !border-gray-300 focus:!ring-green-500"
                  />
                  <label
                    htmlFor={`space_${type.toLowerCase().replace(/\s/g, "_")}`}
                    className="!ml-3 !block !text-sm !font-medium !text-gray-700"
                  >
                    {type}
                  </label>
                </div>
              ))}
              <div className="!flex !items-center">
                <input
                  id="space_other"
                  name="spaceType"
                  type="radio"
                  value="Other"
                  checked={formData.spaceType === "Other"}
                  onChange={handleChange}
                  className="!h-4 !w-4 !text-green-600 !border-gray-300 focus:!ring-green-500"
                />
                <label
                  htmlFor="space_other"
                  className="!ml-3 !block !text-sm !font-medium !text-gray-700"
                >
                  Other
                </label>
                {formData.spaceType === "Other" && (
                  <input
                    type="text"
                    name="otherSpace"
                    id="other_space"
                    value={formData.otherSpace}
                    onChange={handleChange}
                    className="!mt-1 !ml-2 !block !w-full !rounded-md !border-gray-300 !shadow-sm !py-2 !px-3 !text-sm focus:!border-green-500 focus:!ring-green-500"
                    placeholder="Specify here"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Section 4: How would you like to partner? */}
          <div>
            <h3 className="!text-2xl !font-bold !text-green-800 !mb-6">
              4. How would you like to partner with us?
            </h3>
            <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
              {[
                "Stock the deodorant in my space",
                "Resell within my network",
                "Host a wellness booth or demo session",
                "Recommend to clients/members",
              ].map((type) => (
                <div key={type} className="!flex !items-center">
                  <input
                    id={`partner_${type.toLowerCase().replace(/\s/g, "_")}`}
                    name="partnershipType"
                    type="checkbox"
                    value={type}
                    checked={formData.partnershipType.includes(type)}
                    onChange={handleChange}
                    className="!h-4 !w-4 !text-green-600 !border-gray-300 !rounded focus:!ring-green-500"
                  />
                  <label
                    htmlFor={`partner_${type
                      .toLowerCase()
                      .replace(/\s/g, "_")}`}
                    className="!ml-3 !block !text-sm !font-medium !text-gray-700"
                  >
                    {type}
                  </label>
                </div>
              ))}
              <div className="!flex !items-center">
                <input
                  id="partner_other"
                  name="partnershipType"
                  type="checkbox"
                  value="Other"
                  checked={formData.partnershipType.includes("Other")}
                  onChange={handleChange}
                  className="!h-4 !w-4 !text-green-600 !border-gray-300 !rounded focus:!ring-green-500"
                />
                <label
                  htmlFor="partner_other"
                  className="!ml-3 !block !text-sm !font-medium !text-gray-700"
                >
                  Other
                </label>
                {formData.partnershipType.includes("Other") && (
                  <input
                    type="text"
                    name="otherPartnership"
                    id="other_partnership"
                    value={formData.otherPartnership}
                    onChange={handleChange}
                    className="!mt-1 !ml-2 !block !w-full !rounded-md !border-gray-300 !shadow-sm !py-2 !px-3 !text-sm focus:!border-green-500 focus:!ring-green-500"
                    placeholder="Specify here"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Approximate Number of Clients/Members */}
          <div>
            <h3 className="!text-2xl !font-bold !text-green-800 !mb-6">
              5. Approximate Number of Clients/Members You Reach Monthly
            </h3>
            <p className="!text-sm !text-gray-600 !mb-4">
              e.g., 50 clients, 200 members, 10 classes per week
            </p>
            <textarea
              id="monthlyReach"
              name="monthlyReach"
              rows="3"
              value={formData.monthlyReach}
              onChange={handleChange}
              className="!mt-2 !block !w-full !rounded-md !border-gray-300 !shadow-sm !py-3 !px-4 !text-gray-900 focus:!border-green-500 focus:!ring-green-500"
            ></textarea>
          </div>

          {/* Section 6: Why partner? */}
          <div>
            <h3 className="!text-2xl !font-bold !text-green-800 !mb-6">
              6. Why does this partnership interest you?
            </h3>
            <p className="!text-sm !text-gray-600 !mb-4">
              Feel free to share your passion for wellness or how this aligns
              with your values.
            </p>
            <textarea
              id="interest"
              name="interest"
              rows="4"
              value={formData.interest}
              onChange={handleChange}
              className="!mt-2 !block !w-full !rounded-md !border-gray-300 !shadow-sm !py-3 !px-4 !text-gray-900 focus:!border-green-500 focus:!ring-green-500"
            ></textarea>
          </div>

          {/* Section 7: When to start? */}
          <div>
            <h3 className="!text-2xl !font-bold !text-green-800 !mb-6">
              7. When would you like to start the partnership?
            </h3>
            <div className="!space-y-4">
              {["Immediately", "Within the next month"].map((time) => (
                <div key={time} className="!flex !items-center">
                  <input
                    id={`start_${time.toLowerCase().replace(/\s/g, "_")}`}
                    name="startTime"
                    type="radio"
                    value={time}
                    checked={formData.startTime === time}
                    onChange={handleChange}
                    className="!h-4 !w-4 !text-green-600 !border-gray-300 focus:!ring-green-500"
                  />
                  <label
                    htmlFor={`start_${time.toLowerCase().replace(/\s/g, "_")}`}
                    className="!ml-3 !block !text-sm !font-medium !text-gray-700"
                  >
                    {time}
                  </label>
                </div>
              ))}
              <div className="!flex !items-center">
                <input
                  id="start_later"
                  name="startTime"
                  type="radio"
                  value="Later"
                  checked={formData.startTime === "Later"}
                  onChange={handleChange}
                  className="!h-4 !w-4 !text-green-600 !border-gray-300 focus:!ring-green-500"
                />
                <label
                  htmlFor="start_later"
                  className="!ml-3 !block !text-sm !font-medium !text-gray-700"
                >
                  Later
                </label>
                {formData.startTime === "Later" && (
                  <input
                    type="text"
                    name="laterStartTime"
                    id="later_start_time"
                    value={formData.laterStartTime}
                    onChange={handleChange}
                    className="!mt-1 !ml-2 !block !w-full !rounded-md !border-gray-300 !shadow-sm !py-2 !px-3 !text-sm focus:!border-green-500 focus:!ring-green-500"
                    placeholder="Specify here"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Section 8: Questions or Notes */}
          <div>
            <h3 className="!text-2xl !font-bold !text-green-800 !mb-6">
              8. Any Questions or Notes for Us?
            </h3>
            <p className="!text-sm !text-gray-600 !mb-4">
              We’d love to hear your thoughts or ideas.
            </p>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              className="!mt-2 !block !w-full !rounded-md !border-gray-300 !shadow-sm !py-3 !px-4 !text-gray-900 focus:!border-green-500 focus:!ring-green-500"
            ></textarea>
          </div>

          <div className="!flex !justify-end !mt-12">
            <button
              type="submit"
              disabled={state.submitting}
              className="!inline-flex !items-center !px-8 !py-4 !border !border-transparent !text-base !font-semibold !rounded-md !text-white !bg-green-800 hover:!bg-green-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-green-500 !transition-colors !duration-200 disabled:!opacity-50"
            >
              Submit Request
            </button>
          </div>

          <p className="!mt-6 !text-sm !text-center !text-gray-500">
            Once submitted, our team will review your request and reach out
            within 2 working days. We’re excited about the potential to work
            together!
          </p>
        </form>
      </div>
    </div>
  );
};

export default PartnershipForm;
