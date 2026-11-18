import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../modules/users/user.model.js";
import Destination from "../modules/destinations/destination.model.js";
import Post from "../modules/posts/post.model.js";
import Review from "../modules/reviews/review.model.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/explore_world";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing
    try {
      await mongoose.connection.collection("users").dropIndexes();
    } catch (e) {
      // Ignore if not present
    }
    await User.deleteMany();
    await Destination.deleteMany();
    await Post.deleteMany();
    await Review.deleteMany();

    // Create Admin and Standard User
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("admin123", salt);
    const userPassword = await bcrypt.hash("user123", salt);

    const admin = await User.create({
      name: "Admin Explorer",
      email: "admin@exploreworld.com",
      password: adminPassword,
      role: "admin",
      bio: "Platform Administrator & Global Traveler",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
    });

    const user = await User.create({
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      password: userPassword,
      role: "user",
      bio: "Himalayan trekker & landscape photographer.",
      profileImage: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav",
    });

    // Create Destinations
    const destinations = await Destination.insertMany([
      {
        name: "Manali & Solang Valley",
        country: "India",
        state: "Himachal Pradesh",
        city: "Manali",
        category: ["Mountains", "Adventure"],
        description:
          "Nestled in the Beas River Valley, Manali is a gateway for skiing in Solang Valley and trekking in Parvati Valley. Famous for pine forests, snow-clad mountain passes, and tranquil Himalayan streams.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
          },
        ],
        location: { type: "Point", coordinates: [77.1887, 32.2396] },
        estimatedBudget: 8500,
        bestTimeToVisit: ["October", "December", "April", "June"],
        status: "approved",
        createdBy: admin._id,
      },
      {
        name: "Amalfi Coast & Positano",
        country: "Italy",
        state: "Campania",
        city: "Positano",
        category: ["Beaches", "Historical"],
        description:
          "A dramatic coastline famous for sheer cliffs, pastel-hued fishing villages clinging to rugged terrain, and turquoise Mediterranean sea vistas.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
          },
        ],
        location: { type: "Point", coordinates: [14.485, 40.6281] },
        estimatedBudget: 45000,
        bestTimeToVisit: ["May", "June", "September"],
        status: "approved",
        createdBy: admin._id,
      },
      {
        name: "Kyoto Ancient Temples",
        country: "Japan",
        state: "Kansai",
        city: "Kyoto",
        category: ["Historical", "Religious"],
        description:
          "The former imperial capital of Japan celebrated for classical Buddhist temples, gardens, imperial palaces, Shinto shrines and traditional wooden houses.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
          },
        ],
        location: { type: "Point", coordinates: [135.7681, 35.0116] },
        estimatedBudget: 60000,
        bestTimeToVisit: ["March", "April", "November"],
        status: "approved",
        createdBy: user._id,
      },
      {
        name: "Paris",
        country: "France",
        state: "Île-de-France",
        city: "Paris",
        category: ["Historical", "Culture"],
        description:
          "Known as the City of Light, Paris is celebrated for world-class art at the Louvre, the iconic Eiffel Tower, charming sidewalk cafes, and romantic strolls along the River Seine.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
          },
        ],
        location: { type: "Point", coordinates: [2.3522, 48.8566] },
        estimatedBudget: 92000,
        bestTimeToVisit: ["April", "May", "September", "October"],
        status: "approved",
        createdBy: admin._id,
      },
      {
        name: "Bali",
        country: "Indonesia",
        state: "Bali",
        city: "Ubud",
        category: ["Beaches", "Culture"],
        description:
          "An Indonesian paradise known for its forested volcanic mountains, iconic rice paddies, beaches, coral reefs, and tranquil yoga retreats amidst sacred temples.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
          },
        ],
        location: { type: "Point", coordinates: [115.2625, -8.5069] },
        estimatedBudget: 42000,
        bestTimeToVisit: ["May", "June", "July", "August"],
        status: "approved",
        createdBy: admin._id,
      },
      {
        name: "Tokyo",
        country: "Japan",
        state: "Kantō",
        city: "Tokyo",
        category: ["Culture", "Adventure"],
        description:
          "Japan's bustling capital mixes ultramodern neon skyscrapers and pop culture with historic temples. Renowned for culinary mastery, cutting-edge technology, and vibrant street life.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
          },
        ],
        location: { type: "Point", coordinates: [139.6917, 35.6895] },
        estimatedBudget: 84000,
        bestTimeToVisit: ["March", "April", "October", "November"],
        status: "approved",
        createdBy: user._id,
      },
      {
        name: "Maldives",
        country: "Maldives",
        state: "North Malé",
        city: "Malé",
        category: ["Beaches"],
        description:
          "A tropical nation in the Indian Ocean composed of 26 ring-shaped atolls. Renowned for turquoise lagoons, crystal-clear diving, luxury overwater villas, and vibrant coral reefs.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
          },
        ],
        location: { type: "Point", coordinates: [73.5093, 4.1755] },
        estimatedBudget: 78000,
        bestTimeToVisit: ["November", "December", "January", "February", "March", "April"],
        status: "approved",
        createdBy: admin._id,
      },
      {
        name: "Swiss Alps",
        country: "Switzerland",
        state: "Bern",
        city: "Interlaken",
        category: ["Adventure", "Mountains"],
        description:
          "Surrounded by towering peaks like the Eiger, Mönch, and Jungfrau, Interlaken and the Swiss Alps offer breathtaking alpine panoramas, skiing, hiking, and pristine turquoise mountain lakes.",
        images: [
          {
            url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
          },
        ],
        location: { type: "Point", coordinates: [7.8632, 46.6863] },
        estimatedBudget: 148000,
        bestTimeToVisit: ["June", "July", "August", "December", "January"],
        status: "approved",
        createdBy: user._id,
      },
    ]);

    // Create Sample Post
    await Post.create({
      title: "Morning Golden Hour at Solang Valley",
      content:
        "The snow was pristine early this morning before the tourist rush. Caught an epic view of the Himalayan peaks right after sunrise. Highly recommend grabbing a warm tea near the base!",
      author: user._id,
      destination: destinations[0]._id,
      images: [
        {
          url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        },
      ],
      likes: [admin._id],
    });

    // Create Sample Review
    await Review.create([
      {
        destination: destinations[0]._id,
        author: user._id,
        rating: 5,
        comment: "Incredible mountain air, stunning mountain drives, and delicious local food!",
      },
      {
        destination: destinations[3]._id, // Paris
        author: user._id,
        rating: 5,
        comment: "Walking along the Seine at twilight was unforgettable. The museums are world class!",
      },
      {
        destination: destinations[4]._id, // Bali
        author: admin._id,
        rating: 5,
        comment: "The rice terraces in Ubud are mystical. Peaceful cafes and warm locals.",
      },
    ]);

    console.log("Database seeded successfully with demo users, destinations, posts, and reviews!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedData();
