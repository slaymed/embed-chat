export function appConfig() {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
  };
}
