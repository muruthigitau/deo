const Offer = () => {
  return (
    <section className="w-full py-16 px-4 md:px-8 lg:px-12">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h4 className="text-lg md:text-xl font-semibold text-emerald-600 uppercase tracking-widest">
          Special Offer - 10% Off
        </h4>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white">
          Exclusive Deals on Alum Deodorant
        </h2>
      </div>

      {/* Offer Description */}
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Get <span className="font-bold text-emerald-500">10% off</span> on our
          premium Alum Deodorant! Stay fresh all day with{" "}
          <span className="font-medium">natural odor protection</span>—gentle on
          skin, tough on sweat.{" "}
          <span className="font-semibold text-rose-500">Hurry</span>, offer
          valid for a limited time!
        </p>
      </div>
    </section>
  );
};

export default Offer;
