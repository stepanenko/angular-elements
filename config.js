
const env = process.env;

export default {
  port: env.PORT || 8080,
  host: env.HOST || '0.0.0.0',
  mongodbUri: 'mongodb+srv://sergio:333444@react-samer-buna.uuh93.mongodb.net/test?retryWrites=true&w=majority',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  }
};
