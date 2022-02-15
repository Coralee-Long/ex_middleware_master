const express = require('express')
const app = express()
require('dotenv').config()

const responseMiddle = require('./middlewares/responseWithMethodMiddleWare')
const birdsRouter = require('./routes/birds')
const secureRouter = require('./routes/secure')

const PORT = process.env.PORT || 3002


// app.get('/', (req, res, next) => {
//     res.send('Hello world')
// })

// const getOnlyMiddleware = (request, response) => {
//     console.log(request.method)
//     if(request.method === 'GET' || request.method === 'POST') {
//       response.send('Correct method');  // send resource
//     } else {
//       response.sendStatus(403); // wrong method used
//     }
// };
   
// app.use('/path', getOnlyMiddleware);


// when coming in this path(/birds) use birdsRouter

// function errorLogger(error, req, res, next) { // for logging errors
//   console.error(error) // or using any fancy logging library
//   next(error) // forward to next middleware
// }

// app.use(errorLogger)



app.use('/birds', birdsRouter)
app.use('/secure', secureRouter)


const filterGetMiddleware = (err,request, response, next) => {
   
      if (request.method === 'GET') {
      next(); // continue with the next middleware 
    }
    else {
      console.log(err)
    }
  
 
   };
   
 const responseWithResource = (request, response, next) => {
    if(request.params.param === 'hello'){
    next()
    }
    else {
        response.sendStatus(403); // wrong method used
      }
   };

   const thirdMiddleWare = (request, response) => {
       response.send('My third middleware')
   }
   
   app.use('/path/:param', [filterGetMiddleware, responseWithResource, thirdMiddleWare]);




   
   app.get('/', [responseMiddle]);     // The client will see 'get' in the browser
   app.post('/', responseMiddle);    // The client will see 'post' in the browser
   app.put('/', responseMiddle);     // The client will see 'put' in the browser
   app.delete('/', responseMiddle);  // The client will see 'delete' in the browser

  //  app.use((error, req, res, next) => {
  //   console.log("Error Handling Middleware called")
  //   console.log('Path: ', req.path)
  //   next() // (optional) invoking next middleware
  // })




app.listen(PORT, console.log('Server is running'))



// const express = require('express')
// const fsPromises = require('fs').promises

// const app = express()
// const port = 3000

// app.get('/one', (req, res, next) => {
//   fsPromises.readFile('./one.txt') // arbitrary file
//     .then(data => res.send(data))
//     .catch(err => next(err)) // passing error to custom middleware
// })

// app.get('/two', (req, res, next) => {
//   fsPromises.readFile('./two.txt')
//     .then(data => res.send(data))
//     .catch(err => {
//         err.type = 'redirect' // custom prop to specify handling behaviour
//         next(err)
//     })
// })

// app.get('/error', (req, res) => {
//   res.send("Custom error landing page.")
// })

// app.use((error, req, res, next) => {
//   console.log("Error Handling Middleware called")
//   console.log('Path: ', req.path)
//   console.error('Error: ', error)
 
//   if (error.type == 'redirect')
//       res.redirect('/error')

//    else if (error.type == 'time-out') // arbitrary condition check
//       res.status(408).send(error)
//   else
//       res.status(500).send(error)
// })


// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
