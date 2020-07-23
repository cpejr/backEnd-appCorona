const Counter = require("../models/counterModel");

module.exports = {
  async registerCount(request, response) {
    try {
      const { id } = request.params;
      const date = new Date(Date.now());
      const result = await Counter.registerCount(date, id);
      return response.json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error });
    }
  },

  async getRecentCount(request, response) {
    try {
      const result = await Counter.getRecentCount();
      return response.json(result);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: error });
    }
  },
};
