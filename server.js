
import express from 'express';
import path from 'path';
import sassMiddleware from 'node-sass-middleware';
import config from './config';
import apiRouter from './api';
import serverRender from './serverRender';

const server = express();

server.use('/api', apiRouter);

server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'dist')
}));

server.set('view engine', 'ejs');


server.get(['/', '/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
    .then(({ initialMarkup, initialData }) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad request');
    });
});

server.use(express.static('dist'));

server.listen(config.port, config.host, () => {
  console.info('Listening on port', config.port);
});
