module.exports = {
  name: "disconnected",

  async execute(client) {
    client.logger(`MongoDB have been disconnected at ${new Date()}`.brightRed)
  }
}

