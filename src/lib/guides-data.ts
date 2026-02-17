export interface StyleGuide {
  slug: string;
  title: string;
  category: string;
  description: string;
  readTime: string;
  date: string;
  tag: string;
  emoji: string;
  affiliateProducts?: AffiliateProduct[];
}

export interface AffiliateProduct {
  name: string;
  brand: string;
  price: string;
  url: string;
  tag?: string;
}

export const categories = [
  { slug: 'all', name: 'All Styles', icon: '✨' },
  { slug: 'workwear', name: 'Workwear', icon: '👔' },
  { slug: 'casual', name: 'Casual Chic', icon: '👗' },
  { slug: 'date-night', name: 'Date Night', icon: '💃' },
  { slug: 'seasonal', name: 'Seasonal', icon: '🌸' },
  { slug: 'body-type', name: 'Body Types', icon: '💖' },
  { slug: 'budget', name: 'On a Budget', icon: '💰' },
  { slug: 'occasion', name: 'Occasions', icon: '🎉' },
];

export const guides: StyleGuide[] = [
  {
    slug: 'capsule-wardrobe-working-women-2026',
    title: 'The Ultimate Capsule Wardrobe Guide for Working Women 2026',
    category: 'workwear',
    description: 'Build a 30-piece wardrobe that creates 100+ outfits. From boardroom to brunch, this minimalist guide saves you time, money, and closet space.',
    readTime: '14 min',
    date: '2026-02-17',
    tag: 'Pillar Guide',
    emoji: '👔',
    affiliateProducts: [
      { name: 'Tailored Blazer', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg', tag: 'Editor Pick' },
      { name: 'High-Rise Wide Leg Pants', brand: 'Amazon', price: '$38', url: 'https://amzn.to/3ZCaw4S' },
      { name: 'Silk Camisole', brand: 'Amazon', price: '$25', url: 'https://amzn.to/3Mro3JB' },
      { name: 'Classic Pumps', brand: 'Amazon', price: '$45', url: 'https://amzn.to/3OhrhzW' },
    ],
  },
  {
    slug: 'casual-outfits-look-expensive',
    title: '15 Effortless Casual Outfits That Look Expensive on a Budget',
    category: 'casual',
    description: 'You don\'t need designer labels to look put-together. These 15 outfit formulas use affordable basics to create an elevated everyday look.',
    readTime: '10 min',
    date: '2026-02-15',
    tag: 'Trending',
    emoji: '👗',
    affiliateProducts: [
      { name: 'Oversized Linen Shirt', brand: 'Amazon', price: '$28', url: 'https://amzn.to/4rVjOFg', tag: 'Best Value' },
      { name: 'Straight Leg Jeans', brand: 'Amazon', price: '$39', url: 'https://amzn.to/4rfVnSQ' },
      { name: 'White Sneakers', brand: 'Amazon', price: '$45', url: 'https://amzn.to/3Mro7cj' },
    ],
  },
  {
    slug: 'first-date-outfits-every-vibe',
    title: 'What to Wear on a First Date: 20 Outfits for Every Vibe',
    category: 'date-night',
    description: 'Coffee date? Rooftop dinner? Hiking adventure? We\'ve got the perfect outfit for every type of first date, from low-key to dressed up.',
    readTime: '12 min',
    date: '2026-02-14',
    tag: 'Popular',
    emoji: '💃',
    affiliateProducts: [
      { name: 'Satin Midi Dress', brand: 'Amazon', price: '$42', url: 'https://amzn.to/4tH7kT9', tag: 'Date Night Fave' },
      { name: 'Strappy Heels', brand: 'Amazon', price: '$45', url: 'https://amzn.to/3OhrhzW' },
      { name: 'Statement Earrings', brand: 'Amazon', price: '$15', url: 'https://amzn.to/3Mro3JB' },
    ],
  },
  {
    slug: 'dress-for-body-shape-guide',
    title: 'Dressing for Your Body Shape: A Complete Visual Guide',
    category: 'body-type',
    description: 'Pear, apple, hourglass, rectangle, or inverted triangle? Find your body type and discover the cuts, fabrics, and silhouettes that flatter you most.',
    readTime: '16 min',
    date: '2026-02-12',
    tag: 'Evergreen',
    emoji: '💖',
    affiliateProducts: [
      { name: 'Wrap Dress (Hourglass)', brand: 'Amazon', price: '$36', url: 'https://amzn.to/4tH7kT9' },
      { name: 'A-Line Skirt (Pear)', brand: 'Amazon', price: '$28', url: 'https://amzn.to/3ZCaw4S' },
      { name: 'Structured Blazer (Rectangle)', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg' },
    ],
  },
  {
    slug: 'nordstrom-vs-asos-professional-women',
    title: 'Nordstrom vs ASOS: Best Online Shopping for Professional Women',
    category: 'workwear',
    description: 'We compared both retailers on quality, price, sizing, returns, and style range. Here\'s which one is better for building your work wardrobe.',
    readTime: '11 min',
    date: '2026-02-08',
    tag: 'Comparison',
    emoji: '🛍️',
    affiliateProducts: [
      { name: 'Work Blazer', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg', tag: 'Top Pick' },
      { name: 'Work Tote Bag', brand: 'Amazon', price: '$35', url: 'https://amzn.to/4anggFT' },
    ],
  },
  {
    slug: 'what-to-wear-to-wedding-2026',
    title: 'What to Wear to a Wedding in 2026: Guest Outfit Guide',
    category: 'occasion',
    description: 'Black tie, garden party, beach ceremony, or city hall? The complete wedding guest outfit guide with do\'s, don\'ts, and shoppable looks.',
    readTime: '13 min',
    date: '2026-02-06',
    tag: 'Seasonal',
    emoji: '🎉',
    affiliateProducts: [
      { name: 'Wedding Guest Dress', brand: 'Amazon', price: '$42', url: 'https://amzn.to/4tH7kT9', tag: 'Best Seller' },
      { name: 'Elegant Heels', brand: 'Amazon', price: '$45', url: 'https://amzn.to/3OhrhzW' },
    ],
  },
  {
    slug: 'best-jeans-for-women-2026',
    title: 'The 10 Best Jeans for Women in 2026 (Tested & Reviewed)',
    category: 'casual',
    description: 'We tried 40+ pairs across every body type and budget. These are the 10 that actually deliver on fit, comfort, and style.',
    readTime: '15 min',
    date: '2026-02-04',
    tag: 'Product Review',
    emoji: '👖',
    affiliateProducts: [
      { name: 'Straight Leg Jeans', brand: 'Amazon', price: '$39', url: 'https://amzn.to/4rfVnSQ', tag: 'Best Overall' },
      { name: 'Wide Leg Pants', brand: 'Amazon', price: '$38', url: 'https://amzn.to/3ZCaw4S', tag: 'Best Comfort' },
    ],
  },
  {
    slug: 'spring-workwear-capsule-2026',
    title: 'Spring 2026 Workwear Capsule: 15 Pieces, 30 Outfits',
    category: 'workwear',
    description: 'Build a complete spring work wardrobe with just 15 versatile pieces.',
    readTime: '12 min',
    date: '2026-03-01',
    tag: 'New',
    emoji: '🌸',
    affiliateProducts: [
      { name: 'Linen Blazer', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg', tag: 'Editor Pick' },
      { name: 'Wide Leg Pants', brand: 'Amazon', price: '$38', url: 'https://amzn.to/3ZCaw4S' },
      { name: 'Silk Blouse', brand: 'Amazon', price: '$25', url: 'https://amzn.to/3Mro3JB' },
    ],
  },
  {
    slug: 'work-outfits-that-mean-business',
    title: '10 Work Outfits That Mean Business: Office Style Guide 2026',
    category: 'workwear',
    description: 'From power blazers to smart casual Friday — 10 effortlessly chic work outfits for the modern professional woman.',
    readTime: '14 min',
    date: '2026-02-17',
    tag: 'New',
    emoji: '💼',
    affiliateProducts: [
      { name: 'Oversized Wool Blazer', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg', tag: 'Editor Pick' },
      { name: 'High-Waisted Trousers', brand: 'Amazon', price: '$38', url: 'https://amzn.to/3ZCaw4S', tag: 'Best Value' },
      { name: 'Silk Button-Down Shirt', brand: 'Amazon', price: '$25', url: 'https://amzn.to/3Mro3JB' },
      { name: 'Pointed Toe Pumps', brand: 'Amazon', price: '$45', url: 'https://amzn.to/3OhrhzW' },
    ],
  },
  {
    slug: 'what-to-wear-date-night',
    title: 'What to Wear on a Date Night: 7 Stunning Looks for Every Occasion',
    category: 'date-night',
    description: 'From fancy dinner to casual coffee — 7 gorgeous date night outfits that will make you feel confident and beautiful.',
    readTime: '11 min',
    date: '2026-02-17',
    tag: 'Trending',
    emoji: '💕',
    affiliateProducts: [
      { name: 'Satin Midi Dress', brand: 'Amazon', price: '$42', url: 'https://amzn.to/4tH7kT9', tag: 'Editor Pick' },
      { name: 'Strappy Heeled Sandals', brand: 'Amazon', price: '$45', url: 'https://amzn.to/3OhrhzW' },
      { name: 'Statement Earrings', brand: 'Amazon', price: '$15', url: 'https://amzn.to/3Mro3JB', tag: 'Budget Pick' },
      { name: 'Clutch Bag', brand: 'Amazon', price: '$22', url: 'https://amzn.to/4anggFT' },
    ],
  },
  {
    slug: 'best-jeans-every-body-type',
    title: 'Best Jeans for Every Body Type 2026: The Ultimate Denim Guide',
    category: 'casual',
    description: 'Find your perfect pair — the best jeans for pear, apple, hourglass, athletic, and petite body types.',
    readTime: '15 min',
    date: '2026-02-17',
    tag: 'Popular',
    emoji: '👖',
    affiliateProducts: [
      { name: 'Straight Leg Jeans', brand: 'Amazon', price: '$39', url: 'https://amzn.to/4rfVnSQ', tag: 'Best Overall' },
      { name: 'Wide Leg Pants', brand: 'Amazon', price: '$38', url: 'https://amzn.to/3ZCaw4S', tag: 'Best for Curves' },
      { name: 'White Sneakers', brand: 'Amazon', price: '$45', url: 'https://amzn.to/3Mro7cj', tag: 'Best Pairing' },
    ],
  },
  {
    slug: 'spring-fashion-trends-2026',
    title: 'Spring Fashion Trends 2026: What to Wear This Season',
    category: 'seasonal',
    description: 'The biggest spring 2026 fashion trends and how to style them — from soft pastels to bold statement pieces.',
    readTime: '13 min',
    date: '2026-02-17',
    tag: 'Hot',
    emoji: '🌷',
    affiliateProducts: [
      { name: 'Linen Blend Blazer', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg', tag: 'Trend Pick' },
      { name: 'Satin Midi Dress', brand: 'Amazon', price: '$42', url: 'https://amzn.to/4tH7kT9' },
      { name: 'Woven Tote Bag', brand: 'Amazon', price: '$35', url: 'https://amzn.to/4anggFT', tag: 'Must Have' },
      { name: 'White Sneakers', brand: 'Amazon', price: '$45', url: 'https://amzn.to/3Mro7cj' },
    ],
  },
  {
    slug: 'best-work-bags-under-100',
    title: 'The 10 Best Work Bags for Women Under $100 in 2026',
    category: 'workwear',
    description: 'Professional totes, structured satchels, and laptop-friendly bags that look expensive but won\'t break the bank.',
    readTime: '12 min',
    date: '2026-02-18',
    tag: 'Product Review',
    emoji: '👜',
    affiliateProducts: [
      { name: 'Professional Tote Bag', brand: 'Amazon', price: '$35', url: 'https://amzn.to/4anggFT', tag: 'Best Overall' },
      { name: 'Structured Blazer', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg', tag: 'Style It With' },
    ],
  },
  {
    slug: 'affordable-fashion-brands-guide',
    title: '12 Affordable Fashion Brands That Look High-End in 2026',
    category: 'budget',
    description: 'From H&M to Quince — these budget-friendly brands deliver quality, style, and sustainability without the designer price tag.',
    readTime: '11 min',
    date: '2026-02-18',
    tag: 'Budget',
    emoji: '💰',
    affiliateProducts: [
      { name: 'Silk Camisole', brand: 'Amazon', price: '$25', url: 'https://amzn.to/3Mro3JB', tag: 'Best Quality' },
      { name: 'Straight Leg Jeans', brand: 'Amazon', price: '$39', url: 'https://amzn.to/4rfVnSQ' },
      { name: 'Tailored Blazer', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg', tag: 'Editor Pick' },
    ],
  },
  {
    slug: 'how-to-build-minimalist-wardrobe',
    title: 'How to Build a Minimalist Wardrobe: Step-by-Step Guide',
    category: 'casual',
    description: 'Declutter your closet and build a wardrobe that sparks joy. A practical guide to owning less but looking better every day.',
    readTime: '13 min',
    date: '2026-02-18',
    tag: 'Guide',
    emoji: '🪄',
    affiliateProducts: [
      { name: 'Classic White Camisole', brand: 'Amazon', price: '$25', url: 'https://amzn.to/3Mro3JB', tag: 'Wardrobe Essential' },
      { name: 'Tailored Blazer', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg', tag: 'Worth the Splurge' },
      { name: 'Versatile Wide Leg Pants', brand: 'Amazon', price: '$38', url: 'https://amzn.to/3ZCaw4S' },
    ],
  },
  {
    slug: 'best-white-sneakers-women-2026',
    title: 'The 8 Best White Sneakers for Women in 2026 (Tested & Ranked)',
    category: 'casual',
    description: 'We tested 25+ pairs for comfort, durability, and style. These are the white sneakers that actually stay clean and look great with everything.',
    readTime: '14 min',
    date: '2026-02-18',
    tag: 'Product Review',
    emoji: '👟',
    affiliateProducts: [
      { name: 'White Sneakers', brand: 'Amazon', price: '$45', url: 'https://amzn.to/3Mro7cj', tag: 'Best Overall' },
      { name: 'Straight Leg Jeans', brand: 'Amazon', price: '$39', url: 'https://amzn.to/4rfVnSQ', tag: 'Best Pairing' },
    ],
  },
  {
    slug: 'professional-outfits-women-2026',
    title: 'Professional Outfits for Women: Complete Office Wardrobe Guide',
    category: 'workwear',
    description: 'Whether your office is corporate, business casual, or creative — build a professional wardrobe that commands respect and looks amazing.',
    readTime: '15 min',
    date: '2026-02-18',
    tag: 'Comprehensive',
    emoji: '👩‍💼',
    affiliateProducts: [
      { name: 'Tailored Blazer', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg', tag: 'Investment Piece' },
      { name: 'Wide Leg Trousers', brand: 'Amazon', price: '$38', url: 'https://amzn.to/3ZCaw4S', tag: 'Best Value' },
      { name: 'Silk Blouse', brand: 'Amazon', price: '$25', url: 'https://amzn.to/3Mro3JB' },
      { name: 'Pointed Toe Pumps', brand: 'Amazon', price: '$45', url: 'https://amzn.to/3OhrhzW' },
    ],
  },
  {
    slug: 'stitch-fix-vs-personal-stylist',
    title: 'Stitch Fix vs Hiring a Personal Stylist: Which is Right for You?',
    category: 'budget',
    description: 'We break down the cost, convenience, and styling quality of Stitch Fix versus traditional personal styling services.',
    readTime: '10 min',
    date: '2026-02-18',
    tag: 'Comparison',
    emoji: '🤔',
    affiliateProducts: [
      { name: 'Build Your Own Style Kit', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg', tag: 'DIY Pick' },
      { name: 'Work Tote Bag', brand: 'Amazon', price: '$35', url: 'https://amzn.to/4anggFT' },
    ],
  },
  {
    slug: 'best-affordable-blazers-under-100',
    title: 'Best Affordable Blazers Under $100: 10 Picks for Every Style',
    category: 'budget',
    description: 'A great blazer transforms any outfit. These 10 affordable blazers deliver tailored quality and modern style without the premium price.',
    readTime: '12 min',
    date: '2026-02-18',
    tag: 'Product Review',
    emoji: '🧥',
    affiliateProducts: [
      { name: 'Classic Tailored Blazer', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg', tag: 'Best Overall' },
      { name: 'Wide Leg Pants (Pair With)', brand: 'Amazon', price: '$38', url: 'https://amzn.to/3ZCaw4S' },
      { name: 'Silk Camisole (Layer Under)', brand: 'Amazon', price: '$25', url: 'https://amzn.to/3Mro3JB' },
    ],
  },
  {
    slug: 'what-to-wear-job-interview-2026',
    title: 'What to Wear to a Job Interview in 2026: Dress Code Guide',
    category: 'workwear',
    description: 'First impressions matter. The complete guide to interview outfits for corporate, startup, creative, and remote job interviews.',
    readTime: '11 min',
    date: '2026-02-18',
    tag: 'Essential',
    emoji: '🤝',
    affiliateProducts: [
      { name: 'Navy Tailored Blazer', brand: 'Amazon', price: '$49', url: 'https://amzn.to/4rVjOFg', tag: 'Corporate Pick' },
      { name: 'Slim Dress Pants', brand: 'Amazon', price: '$38', url: 'https://amzn.to/3ZCaw4S' },
      { name: 'Pointed Toe Pumps', brand: 'Amazon', price: '$45', url: 'https://amzn.to/3OhrhzW', tag: 'Comfort Pick' },
      { name: 'Structured Handbag', brand: 'Amazon', price: '$35', url: 'https://amzn.to/4anggFT' },
    ],
  },
  {
    slug: 'spring-2026-must-have-items',
    title: '10 Must-Have Fashion Items for Spring 2026: Runway to Real Life',
    category: 'seasonal',
    description: 'From leather jackets to vanilla yellow tops — the 10 hottest spring 2026 trend items straight from the runway, all shoppable on Amazon.',
    readTime: '14 min',
    date: '2026-02-18',
    tag: 'Hot',
    emoji: '🔥',
    affiliateProducts: [
      { name: 'Leather Jacket', brand: 'Amazon', price: '$59', url: 'https://amzn.to/4az8Vlh', tag: '#1 Must Have' },
      { name: 'Cigarette Jeans', brand: 'Amazon', price: '$42', url: 'https://amzn.to/4kJhrTx', tag: 'Trending' },
      { name: 'Large Tote Bag', brand: 'Amazon', price: '$36', url: 'https://amzn.to/4qBF7dJ' },
      { name: 'Oversized Trench Coat', brand: 'Amazon', price: '$68', url: 'https://amzn.to/4kNVNxy', tag: 'Investment Piece' },
      { name: 'Vanilla Yellow Blouse', brand: 'Amazon', price: '$28', url: 'https://amzn.to/4rUPDhk', tag: 'IT Color 2026' },
    ],
  },
  {
    slug: 'trending-spring-accessories-2026',
    title: 'Spring 2026 Accessories: Bags, Shoes & Jewelry Trends',
    category: 'seasonal',
    description: 'Complete your spring look with these trending accessories — from oversized sunglasses to almond toe heels, all under $70.',
    readTime: '12 min',
    date: '2026-02-18',
    tag: 'Trending',
    emoji: '👛',
    affiliateProducts: [
      { name: 'Lace Midi Skirt', brand: 'Amazon', price: '$32', url: 'https://amzn.to/3OrVpsf', tag: 'Romantic Trend' },
      { name: 'Quarter Zip Knit', brand: 'Amazon', price: '$35', url: 'https://amzn.to/40drBCf', tag: 'Runway Pick' },
      { name: 'Floral Midi Dress', brand: 'Amazon', price: '$38', url: 'https://amzn.to/4rfX7eQ', tag: 'Spring Essential' },
      { name: 'Oversized Sunglasses', brand: 'Amazon', price: '$18', url: 'https://amzn.to/4tEIRhl', tag: 'Statement Piece' },
      { name: 'Almond Toe Heels', brand: 'Amazon', price: '$45', url: 'https://amzn.to/4tEJV4X', tag: 'Elegant Pick' },
    ],
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find(g => g.slug === slug);
}

export function getGuidesByCategory(category: string) {
  if (category === 'all') return guides;
  return guides.filter(g => g.category === category);
}
