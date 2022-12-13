export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  apiKey: process.env.API_KEY,
  database: process.env.MONGODB_URI,
  google: {
    api: process.env.GOOGLE_API_KEY,
  },
  bestTime: {
    url: process.env.BEST_TIME_URL,
    privateKey: process.env.BEST_TIME_PRIVATE,
    publicKey: process.env.BEST_TIME_PUBLIC,
  },
});
