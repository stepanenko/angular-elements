
import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

let database;
MongoClient.connect(config.mongodbUri, { useUnifiedTopology: true })
  .then((mongoClient) => {
    database = mongoClient.db('react_full');
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Couldn\'t connect to DB:', err))


const router = express.Router();

router.get('/contests', (req, res) => {
  let contests = {};
  database.collection('contests').find({})
    .project({
      id: 1,
      categoryName: 1,
      contestName: 1
    })
    .each((err, contest) => {
      assert.strictEqual(null, err);

      if (!contest) { // no more contests
        res.send({ contests });
        return;
      }

      contests[contest.id] = contest;
    });
});

router.get('/names/:nameIds', (req, res) => {
  const nameIds = req.params.nameIds.split(',').map(Number);
  let names = {};
  database.collection('names').find({ id: { $in: nameIds } })
    .each((err, name) => {
      assert.strictEqual(null, err);

      if (!name) { // no more names
        res.send({ names });
        return;
      }

      names[name.id] = name;
    });
});

router.get('/contests/:contestId', (req, res) => {
  database.collection('contests')
    .findOne({ id: Number(req.params.contestId) })
    .then(contest => res.send(contest))
    .catch(() => console.error('Error!'));
});

export default router;
