// Set up db connection here
import { MongoClient } from "mongodb";

const connectionString = "mongodb://localhost:27017";

export const client = new MongoClient(connectionString, {
  useUnifiedTopology: true,
});

let db;
let collection;

async function connectToDb() {
  await client.connect();
  db = client.db("platform");
  collection = db.collection("questions");
}


function getRandomDateBetween2021And2023() {
  // Define the start and end dates
  const startDate = new Date('2021-01-01T00:00:00Z');
  const endDate = new Date('2023-12-31T23:59:59Z');

  // Convert dates to timestamps
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();

  // Generate a random timestamp between the start and end timestamps
  const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);

  // Convert the random timestamp back to a date
  return new Date(randomTimestamp);
}


const questions = [
  {
    "title": "What are the best practices for exception handling in Java?",
    "description": "Looking for detailed insights on how to effectively handle exceptions in Java, including common pitfalls and advanced techniques.",
    "category": "Software"
  },
  {
    "title": "Can you share some lesser-known health benefits of Mediterranean cuisine?",
    "description": "Interested in understanding the nutritional aspects of Mediterranean food that are not commonly discussed.",
    "category": "Food"
  },
  {
    "title": "What are the must-visit hidden gems in Japan for first-time travelers?",
    "description": "Seeking recommendations for unique, off-the-beaten-path places to visit in Japan, suitable for someone exploring the country for the first time.",
    "category": "Travel"
  },
  {
    "title": "How does Python's GIL (Global Interpreter Lock) impact multithreading?",
    "description": "Exploring the effects of Python's GIL on multithreading performance and looking for workarounds or best practices.",
    "category": "Software"
  },
  {
    "title": "What are some simple yet flavorful vegan recipes for beginners?",
    "description": "In search of easy-to-make vegan recipes that are full of flavor, ideal for someone just starting with vegan cooking.",
    "category": "Food"
  },
  {
    "title": "Is time travel theoretically possible according to modern physics?",
    "description": "A discussion on the theories in modern physics that suggest the possibility of time travel, and the challenges associated with it.",
    "category": "Science"
  },
  {
    "title": "What's the impact of C++20 on modern software development?",
    "description": "Looking to understand how the new features in C++20 are influencing current software development trends and practices.",
    "category": "Software"
  },
  {
    "title": "What are the essential spices to master Indian cooking?",
    "description": "Seeking advice on the key spices and their combinations that are fundamental to authentic Indian cuisine.",
    "category": "Food"
  },
  {
    "title": "What are the best sustainable travel practices in 2024?",
    "description": "Interested in the latest trends and practices for eco-friendly and sustainable travel in the year 2024.",
    "category": "Travel"
  },
  {
    "title": "How is AI transforming the field of genomics?",
    "description": "Exploring the role of artificial intelligence in advancing genomics research and its implications for the future of personalized medicine.",
    "category": "Science"
  }
];

async function loadDataToDatabase() {
  await connectToDb();
  for (const question of questions) {
    const q = {
      ...question,
      created_at: getRandomDateBetween2021And2023()
    }

    try {
      const result = await collection.insertOne(q);
    }
    catch (e) {
      console.error(e);
    }
  }


}

loadDataToDatabase();