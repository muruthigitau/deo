import { User, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const BillingInfo = ({
  billingInfo = {},
  validationErrors = {},
  handleBlur = () => {},
  handleInputChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // Input styling constants
  const inputBase =
    "w-full pl-10 pr-4 py-2 rounded-lg border transition duration-200 focus:outline-none focus:ring-2 placeholder-gray-500 text-sm text-gray-800 bg-white shadow-sm";
  const labelStyle = "text-gray-700 font-medium mb-1 flex items-center text-sm";
  const requiredMark = (
    <span className="text-red-500 ml-1" title="Required">
      *
    </span>
  );

  const borderColor = (error) =>
    error
      ? "border-red-400 focus:ring-red-200"
      : "border-gray-300 focus:border-lime-400 focus:ring-lime-100";

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      {/* Header with toggle */}
      <div
        className="flex justify-between items-center cursor-pointer text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-semibold text-gray-800">Billing Information</div>
        {isOpen ? (
          <ChevronUp className="text-lime-500" />
        ) : (
          <ChevronDown className="text-lime-500" />
        )}
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="mt-4 space-y-3 transition-all duration-300 ease-in-out">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name Field */}
            <div>
              <label htmlFor="firstName" className={labelStyle}>
                First Name{requiredMark}
              </label>
              <div className="relative">
                <User className="absolute top-3 left-3 h-5 w-5 text-lime-500" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`${inputBase} ${borderColor(
                    validationErrors.firstName
                  )}`}
                  value={billingInfo.firstName || ""}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
              {validationErrors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.firstName}
                </p>
              )}
            </div>

            {/* Last Name Field */}
            <div>
              <label htmlFor="lastName" className={labelStyle}>
                Last Name{requiredMark}
              </label>
              <div className="relative">
                <User className="absolute top-3 left-3 h-5 w-5 text-lime-500" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`${inputBase} ${borderColor(
                    validationErrors.lastName
                  )}`}
                  value={billingInfo.lastName || ""}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
              {validationErrors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email Address{requiredMark}
              </label>
              <div className="relative">
                <Mail className="absolute top-3 left-3 h-5 w-5 text-orange-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`${inputBase} ${borderColor(
                    validationErrors.email
                  )}`}
                  value={billingInfo.email || ""}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className={labelStyle}>
                Phone Number{requiredMark}
              </label>
              <div className="relative">
                <Phone className="absolute top-3 left-3 h-5 w-5 text-red-400" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`${inputBase} ${borderColor(
                    validationErrors.phone
                  )}`}
                  value={billingInfo.phone || ""}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
              </div>
              {validationErrors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.phone}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingInfo;
