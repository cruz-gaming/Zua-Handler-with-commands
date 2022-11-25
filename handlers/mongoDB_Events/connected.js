module.exports = {
  name: "connected",

  async execute(client) {
    client.logger(`Connected to MongoDB Database!`.bold.brightGreen)
  }
}

