
import express from 'express';
import path from 'path';
// import fs from 'fs';
import sassMiddleware from 'node-sass-middleware';
import config from './config';
import apiRouter from './api';

const server = express();

server.use('/api', apiRouter);

server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'dist')
}));

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
  res.render('index', {
    content: '...'
  });
});

// server.get('/about', (req, res) => {
//   fs.readFile('./dist/about.html', (err, data) => {
//     res.send(data.toString());
//   });
// });
// OR simply use:
server.use(express.static('dist'));

server.listen(config.port, () => {
  console.info('Listening on port', config.port);
});
