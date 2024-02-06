const response = {
  statusCode: 200,
  msg: 'Request Success',
  errorMessage: 'Something went wrong, Kindly try again',
  success: function ({ res, headers, status, msg, data }) {
    if (headers) {
      res.set(headers);
    }
    if (!data) {
      this.statusCode = 204;
    }
    res.status(status || this.statusCode).json({
      msg: msg || this.msg,
      data: data,
    });
  },
  error: function ({ res, headers, status, msg, data }) {
    if (headers) {
      res.set(headers);
    }
    res.status(status || 400).json({
      msg: msg || this.errorMessage,
      data: data,
    });
  },
};

module.exports = response;
