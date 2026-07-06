export type SeedProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  priceCents: number;
  calories: number;
  proteinGrams: number;
  servingSize: string;
};

export const products: SeedProduct[] = [
  {
    id: "grilled-chicken-breast",
    name: "Grilled Chicken Breast",
    category: "Proteins & Meat",
    description:
      "Juicy, herb-marinated chicken breast that's naturally low-calorie and packed with lean muscle-building protein.",
    priceCents: 799,
    calories: 165,
    proteinGrams: 31,
    servingSize: "100g",
  },
  {
    id: "lean-ground-turkey",
    name: "Lean Ground Turkey (93/7)",
    category: "Proteins & Meat",
    description:
      "Versatile 93% lean ground turkey that keeps saturated fat low while delivering a solid protein punch to any meal.",
    priceCents: 649,
    calories: 170,
    proteinGrams: 22,
    servingSize: "4oz",
  },
  {
    id: "wild-salmon-fillet",
    name: "Wild-Caught Salmon Fillet",
    category: "Proteins & Meat",
    description:
      "Rich, flaky wild salmon loaded with omega-3s and high-quality protein for a satisfying, heart-healthy dinner.",
    priceCents: 1299,
    calories: 350,
    proteinGrams: 34,
    servingSize: "6oz",
  },
  {
    id: "grass-fed-beef-sirloin",
    name: "Grass-Fed Beef Sirloin Steak",
    category: "Proteins & Meat",
    description:
      "Tender grass-fed sirloin that packs an impressive 42g of protein per serving to fuel serious workouts.",
    priceCents: 1499,
    calories: 320,
    proteinGrams: 42,
    servingSize: "6oz",
  },
  {
    id: "herb-crusted-pork-tenderloin",
    name: "Herb-Crusted Pork Tenderloin",
    category: "Proteins & Meat",
    description:
      "A lean cut of pork tenderloin with a fragrant herb crust, offering big flavor without the extra fat.",
    priceCents: 899,
    calories: 140,
    proteinGrams: 24,
    servingSize: "4oz",
  },
  {
    id: "turkey-bacon",
    name: "Turkey Bacon",
    category: "Proteins & Meat",
    description:
      "Crispy turkey bacon that satisfies the craving with a fraction of the calories and fat of traditional bacon.",
    priceCents: 549,
    calories: 60,
    proteinGrams: 6,
    servingSize: "2 slices",
  },
  {
    id: "plain-greek-yogurt",
    name: "Plain Greek Yogurt",
    category: "Dairy & Eggs",
    description:
      "Thick, creamy strained yogurt with double the protein of regular yogurt and a tangy, satisfying bite.",
    priceCents: 549,
    calories: 150,
    proteinGrams: 20,
    servingSize: "1 cup",
  },
  {
    id: "low-fat-cottage-cheese",
    name: "Low-Fat Cottage Cheese",
    category: "Dairy & Eggs",
    description:
      "Creamy, curd-rich cottage cheese that's a slow-digesting protein powerhouse perfect for staying full longer.",
    priceCents: 449,
    calories: 180,
    proteinGrams: 25,
    servingSize: "1 cup",
  },
  {
    id: "cage-free-eggs",
    name: "Cage-Free Large Eggs",
    category: "Dairy & Eggs",
    description:
      "Farm-fresh cage-free eggs offering complete, high-quality protein in a naturally low-calorie package.",
    priceCents: 499,
    calories: 70,
    proteinGrams: 6,
    servingSize: "1 egg",
  },
  {
    id: "liquid-egg-whites",
    name: "Liquid Egg Whites",
    category: "Dairy & Eggs",
    description:
      "Pure egg whites with all the protein and none of the yolk fat, ready to pour straight into the pan.",
    priceCents: 399,
    calories: 50,
    proteinGrams: 10,
    servingSize: "1/2 cup",
  },
  {
    id: "part-skim-string-cheese",
    name: "Part-Skim Mozzarella String Cheese",
    category: "Dairy & Eggs",
    description:
      "A fun, portable snack made from part-skim mozzarella that delivers protein and calcium in every peel-able stick.",
    priceCents: 399,
    calories: 70,
    proteinGrams: 7,
    servingSize: "1 stick",
  },
  {
    id: "icelandic-skyr",
    name: "Icelandic Skyr Yogurt",
    category: "Dairy & Eggs",
    description:
      "Ultra-thick Icelandic-style skyr with a protein content that rivals a protein shake in a spoonable, low-cal form.",
    priceCents: 599,
    calories: 120,
    proteinGrams: 19,
    servingSize: "1 cup",
  },
  {
    id: "organic-firm-tofu",
    name: "Organic Firm Tofu",
    category: "Plant-Based Protein",
    description:
      "Firm, versatile organic tofu that soaks up any marinade while delivering plant-based protein with minimal calories.",
    priceCents: 349,
    calories: 90,
    proteinGrams: 10,
    servingSize: "100g",
  },
  {
    id: "fermented-soy-tempeh",
    name: "Fermented Soy Tempeh",
    category: "Plant-Based Protein",
    description:
      "Nutty, firm-textured tempeh that's naturally fermented and one of the highest-protein plant foods around.",
    priceCents: 449,
    calories: 190,
    proteinGrams: 20,
    servingSize: "100g",
  },
  {
    id: "dried-green-lentils",
    name: "Dried Green Lentils",
    category: "Plant-Based Protein",
    description:
      "Earthy green lentils that cook up tender and deliver a hearty dose of fiber-packed plant protein.",
    priceCents: 299,
    calories: 170,
    proteinGrams: 12,
    servingSize: "1/4 cup dry",
  },
  {
    id: "shelled-edamame",
    name: "Shelled Edamame",
    category: "Plant-Based Protein",
    description:
      "Sweet, tender shelled edamame beans that make a quick-steaming, high-protein addition to any bowl.",
    priceCents: 399,
    calories: 190,
    proteinGrams: 17,
    servingSize: "1 cup",
  },
  {
    id: "organic-canned-chickpeas",
    name: "Organic Canned Chickpeas",
    category: "Plant-Based Protein",
    description:
      "Buttery, ready-to-eat chickpeas that bring plant protein and fiber to salads, stews, and homemade hummus.",
    priceCents: 249,
    calories: 120,
    proteinGrams: 7,
    servingSize: "1/2 cup",
  },
  {
    id: "chocolate-peanut-protein-bar",
    name: "Chocolate Peanut Butter Protein Bar",
    category: "Snacks & Bars",
    description:
      "A rich chocolate and peanut butter bar engineered to curb cravings with 20g of protein and controlled calories.",
    priceCents: 299,
    calories: 220,
    proteinGrams: 20,
    servingSize: "1 bar",
  },
  {
    id: "original-beef-jerky",
    name: "Original Beef Jerky",
    category: "Snacks & Bars",
    description:
      "Slow-smoked, lean beef jerky that's a chewy, shelf-stable way to get lots of protein for very few calories.",
    priceCents: 599,
    calories: 80,
    proteinGrams: 9,
    servingSize: "1oz",
  },
  {
    id: "dry-roasted-almonds",
    name: "Dry-Roasted Almonds",
    category: "Snacks & Bars",
    description:
      "Crunchy dry-roasted almonds with heart-healthy fats and a satisfying protein boost in every handful.",
    priceCents: 549,
    calories: 160,
    proteinGrams: 6,
    servingSize: "1oz (23 almonds)",
  },
  {
    id: "chocolate-chip-protein-cookie",
    name: "Chocolate Chip Protein Cookie",
    category: "Snacks & Bars",
    description:
      "A soft-baked chocolate chip cookie reworked to deliver 16g of protein without sacrificing the classic taste.",
    priceCents: 349,
    calories: 220,
    proteinGrams: 16,
    servingSize: "1 cookie",
  },
  {
    id: "organic-baby-spinach",
    name: "Organic Baby Spinach",
    category: "Produce",
    description:
      "Tender organic baby spinach leaves that add volume, vitamins, and almost zero calories to any dish.",
    priceCents: 349,
    calories: 14,
    proteinGrams: 2,
    servingSize: "2 cups",
  },
  {
    id: "fresh-broccoli-crowns",
    name: "Fresh Broccoli Crowns",
    category: "Produce",
    description:
      "Crisp, fiber-rich broccoli crowns that roast or steam into a low-calorie side loaded with vitamin C.",
    priceCents: 299,
    calories: 31,
    proteinGrams: 3,
    servingSize: "1 cup",
  },
  {
    id: "fresh-blueberries",
    name: "Fresh Blueberries",
    category: "Produce",
    description:
      "Sweet, antioxidant-rich blueberries that make a naturally low-calorie topping for yogurt or oats.",
    priceCents: 449,
    calories: 84,
    proteinGrams: 1,
    servingSize: "1 cup",
  },
  {
    id: "hass-avocado",
    name: "Hass Avocado",
    category: "Produce",
    description:
      "Creamy Hass avocado bringing satisfying heart-healthy fats to toast, salads, or smoothies.",
    priceCents: 199,
    calories: 240,
    proteinGrams: 3,
    servingSize: "1 whole",
  },
  {
    id: "organic-sweet-potato",
    name: "Organic Sweet Potato",
    category: "Produce",
    description:
      "A naturally sweet, fiber-packed sweet potato that makes a nutrient-dense, low-calorie carb choice.",
    priceCents: 199,
    calories: 112,
    proteinGrams: 2,
    servingSize: "1 medium",
  },
  {
    id: "tricolor-bell-peppers",
    name: "Tri-Color Bell Peppers",
    category: "Produce",
    description:
      "Crunchy, vitamin C-loaded bell peppers in red, yellow, and orange that snack deliciously at almost no calorie cost.",
    priceCents: 399,
    calories: 25,
    proteinGrams: 1,
    servingSize: "1 medium pepper",
  },
  {
    id: "organic-quinoa",
    name: "Organic Quinoa",
    category: "Pantry & Grains",
    description:
      "A fluffy, complete-protein grain alternative that brings more protein to the plate than most other grains.",
    priceCents: 599,
    calories: 170,
    proteinGrams: 6,
    servingSize: "1/4 cup dry",
  },
  {
    id: "old-fashioned-rolled-oats",
    name: "Old-Fashioned Rolled Oats",
    category: "Pantry & Grains",
    description:
      "Hearty whole-grain rolled oats that cook up into a filling, fiber-rich breakfast with a steady protein base.",
    priceCents: 399,
    calories: 150,
    proteinGrams: 5,
    servingSize: "1/2 cup dry",
  },
  {
    id: "whole-grain-brown-rice",
    name: "Whole Grain Brown Rice",
    category: "Pantry & Grains",
    description:
      "A wholesome whole-grain rice that anchors any high-protein meal with steady, fiber-filled energy.",
    priceCents: 349,
    calories: 170,
    proteinGrams: 4,
    servingSize: "1/4 cup dry",
  },
  {
    id: "natural-peanut-butter",
    name: "Natural Peanut Butter",
    category: "Pantry & Grains",
    description:
      "Simple, no-added-sugar peanut butter that spreads on protein and healthy fats in every creamy spoonful.",
    priceCents: 549,
    calories: 190,
    proteinGrams: 8,
    servingSize: "2 tbsp",
  },
  {
    id: "organic-black-beans",
    name: "Organic Black Beans (Canned)",
    category: "Pantry & Grains",
    description:
      "Ready-to-eat organic black beans delivering plant protein and fiber for a filling, low-calorie pantry staple.",
    priceCents: 249,
    calories: 110,
    proteinGrams: 7,
    servingSize: "1/2 cup",
  },
  {
    id: "ready-to-drink-protein-shake",
    name: "Chocolate Ready-to-Drink Protein Shake",
    category: "Beverages",
    description:
      "A grab-and-go chocolate shake delivering 30g of protein in a low-calorie bottle for busy mornings.",
    priceCents: 349,
    calories: 160,
    proteinGrams: 30,
    servingSize: "11oz bottle",
  },
  {
    id: "ginger-kombucha",
    name: "Ginger Kombucha",
    category: "Beverages",
    description:
      "Effervescent, gut-friendly ginger kombucha that satisfies a soda craving with a fraction of the sugar and calories.",
    priceCents: 399,
    calories: 60,
    proteinGrams: 0,
    servingSize: "16oz bottle",
  },
  {
    id: "whey-protein-powder-vanilla",
    name: "Whey Protein Powder - Vanilla",
    category: "Vitamins & Supplements",
    description:
      "Smooth vanilla whey isolate that mixes easily into a fast-absorbing 24g protein boost after any workout.",
    priceCents: 2999,
    calories: 120,
    proteinGrams: 24,
    servingSize: "1 scoop",
  },
  {
    id: "plant-protein-powder-chocolate",
    name: "Plant-Based Protein Powder - Chocolate",
    category: "Vitamins & Supplements",
    description:
      "A rich chocolate pea-and-rice protein blend that gives dairy-free eaters a complete, high-protein shake option.",
    priceCents: 2799,
    calories: 130,
    proteinGrams: 21,
    servingSize: "1 scoop",
  },
  {
    id: "daily-multivitamin",
    name: "Daily Multivitamin",
    category: "Vitamins & Supplements",
    description:
      "A whole-food-based multivitamin covering essential vitamins and minerals to fill the gaps in a busy day.",
    priceCents: 1899,
    calories: 5,
    proteinGrams: 0,
    servingSize: "2 capsules",
  },
  {
    id: "vitamin-d3-5000iu",
    name: "Vitamin D3 5000 IU",
    category: "Vitamins & Supplements",
    description:
      "High-potency vitamin D3 softgels supporting bone, immune, and mood health, especially for indoor lifestyles.",
    priceCents: 1299,
    calories: 5,
    proteinGrams: 0,
    servingSize: "1 softgel",
  },
  {
    id: "omega-3-fish-oil",
    name: "Omega-3 Fish Oil",
    category: "Vitamins & Supplements",
    description:
      "Molecularly distilled fish oil delivering EPA and DHA for heart, joint, and brain support in an easy softgel.",
    priceCents: 1699,
    calories: 10,
    proteinGrams: 0,
    servingSize: "2 softgels",
  },
  {
    id: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    category: "Vitamins & Supplements",
    description:
      "A gentle, highly-absorbable form of magnesium that supports relaxation, sleep quality, and muscle recovery.",
    priceCents: 1599,
    calories: 0,
    proteinGrams: 0,
    servingSize: "2 capsules",
  },
  {
    id: "probiotic-50-billion",
    name: "Probiotic 50 Billion CFU",
    category: "Vitamins & Supplements",
    description:
      "A multi-strain, shelf-stable probiotic blend formulated to support gut health and everyday digestion.",
    priceCents: 2499,
    calories: 0,
    proteinGrams: 0,
    servingSize: "1 capsule",
  },
  {
    id: "creatine-monohydrate",
    name: "Creatine Monohydrate",
    category: "Vitamins & Supplements",
    description:
      "Pure micronized creatine monohydrate, the most-studied supplement for building strength and lean muscle.",
    priceCents: 2199,
    calories: 0,
    proteinGrams: 0,
    servingSize: "1 scoop (5g)",
  },
  {
    id: "collagen-peptides",
    name: "Unflavored Collagen Peptides",
    category: "Vitamins & Supplements",
    description:
      "Grass-fed, easily-dissolving collagen peptides that stir into coffee or shakes to support skin, hair, and joints.",
    priceCents: 2699,
    calories: 35,
    proteinGrams: 9,
    servingSize: "1 scoop",
  },
  {
    id: "vitamin-b12-methylcobalamin",
    name: "Vitamin B12 (Methylcobalamin)",
    category: "Vitamins & Supplements",
    description:
      "Fast-dissolving B12 lozenges supporting steady, natural energy and nervous system health.",
    priceCents: 1399,
    calories: 5,
    proteinGrams: 0,
    servingSize: "1 lozenge",
  },
  {
    id: "organic-spirulina-powder",
    name: "Organic Spirulina Powder",
    category: "Superfoods & Powders",
    description:
      "Deep-green blue-algae powder packed with plant protein, iron, and antioxidants for smoothies and shakes.",
    priceCents: 1999,
    calories: 20,
    proteinGrams: 4,
    servingSize: "1 tbsp",
  },
  {
    id: "ceremonial-matcha-powder",
    name: "Ceremonial-Grade Matcha Powder",
    category: "Superfoods & Powders",
    description:
      "Vibrant, stone-ground green tea powder delivering smooth, jitter-free energy and a dose of antioxidants.",
    priceCents: 2299,
    calories: 5,
    proteinGrams: 1,
    servingSize: "1 tsp",
  },
  {
    id: "organic-chia-seeds",
    name: "Organic Chia Seeds",
    category: "Superfoods & Powders",
    description:
      "Tiny, gel-forming seeds loaded with fiber, omega-3s, and plant protein — stir into oats, yogurt, or puddings.",
    priceCents: 799,
    calories: 138,
    proteinGrams: 5,
    servingSize: "2 tbsp",
  },
  {
    id: "hulled-hemp-hearts",
    name: "Hulled Hemp Hearts",
    category: "Superfoods & Powders",
    description:
      "Nutty, soft hemp seeds that pack more protein per spoonful than most nuts, with zero prep required.",
    priceCents: 999,
    calories: 170,
    proteinGrams: 10,
    servingSize: "3 tbsp",
  },
  {
    id: "raw-maca-root-powder",
    name: "Raw Maca Root Powder",
    category: "Superfoods & Powders",
    description:
      "Earthy, malty Peruvian maca powder traditionally used to support energy, stamina, and hormonal balance.",
    priceCents: 1499,
    calories: 30,
    proteinGrams: 1,
    servingSize: "1 tbsp",
  },
  {
    id: "organic-cacao-nibs",
    name: "Organic Cacao Nibs",
    category: "Superfoods & Powders",
    description:
      "Crunchy, minimally-processed cacao nibs with a rich chocolate flavor and none of the added sugar.",
    priceCents: 899,
    calories: 90,
    proteinGrams: 3,
    servingSize: "2 tbsp",
  },
  {
    id: "daily-greens-powder",
    name: "Daily Greens Superfood Powder",
    category: "Superfoods & Powders",
    description:
      "A blend of spinach, kale, and wheatgrass concentrated into one scoop for an easy daily greens boost.",
    priceCents: 3299,
    calories: 25,
    proteinGrams: 2,
    servingSize: "1 scoop",
  },
  {
    id: "golden-flax-seed-meal",
    name: "Golden Flax Seed Meal",
    category: "Superfoods & Powders",
    description:
      "Finely-ground golden flaxseed that blends invisibly into smoothies and baking while adding fiber and omega-3s.",
    priceCents: 649,
    calories: 60,
    proteinGrams: 2,
    servingSize: "2 tbsp",
  },
];
