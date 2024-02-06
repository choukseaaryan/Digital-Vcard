const Response = require('./response');

const handleException = (res, error) => {

  const obj = {
    res,
    status: 500,
    msg: error || "Unable to process. Please Try Again",
  };
  return Response.error(obj);
};

module.exports = handleException;
