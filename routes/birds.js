const birdsRouter = require('express').Router()



// middleware that is specific to this router
birdsRouter.use((error, request, response, next) => {
 console.log('Time: ', new Date().toLocaleString()); // console logs to terminal
 next();
});

birdsRouter.use((req, res, next, error) => {
    console.error(error.stack)
    res.status(500).send('Something broke!')
   });

// define the home page route
birdsRouter.get('/', (request, response) => {
 response.send('Birds home page');
});

// define the about route
birdsRouter.get('/about', (request, response) => {
 response.send('About birds');
});

module.exports = birdsRouter;