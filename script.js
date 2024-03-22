require("dotenv").config({ path: "info.env" });
// unsplash API
const count = 10;
const apiKey = process.env.UNSPLASH_ACCESS_KEY;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;