// Central Product Dataset for ThreadCraft
const PRODUCTS = [
  {
    id: "saree-1",
    title: "Shivalya Banarasi Silk Saree",
    category: "sarees",
    price: 8500,
    discountPrice: 7200,
    images: [
      "assets/product-saree-1.png",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Exquisite handspun cotton-silk blend, with delicate zari borders weaved by master craftspeople in Varanasi. Embodying our heritage of hand loom craftsmanship, this saree is both soft and exceptionally regal. Perfect for elegant celebrations, festivals, or family legacies.",
    specs: {
      "Material": "70% Organic Cotton, 30% Mulberry Silk",
      "Weave Style": "Traditional Banarasi Handloom",
      "Length": "5.5 meters (includes 80cm unstitched blouse piece)",
      "Care Instructions": "Dry clean recommended to preserve gold zari finish"
    },
    sizes: ["Standard (Free Size)"],
    featured: true,
    bestSeller: true,
    newArrival: false
  },
  {
    id: "saree-2",
    title: "Aura Khadi Linen Saree",
    category: "sarees",
    price: 4200,
    discountPrice: 3800,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469668-93535c17b6b3?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Lightweight and breathable kora linen saree with modern minimalist solid borders and geometric hand-woven checks on the pallu. Made from pure flax linen grown in organic farms and spun by local weavers using Traditional processes.",
    specs: {
      "Material": "100% Khadi Flax Linen",
      "Weave Style": "Bhagalpur Handspun Weave",
      "Length": "5.5 meters",
      "Care Instructions": "Handwash in cold water with mild detergent"
    },
    sizes: ["Standard (Free Size)"],
    featured: true,
    bestSeller: false,
    newArrival: true
  },
  {
    id: "kurti-1",
    title: "Gulabi Handblock Cotton Kurti",
    category: "kurtis",
    price: 2400,
    discountPrice: 1950,
    images: [
      "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800&auto=format&fit=crop"
    ],
    description: "A-line cotton kurti styled with natural vegetable-dyed floral handblock prints from Bagru, Jaipur. Flattering V-neck with fine wooden button detailing, dual side pockets, and comfortable fit for all-day elegance.",
    specs: {
      "Material": "100% Organic Long-staple Cotton",
      "Dye": "Natural indigo and madder root vegetable dyes",
      "Craft": "Dabu Mud-Resist Block Print",
      "Care Instructions": "Wash separately inside out in cold water"
    },
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    bestSeller: true,
    newArrival: true
  },
  {
    id: "kurti-2",
    title: "Ivory Grace Chikankari Kurti",
    category: "kurtis",
    price: 3600,
    discountPrice: 2900,
    images: [
      "assets/product-kurti-2.png",
      "https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Elegant hand-embroidered Lucknowi Chikankari shadow work on translucent premium cotton georgette fabric. Intricate floral paisleys on the front panels make this an absolute masterpiece of needlework art.",
    specs: {
      "Material": "80% Cotton georgette, 20% Silk threads",
      "Craft": "Lucknowi Hand Chikankari Embroidery",
      "Fit": "Relaxed Straight Kurti",
      "Care Instructions": "Dry clean or handwash with extreme care"
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    bestSeller: false,
    newArrival: false
  },
  {
    id: "shirt-1",
    title: "Classic Sand Linen Shirt",
    category: "shirts",
    price: 2800,
    discountPrice: 2400,
    images: [
      "assets/product-shirt-1.png",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Relaxed fit luxury linen shirt with a classic collar, curved hem, and premium solid coconut shell buttons. Highly breathable, soft-washed to minimize initial linen stiffness, and styled for effortless summer sophistication.",
    specs: {
      "Material": "100% Pure Belgian Linen",
      "Fit": "Relaxed Modern Fit",
      "Buttons": "Natural coconut shell",
      "Care Instructions": "Machine wash cold on gentle, tumble dry low"
    },
    sizes: ["M", "L", "XL", "XXL"],
    featured: true,
    bestSeller: true,
    newArrival: false
  },
  {
    id: "shirt-2",
    title: "Indigo Handblock Cotton Shirt",
    category: "shirts",
    price: 2200,
    discountPrice: 1800,
    images: [
      "assets/product-shirt-2.png",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Mens tailored shirt block printed by hand in indigo dye. Subtle micro motifs create a pleasant texture. Featuring structured collars and double-stitched cuffs.",
    specs: {
      "Material": "100% Long-Staple Indian Cotton",
      "Dye": "Organic fermented Indigo",
      "Fit": "Tailored Slim Fit",
      "Care Instructions": "May bleed slightly on first wash. Wash separately in cold water"
    },
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    bestSeller: false,
    newArrival: true
  },
  {
    id: "kurta-1",
    title: "Desert Gold Khadi Kurta",
    category: "kurtas",
    price: 3200,
    discountPrice: 2700,
    images: [
      "assets/product-kurta-1.png",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Handspun and hand-woven Khadi long kurta with a mandarin collar. Elegant beige and ivory cross-weaving that exudes visual depth, thermal comfort, and understated heritage styling.",
    specs: {
      "Material": "100% Hand-woven Khadi Kurta Cotton",
      "Style": "Semi-formal Mandarin Kurta",
      "Features": "Wooden button placket, dual side slits, side pockets",
      "Care Instructions": "Handwash separately, dry in shade to protect dye"
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    bestSeller: false,
    newArrival: true
  },
  {
    id: "kurta-2",
    title: "Crimson Weave Tussar Silk Kurta",
    category: "kurtas",
    price: 4800,
    discountPrice: 4200,
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
    ],
    description: "Rich madder-crimson kurta crafted in premium Bhagalpuri Tussar silk, featuring a self-check weave texture. Understated elegance with subtle matte-gold cord piping running along the mandarin collar.",
    specs: {
      "Material": "100% Bhagalpuri Wild Tussar Silk",
      "Weave Style": "Matte Cord Check Texture",
      "Style": "Straight knee-length kurta",
      "Care Instructions": "Dry clean only"
    },
    sizes: ["M", "L", "XL"],
    featured: false,
    bestSeller: true,
    newArrival: false
  }
];
