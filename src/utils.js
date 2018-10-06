import moment from "moment";

module.exports = {
  formatForInput: function(value) {
    return moment.utc(value).format("YYYY-MM-DD");
  },

  handleStatus: function(response) {
    if (!response.ok) {
      throw Error(response.status);
    }
    return response;
  }
};
