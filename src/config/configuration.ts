export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  apiKey: process.env.API_KEY,
  database: {
    camber: process.env.CAMBER_DATABASE_URI,
    rabble: process.env.RABBLE_DATABASE_URI,
  },
});
