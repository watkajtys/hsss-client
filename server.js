// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


//
var express = require('express');
var path = require('path');


var app = new express();

// Setup view engine
app.set('view engine', 'html');

app.use(express.static(path.resolve(path.join(__dirname, '/dist'))));

app.get('/', function (req, res) {
  res.sendfile('../dist/index.html');
});

var server = app.listen(process.env.PORT || 8080, function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});





// // initialize the server and configure support for ejs templates
// const app = new Express();
// const server = new Server(app);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
//
// // define the folder that will be used for static assets
// app.use(Express.static(path.join(__dirname, 'static')));
//
// // universal routing and rendering
// app.get('*', (req, res) => {
//   match(
//     { routes, location: req.url },
//     (err, redirectLocation, renderProps) => {
//
//       // in case of error display the error message
//       if (err) {
//         return res.status(500).send(err.message);
//       }
//
//       // in case of redirect propagate the redirect to the browser
//       if (redirectLocation) {
//         return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//       }
//
//       // generate the React markup for the current route
//       let markup;
//       if (renderProps) {
//         // if the current route matched we have renderProps
//         markup = renderToString(<RouterContext {...renderProps}/>);
//       } else {
//         // otherwise we can render a 404 page
//         markup = renderToString(<NotFoundPage/>);
//         res.status(404);
//       }
//
//       // render the index template with the embedded React markup
//       return res.render('index', { markup });
//     }
//   );
// });