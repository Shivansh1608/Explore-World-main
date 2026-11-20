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
  {
    id: "santorini",
    _id: "santorini",
    name: "Santorini & Oia",
    city: "Oia",
    state: "Cyclades",
    country: "Greece",
    category: ["Beaches", "Historical"],
    rating: 4.9,
    price: "₹85,000",
    estimatedBudget: 85000,
    description:
      "Famous for its dramatic volcanic caldera, dazzling whitewashed cubiform buildings with cobalt-blue domes clinging to 300-meter cliffs, and world-renowned Aegean sunsets.",
    bestTimeToVisit: ["May", "June", "September", "October"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Admin Explorer",
      role: "admin",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    },
    reviews: [
      {
        _id: "rev-santorini-1",
        author: { name: "Nikos Kazantzakis", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Nikos" },
        rating: 5,
        comment: "The sunset from the Byzantine castle ruins in Oia is pure poetry. Unmatched views across the caldera.",
      },
    ],
  },
  {
    id: "dubai",
    _id: "dubai",
    name: "Dubai Skyline & Desert",
    city: "Dubai",
    state: "Emirate of Dubai",
    country: "United Arab Emirates",
    category: ["Adventure", "Culture"],
    rating: 4.8,
    price: "₹65,000",
    estimatedBudget: 65000,
    description:
      "A city of architectural wonders combining the world's tallest building (Burj Khalifa) with opulent shopping malls, man-made islands, luxury dune bashing, and rich Arabian spice souks.",
    bestTimeToVisit: ["November", "December", "January", "February", "March"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Aarav Sharma",
      role: "user",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav",
    },
    reviews: [
      {
        _id: "rev-dubai-1",
        author: { name: "Zaid Al-Maktoum", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Zaid" },
        rating: 5,
        comment: "The desert safari sunset and Burj Khalifa observation deck were unforgettable experiences!",
      },
    ],
  },
  {
    id: "new-york",
    _id: "new-york",
    name: "New York City",
    city: "New York",
    state: "New York",
    country: "United States",
    category: ["Culture", "Historical"],
    rating: 4.8,
    price: "₹1,25,000",
    estimatedBudget: 125000,
    description:
      "The city that never sleeps: from the towering Empire State Building and Statue of Liberty to Central Park, Broadway theaters, world-class art at MoMA, and vibrant cultural neighborhoods.",
    bestTimeToVisit: ["April", "May", "September", "October", "December"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Admin Explorer",
      role: "admin",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    },
    reviews: [
      {
        _id: "rev-nyc-1",
        author: { name: "Jessica Taylor", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Jessica" },
        rating: 5,
        comment: "Walking the Brooklyn Bridge at sunrise and exploring Greenwich Village cafes made my trip!",
      },
    ],
  },
  {
    id: "rome",
    _id: "rome",
    name: "Rome & The Colosseum",
    city: "Rome",
    state: "Lazio",
    country: "Italy",
    category: ["Historical", "Culture"],
    rating: 4.9,
    price: "₹76,000",
    estimatedBudget: 76000,
    description:
      "The Eternal City where ancient ruins like the Colosseum, Pantheon, and Roman Forum sit alongside lively piazzas, the Vatican museums, and sublime authentic Italian cuisine.",
    bestTimeToVisit: ["March", "April", "May", "September", "October"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Aarav Sharma",
      role: "user",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav",
    },
    reviews: [
      {
        _id: "rev-rome-1",
        author: { name: "Marco Bellini", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Marco" },
        rating: 5,
        comment: "Tossing a coin into the Trevi Fountain at night was magical. The pasta carbonara is unbeatable.",
      },
    ],
  },
  {
    id: "banff",
    _id: "banff",
    name: "Banff & Lake Louise",
    city: "Banff",
    state: "Alberta",
    country: "Canada",
    category: ["Mountains", "Wildlife", "Adventure"],
    rating: 4.9,
    price: "₹1,32,000",
    estimatedBudget: 132000,
    description:
      "Located in the heart of the Canadian Rockies, Banff is famed for glowing turquoise glacial lakes like Lake Louise and Moraine Lake, towering limestone peaks, and abundant elk and bear wildlife.",
    bestTimeToVisit: ["June", "July", "August", "September", "December"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Admin Explorer",
      role: "admin",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    },
    reviews: [
      {
        _id: "rev-banff-1",
        author: { name: "David Miller", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=David" },
        rating: 5,
        comment: "Canoeing on Moraine Lake surrounded by the Ten Peaks was the most beautiful view of my life.",
      },
    ],
  },
  {
    id: "serengeti",
    _id: "serengeti",
    name: "Serengeti National Park",
    city: "Arusha",
    state: "Mara Region",
    country: "Tanzania",
    category: ["Wildlife", "Adventure"],
    rating: 4.9,
    price: "₹1,85,000",
    estimatedBudget: 185000,
    description:
      "Vast African savannahs that host the Great Migration of over two million wildebeest and zebras. Home to lions, leopards, elephants, and breathtaking golden acacia sunrises.",
    bestTimeToVisit: ["June", "July", "August", "September", "October"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Aarav Sharma",
      role: "user",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav",
    },
    reviews: [
      {
        _id: "rev-serengeti-1",
        author: { name: "Amara Mwangi", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Amara" },
        rating: 5,
        comment: "Witnessing lions on the kopjes at dawn was an experience that changes how you see nature.",
      },
    ],
  },
  {
    id: "cairo",
    _id: "cairo",
    name: "Cairo & Pyramids of Giza",
    city: "Giza",
    state: "Cairo Governorate",
    country: "Egypt",
    category: ["Historical", "Culture"],
    rating: 4.8,
    price: "₹58,000",
    estimatedBudget: 58000,
    description:
      "The last surviving wonder of the ancient world. Stand before the Great Pyramid of Khufu, gaze upon the enigmatic Great Sphinx, and sail the historic River Nile on a traditional felucca.",
    bestTimeToVisit: ["October", "November", "December", "January", "February", "March"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Admin Explorer",
      role: "admin",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    },
    reviews: [
      {
        _id: "rev-cairo-1",
        author: { name: "Tariq Hassan", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Tariq" },
        rating: 5,
        comment: "Standing next to stones carved over 4,500 years ago is humbling. Do hire a camel for the desert panorama!",
      },
    ],
  },
  {
    id: "ladakh",
    _id: "ladakh",
    name: "Ladakh & Pangong Tso",
    city: "Leh",
    state: "Ladakh",
    country: "India",
    category: ["Mountains", "Adventure"],
    rating: 4.9,
    price: "₹28,000",
    estimatedBudget: 28000,
    description:
      "The Land of High Passes: stark lunar landscapes, ancient cliffside Tibetan Buddhist gompas, the world's highest motorable passes, and the deep shifting blues of Pangong Tso lake.",
    bestTimeToVisit: ["May", "June", "July", "August", "September"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Aarav Sharma",
      role: "user",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav",
    },
    reviews: [
      {
        _id: "rev-ladakh-1",
        author: { name: "Rohan Varma", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Rohan" },
        rating: 5,
        comment: "Stargazing by Pangong Lake at 14,000 feet was surreal. The Milky Way was clearly visible with naked eyes.",
      },
    ],
  },
  {
    id: "rio",
    _id: "rio",
    name: "Rio de Janeiro",
    city: "Rio de Janeiro",
    state: "State of Rio de Janeiro",
    country: "Brazil",
    category: ["Beaches", "Culture"],
    rating: 4.8,
    price: "₹95,000",
    estimatedBudget: 95000,
    description:
      "The Marvelous City where lush rainforest-covered mountains meet the Atlantic Ocean. World-famous for the Christ the Redeemer statue, Copacabana and Ipanema beaches, and infectious samba rhythms.",
    bestTimeToVisit: ["December", "January", "February", "March"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Admin Explorer",
      role: "admin",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    },
    reviews: [
      {
        _id: "rev-rio-1",
        author: { name: "Mateo Silva", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Mateo" },
        rating: 5,
        comment: "Cable car up Sugarloaf Mountain at dusk offers one of the greatest city views on earth.",
      },
    ],
  },
  {
    id: "queenstown",
    _id: "queenstown",
    name: "Queenstown & Milford Sound",
    city: "Queenstown",
    state: "Otago",
    country: "New Zealand",
    category: ["Adventure", "Mountains"],
    rating: 4.9,
    price: "₹1,55,000",
    estimatedBudget: 155000,
    description:
      "The adventure capital of the Southern Hemisphere, nestled on the shores of Lake Wakatipu against the Remarkables mountain range. Gateway to dramatic fiord cruising in Milford Sound and jet boating.",
    bestTimeToVisit: ["December", "January", "February", "March", "July", "August"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80",
      },
    ],
    createdBy: {
      name: "Aarav Sharma",
      role: "user",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav",
    },
    reviews: [
      {
        _id: "rev-queenstown-1",
        author: { name: "Liam Cooper", profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Liam" },
        rating: 5,
        comment: "Bungee jumping, Fergburger, and a scenic flight over Milford Sound. Peak adventure!",
      },
    ],
  },
];
