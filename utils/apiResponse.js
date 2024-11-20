var sendResponse = function(data, status, res){
    var response = {  status: {
                        status_code: 0,
                        message: "SUCCESS"
                      },
                      payload: data
                    };
  
    res.status(status).json(response);
  };

  var sendError = function(error, data, status, res){
    var response = {  error: error
                  };
  
    res.status(status).json(response);
  };
  

  module.exports = {
    sendResponse: sendResponse,
    sendError: sendError
  }