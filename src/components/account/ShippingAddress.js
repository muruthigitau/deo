import { useState } from "react";
import {
  MapPin,
  Building,
  Flag,
  PackageCheck,
  ChevronDown,
  ChevronUp,
  Store,
} from "lucide-react";

const pickupLocations = [
  { id: 1, name: "Westlands Pickup Point", address: "Westlands Rd, Nairobi" },
  { id: 2, name: "CBD Pickup Center", address: "Moi Avenue, Nairobi" },
  { id: 3, name: "Karen Hub", address: "Lang'ata Rd, Nairobi" },
  { id: 4, name: "Two Rivers Mall", address: "Limuru Rd, Nairobi" },
];

const ShippingAddress = ({
  shippingAddress,
  setShippingAddress,
  validationErrors,
  handleBlur,
  handleInputChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [usePickup, setUsePickup] = useState(false);
  const [selectedPickup, setSelectedPickup] = useState(null);

  const toggleOpen = () => setIsOpen(!isOpen);
  const togglePickup = () => setUsePickup(!usePickup);

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

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
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
          {/* Toggle Pickup or Delivery */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setUsePickup(false)}
              className={`px-3 py-1.5 rounded-lg border ${
                !usePickup
                  ? "bg-lime-500 text-white border-lime-500"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              Deliver to Address
            </button>
            <button
              onClick={togglePickup}
              className={`px-3 py-1.5 rounded-lg border ${
                usePickup
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              Pickup Location
            </button>
          </div>

          {/* Pickup Locations */}
          {usePickup ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
              {pickupLocations.map((location) => (
                <div
                  key={location.id}
                  onClick={() => setSelectedPickup(location.id)}
                  className={`border rounded-lg p-3 cursor-pointer transition shadow-sm ${
                    selectedPickup === location.id
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
                    {location.address}
                  </div>
                  {selectedPickup === location.id && (
                    <div className="text-lime-600 mt-1 text-xs font-medium">
                      Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Shipping Address Inputs
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Street Address */}
              <div>
                <div htmlFor="street" className={labelStyle}>
                  Street Address{requiredMark}
                </div>
                <div className="relative">
                  <MapPin className="absolute top-2 left-3 h-4 w-4 text-lime-500" />
                  <input
                    type="text"
                    id="street"
                    name="street"
                    className={`${inputBase} ${borderColor(
                      validationErrors.street
                    )}`}
                    value={shippingAddress.street}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        setShippingAddress,
                        "shippingAddress"
                      )
                    }
                    onBlur={handleBlur}
                    placeholder="123 Main St"
                  />
                </div>
                {validationErrors.street && (
                  <div className="text-red-500 text-xs mt-1">
                    {validationErrors.street}
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
                    value={shippingAddress.city}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        setShippingAddress,
                        "shippingAddress"
                      )
                    }
                    onBlur={handleBlur}
                    placeholder="Nairobi"
                  />
                </div>
                {validationErrors.city && (
                  <div className="text-red-500 text-xs mt-1">
                    {validationErrors.city}
                  </div>
                )}
              </div>

              {/* State */}
              <div>
                <div htmlFor="state" className={labelStyle}>
                  State{requiredMark}
                </div>
                <div className="relative">
                  <Flag className="absolute top-2 left-3 h-4 w-4 text-orange-500" />
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className={`${inputBase} ${borderColor(
                      validationErrors.state
                    )}`}
                    value={shippingAddress.state}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        setShippingAddress,
                        "shippingAddress"
                      )
                    }
                    onBlur={handleBlur}
                    placeholder="Central"
                  />
                </div>
                {validationErrors.state && (
                  <div className="text-red-500 text-xs mt-1">
                    {validationErrors.state}
                  </div>
                )}
              </div>

              {/* ZIP Code */}
              <div>
                <div htmlFor="zip" className={labelStyle}>
                  ZIP Code{requiredMark}
                </div>
                <div className="relative">
                  <PackageCheck className="absolute top-2 left-3 h-4 w-4 text-red-400" />
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    className={`${inputBase} ${borderColor(
                      validationErrors.zip
                    )}`}
                    value={shippingAddress.zip}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        setShippingAddress,
                        "shippingAddress"
                      )
                    }
                    onBlur={handleBlur}
                    placeholder="00100"
                  />
                </div>
                {validationErrors.zip && (
                  <div className="text-red-500 text-xs mt-1">
                    {validationErrors.zip}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShippingAddress;
