import Head from "next/head";

function SEO() {
  return (
    <Head>
      {/* Basic SEO */}
      <title>
        African Magic Deo - 100% Natural Alum Deodorant | Eco-Friendly and Safe
      </title>
      <meta
        name="description"
        content="African Magic Deo offers a 100% natural alum deodorant, free from alcohol and parabens. Long-lasting protection, non-staining, and safe for sensitive skin."
      />
      <meta
        name="keywords"
        content="alum deodorant, natural deodorant, potassium alum, eco-friendly deodorant, fragrance-free deodorant, body odor solution"
      />
      <meta name="author" content="African Magic Deo" />
      <meta name="robots" content="index, follow" />

      {/* Open Graph Meta Tags for Social Media */}
      <meta
        property="og:title"
        content="African Magic Deo - 100% Natural Alum Deodorant"
      />
      <meta
        property="og:description"
        content="Pure protection, naturally. Long-lasting, eco-friendly alum deodorant that eliminates body odor without harmful chemicals."
      />
      <meta
        property="og:image"
        content="https://africanmagicdeo.com/product.jpeg"
      />
      <meta property="og:url" content="https://africanmagicdeo.com/product" />
      <meta property="og:type" content="product" />
      <meta property="og:site_name" content="African Magic Deo" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="African Magic Deo - 100% Natural Alum Deodorant"
      />
      <meta
        name="twitter:description"
        content="Fragrance-free, safe for sensitive skin, and eco-friendly. Discover the power of potassium alum deodorant."
      />
      <meta
        name="twitter:image"
        content="https://africanmagicdeo.com/product.jpeg"
      />

      {/* Canonical URL */}
      <link rel="canonical" href="https://africanmagicdeo.com/product" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Structured Data (JSON-LD for SEO) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Alum Deodorant",
          image: ["https://africanmagicdeo.com/product.jpeg"],
          description:
            "African Magic Deo Alum Deodorant is a natural, fragrance-free solution to body odor. Made from 100% potassium alum, it provides all-day protection.",
          brand: {
            "@type": "Brand",
            name: "African Magic Deo",
          },
          offers: {
            "@type": "Offer",
            url: "https://africanmagicdeo.com/product",
            priceCurrency: "KES",
            price: "999.00",
            itemCondition: "https://schema.org/NewCondition",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: "African Magic Deo",
            },
          },
        })}
      </script>
    </Head>
  );
}

export default SEO;
