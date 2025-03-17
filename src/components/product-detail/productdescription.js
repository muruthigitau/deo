import React from "react";

const ProductDescription = () => {
  const description =
    "Alum Deodorant is a 100% natural solution to body odor, made from pure potassium alum. Fragrance-free and gentle, it combats bacteria without clogging pores, offering all-day protection for even the most sensitive skin types.";
  const ingredients = [
    "100% Natural Potassium Alum",
    "No Alcohol, No Parabens, No Fragrances",
  ];
  const benefits = [
    "Eliminates odor-causing bacteria naturally",
    "Safe for sensitive skin with no irritants",
    "Non-staining, leaves no residue on clothes",
    "Each stone lasts up to a year – eco-friendly & cost-effective",
  ];
  const usage =
    "Moisten the stone and gently apply to clean underarms or feet. Best used immediately after showering while skin is damp.";
  const sustainability =
    "Eco-conscious choice: Long-lasting stone means less waste. Recyclable packaging aligns with our mission to reduce environmental impact.";

  return (
    <section className="py-14 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Product Overview */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-green-700 mb-5 tracking-wide drop-shadow">
            Pure Protection, Naturally
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-green-400 hover:shadow-lg transition duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center">
              <i className="ri-leaf-line text-green-500 mr-3 text-2xl"></i>
              Ingredients
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Usage */}
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-yellow-400 hover:shadow-lg transition duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center">
              <i className="ri-hand-heart-line text-yellow-500 mr-3 text-2xl"></i>
              Usage
            </h3>
            <p className="text-gray-700 leading-relaxed">{usage}</p>
          </div>

          {/* Benefits */}
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-teal-400 md:col-span-2 hover:shadow-lg transition duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-teal-700 mb-4 flex items-center">
              <i className="ri-star-smile-line text-teal-500 mr-3 text-2xl"></i>
              Key Benefits
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {benefits.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Sustainability */}
          <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-red-400 md:col-span-2 hover:shadow-lg transition duration-300 ease-in-out">
            <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
              <i className="ri-earth-line text-red-500 mr-3 text-2xl"></i>
              Sustainability
            </h3>
            <p className="text-gray-700 leading-relaxed">{sustainability}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDescription;
