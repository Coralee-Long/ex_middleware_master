
const responseWithMethodMiddleware = (request, response) => {
    response.send(request.method); // Get the request method and send it back to the client
   };

   module.exports = responseWithMethodMiddleware