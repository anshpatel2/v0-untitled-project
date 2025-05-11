export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SoleNodes",
    url: "https://solenodes.cloud",
    logo: "https://solenodes.cloud/logo.png",
    description: "Professional Minecraft server hosting with 99.9% uptime guarantee.",
    sameAs: ["https://discord.gg/Gd4FQyuNFC"],
    offers: [
      {
        "@type": "Offer",
        name: "Cobblestone",
        description: "Perfect for small Minecraft servers",
        price: "250.00",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Iron",
        description: "Ideal for medium-sized communities",
        price: "515.00",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Netherite",
        description: "For large Minecraft communities",
        price: "1117.00",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
