import { useState } from "react";
import {
  MapPin,
  Building,
  ChevronDown,
  ChevronUp,
  Store,
  PackageCheck,
} from "lucide-react";

const ShippingAddress = ({
  shippingAddress = {},
  pickupLocations = [],
  loading = false,
  error = null,
  validationErrors = {},
  handleInputChange = () => {},
  onDeliveryOptionChange = () => {},
  onLocationSelect = () => {},
  onCustomAddressSelect = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [deliveryOption, setDeliveryOption] = useState(
    shippingAddress.deliveryOption || "pickup"
  );

  // Style constants
  const inputBase =
    "w-full pl-10 pr-4 py-2.5 rounded-lg border transition duration-200 focus:outline-none focus:ring-2 placeholder-gray-500 text-gray-800 bg-white shadow-sm text-sm";
  const labelStyle =
    "text-gray-700 font-medium mb-0.5 flex items-center text-sm";
  const requiredMark = (
    <span className="text-red-500 ml-1" title="Required">
      *
    </span>
  );

  const borderColor = (error) =>
    error
      ? "border-red-400 focus:ring-red-200"
      : "border-gray-300 focus:border-lime-400 focus:ring-lime-100";

  const handleOptionChange = (option) => {
    setDeliveryOption(option);
    if (option === "pickup") {
      onDeliveryOptionChange("pickup");
    } else {
      onCustomAddressSelect();
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-gray-800 text-sm font-semibold">
          Shipping / Pickup Options
        </div>
        {isOpen ? (
          <ChevronUp className="text-lime-500" />
        ) : (
          <ChevronDown className="text-lime-500" />
        )}
      </div>

      {isOpen && (
        <div className="mt-3 transition-all duration-300 ease-in-out space-y-4">
          {/* Delivery Option Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOptionChange("pickup")}
              className={`px-3 py-1.5 rounded-lg border ${
                deliveryOption === "pickup"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              Pickup Location
            </button>
            <button
              onClick={() => handleOptionChange("custom")}
              className={`px-3 py-1.5 rounded-lg border ${
                deliveryOption === "custom"
                  ? "bg-lime-500 text-white border-lime-500"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              Custom Address
            </button>
          </div>

          {/* Pickup Locations */}
          {deliveryOption === "pickup" ? (
            <div>
              {loading ? (
                <div className="text-center py-4">
                  Loading pickup locations...
                </div>
              ) : error ? (
                <div className="text-red-500 text-center py-4">{error}</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pickupLocations.map((location) => (
                    <div
                      key={location.id}
                      onClick={() => onLocationSelect(location)}
                      className={`border rounded-lg p-3 cursor-pointer transition shadow-sm ${
                        shippingAddress.pickup_station === location.id
                          ? "border-lime-500 bg-lime-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Store className="text-orange-500" />
                        <div className="font-medium text-gray-800 text-sm">
                          {location.name}
                        </div>
                      </div>
                      <div className="text-gray-600 text-xs">
                        {location.street_address}, {location.city}
                      </div>
                      <div className="text-orange-500 text-xs mt-1">
                        Cost: KES {location.cost}
                      </div>
                      {shippingAddress.pickup_station === location.id && (
                        <div className="text-lime-600 mt-1 text-xs font-medium">
                          Selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Custom Address Form */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Location Name */}
              <div className="sm:col-span-2">
                <div htmlFor="location_name" className={labelStyle}>
                  Location Name{requiredMark}
                </div>
                <div className="relative">
                  <Building className="absolute top-2 left-3 h-4 w-4 text-lime-500" />
                  <input
                    type="text"
                    id="location_name"
                    name="location_name"
                    className={`${inputBase} ${borderColor(
                      validationErrors.location_name
                    )}`}
                    value={shippingAddress.location_name || ""}
                    onChange={handleInputChange}
                  />
                </div>
                {validationErrors.location_name && (
                  <div className="text-red-500 text-xs mt-1">
                    {validationErrors.location_name}
                  </div>
                )}
              </div>

              {/* Street Address */}
              <div className="sm:col-span-2">
                <div htmlFor="street_address" className={labelStyle}>
                  Street Address{requiredMark}
                </div>
                <div className="relative">
                  <MapPin className="absolute top-2 left-3 h-4 w-4 text-lime-500" />
                  <input
                    type="text"
                    id="street_address"
                    name="street_address"
                    className={`${inputBase} ${borderColor(
                      validationErrors.street_address
                    )}`}
                    value={shippingAddress.street_address || ""}
                    onChange={handleInputChange}
                  />
                </div>
                {validationErrors.street_address && (
                  <div className="text-red-500 text-xs mt-1">
                    {validationErrors.street_address}
                  </div>
                )}
              </div>

              {/* City */}
              <div>
                <div htmlFor="city" className={labelStyle}>
                  City{requiredMark}
                </div>
                <div className="relative">
                  <Building className="absolute top-2 left-3 h-4 w-4 text-lime-500" />
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className={`${inputBase} ${borderColor(
                      validationErrors.city
                    )}`}
                    value={shippingAddress.city || ""}
                    onChange={handleInputChange}
                  />
                </div>
                {validationErrors.city && (
                  <div className="text-red-500 text-xs mt-1">
                    {validationErrors.city}
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div>
                <div htmlFor="location_description" className={labelStyle}>
                  Additional Info
                </div>
                <div className="relative">
                  <PackageCheck className="absolute top-2 left-3 h-4 w-4 text-red-400" />
                  <input
                    type="text"
                    id="location_description"
                    name="location_description"
                    className={`${inputBase} ${borderColor(
                      validationErrors.location_description
                    )}`}
                    value={shippingAddress.location_description || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
