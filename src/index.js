const express = require('express');
const {dbConnect} = require('./db/connector');
const {getRoutes} = require('./modules');
const http = require('http');
const socketIO = require('socket.io');
const {passport} = require('./modules/users/services/passport.service');
const expressSession = require('express-session');
const {getSockets} = require('./sockets');
const path = require('path');


const app = express();

const server = http.Server(app);
const io = socketIO(server, {allowEIO3: true});

const port = process.env.PORT || 3000;

const sessionMiddleware = expressSession({
  name: 'connect.sid',
  secret: 'test',
  cookie: {
    httpOnly: false
  },
  resave: false,
  saveUninitialized: false,
});

(async () => {
  app.use('/public', express.static('public'));
  app.use(express.json());
  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());

  io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
  });

  const moduleRouters = await getRoutes();

  const moduleSockets = await getSockets();
  io.on('connection', async (socket) => {
    for (const moduleSocket of moduleSockets) {
      await moduleSocket(socket, io);
    }
  });

  moduleRouters.forEach((route) => {
    console.log(`${route.path} module router init`);
    app.use(route.path, route.router);
  });

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  });


  const mongoose = await dbConnect();
  if (mongoose) {
    server.listen(port, () => {
      console.log(`App listening on port: ${port}`);
    });
  }
})();



