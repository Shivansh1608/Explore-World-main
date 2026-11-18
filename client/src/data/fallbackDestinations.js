export const fallbackDestinations = [
  {
    id: "paris",
    _id: "paris",
    name: "Paris",
    city: "Paris",
    state: "Île-de-France",
    country: "France",
    category: ["Historical", "Culture"],
    rating: 4.7,
    price: "₹92,000",
    estimatedBudget: 92000,
    description:
      "Known as the City of Light, Paris is celebrated for world-class art at the Louvre, the iconic Eiffel Tower, charming sidewalk cafes, and romantic strolls along the River Seine. Every corner tells a story spanning centuries of architectural marvels and artistic passion.",
    bestTimeToVisit: ["April", "May", "September", "October"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Admin Explorer",
      role: "admin",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    },
    reviews: [
      {
        _id: "rev-paris-1",
        author: { name: "Sophie Martin", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Sophie" },
        rating: 5,
        comment: "Walking along the Seine at twilight was unforgettable. The museums and cafes are world-class!",
      },
      {
        _id: "rev-paris-2",
        author: { name: "Aarav Sharma", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav" },
        rating: 5,
        comment: "Montmartre during sunrise was peaceful and inspiring. Don't miss the local bakeries!",
      },
    ],
  },
  {
    id: "bali",
    _id: "bali",
    name: "Bali",
    city: "Ubud",
    state: "Bali",
    country: "Indonesia",
    category: ["Beaches", "Culture"],
    rating: 4.9,
    price: "₹42,000",
    estimatedBudget: 42000,
    description:
      "An Indonesian paradise known for its forested volcanic mountains, iconic rice paddies, beaches, coral reefs, and tranquil yoga retreats amidst sacred temples. Experience warm hospitality, vibrant night markets, and surf-ready coastlines.",
    bestTimeToVisit: ["May", "June", "July", "August"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Aarav Sharma",
      role: "user",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav",
    },
    reviews: [
      {
        _id: "rev-bali-1",
        author: { name: "Elena Rostova", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Elena" },
        rating: 5,
        comment: "The Tegallalang rice terraces at dawn were mesmerizing. Food is incredible and very budget friendly.",
      },
    ],
  },
  {
    id: "tokyo",
    _id: "tokyo",
    name: "Tokyo",
    city: "Tokyo",
    state: "Kantō",
    country: "Japan",
    category: ["Culture", "Adventure"],
    rating: 4.8,
    price: "₹84,000",
    estimatedBudget: 84000,
    description:
      "Japan's bustling capital mixes ultramodern neon skyscrapers and pop culture with historic temples. Renowned for culinary mastery, cutting-edge technology, exceptionally clean transit, and vibrant street life.",
    bestTimeToVisit: ["March", "April", "October", "November"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Admin Explorer",
      role: "admin",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    },
    reviews: [
      {
        _id: "rev-tokyo-1",
        author: { name: "Kenji Sato", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Kenji" },
        rating: 5,
        comment: "From Shinjuku alleys to tranquil Asakusa shrines, Tokyo never ceases to amaze.",
      },
    ],
  },
  {
    id: "manali",
    _id: "manali",
    name: "Manali",
    city: "Manali",
    state: "Himachal Pradesh",
    country: "India",
    category: ["Mountains", "Adventure"],
    rating: 4.8,
    price: "₹18,500",
    estimatedBudget: 18500,
    description:
      "Nestled in the Beas River Valley, Manali is a gateway for skiing in Solang Valley and trekking in Parvati Valley. Famous for pine forests, snow-clad mountain passes, and tranquil Himalayan streams.",
    bestTimeToVisit: ["October", "December", "April", "June"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Aarav Sharma",
      role: "user",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav",
    },
    reviews: [
      {
        _id: "rev-manali-1",
        author: { name: "Vikram Sen", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Vikram" },
        rating: 5,
        comment: "Incredible mountain air, stunning mountain drives, and delicious hot chai by the river!",
      },
    ],
  },
  {
    id: "maldives",
    _id: "maldives",
    name: "Maldives",
    city: "Malé",
    state: "North Malé Atoll",
    country: "Maldives",
    category: ["Beaches"],
    rating: 4.9,
    price: "₹78,000",
    estimatedBudget: 78000,
    description:
      "A tropical nation in the Indian Ocean composed of 26 ring-shaped atolls. Renowned for turquoise lagoons, crystal-clear diving, luxury overwater villas, and vibrant coral reefs.",
    bestTimeToVisit: ["November", "December", "January", "February", "March", "April"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Admin Explorer",
      role: "admin",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    },
    reviews: [
      {
        _id: "rev-maldives-1",
        author: { name: "Chloe Dupont", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Chloe" },
        rating: 5,
        comment: "Crystal clear water like you've never seen before. Truly paradise on Earth.",
      },
    ],
  },
  {
    id: "swiss-alps",
    _id: "swiss-alps",
    name: "Swiss Alps",
    city: "Interlaken",
    state: "Bern",
    country: "Switzerland",
    category: ["Adventure", "Mountains"],
    rating: 4.9,
    price: "₹1,48,000",
    estimatedBudget: 148000,
    description:
      "Surrounded by towering peaks like the Eiger, Mönch, and Jungfrau, Interlaken and the Swiss Alps offer breathtaking alpine panoramas, skiing, hiking, and pristine turquoise mountain lakes.",
    bestTimeToVisit: ["June", "July", "August", "December", "January"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Aarav Sharma",
      role: "user",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav",
    },
    reviews: [
      {
        _id: "rev-swiss-1",
        author: { name: "Markus Weber", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Markus" },
        rating: 5,
        comment: "The train ride up to Jungfraujoch is a once-in-a-lifetime experience. Pure alpine grandeur.",
      },
    ],
  },
  {
    id: "amalfi",
    _id: "amalfi",
    name: "Amalfi Coast & Positano",
    city: "Positano",
    state: "Campania",
    country: "Italy",
    category: ["Beaches", "Historical"],
    rating: 4.8,
    price: "₹45,000",
    estimatedBudget: 45000,
    description:
      "A dramatic coastline famous for sheer cliffs, pastel-hued fishing villages clinging to rugged terrain, and turquoise Mediterranean sea vistas.",
    bestTimeToVisit: ["May", "June", "September"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Admin Explorer",
      role: "admin",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    },
    reviews: [
      {
        _id: "rev-amalfi-1",
        author: { name: "Giulia Rossi", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Giulia" },
        rating: 5,
        comment: "Breathtaking views at every cliffside turn! The limoncello and fresh seafood are sublime.",
      },
    ],
  },
  {
    id: "kyoto",
    _id: "kyoto",
    name: "Kyoto Ancient Temples",
    city: "Kyoto",
    state: "Kansai",
    country: "Japan",
    category: ["Historical", "Culture"],
    rating: 4.9,
    price: "₹60,000",
    estimatedBudget: 60000,
    description:
      "The former imperial capital of Japan celebrated for classical Buddhist temples, serene zen gardens, imperial palaces, Shinto shrines and traditional wooden machiya houses.",
    bestTimeToVisit: ["March", "April", "November"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Aarav Sharma",
      role: "user",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav",
    },
    reviews: [
      {
        _id: "rev-kyoto-1",
        author: { name: "Maya Kapoor", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Maya" },
        rating: 5,
        comment: "The quietest morning at Arashiyama. Arrive before 7 and the bamboo grove feels magical.",
      },
    ],
  },
];
