
import express from 'express';
import { MongoClient } from 'mongodb';
import assert from 'assert';
import config from '../config';

const mongoClient = new MongoClient(config.mongodbUri, { useUnifiedTopology: true });
let database;
mongoClient.connect()
  .then(() => {
    database = mongoClient.db('react_full');
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Couldn\'t connect to DB:', err));


//// Function to connect to the server
async function run() {
  try {
    // Connect the client to the server
    await mongoClient.connect();

    // const database = mongoClient.db('react_full');
    // const collection = database.collection('contests');
    // Query for a contest that has the categoryName: "Website"
    // const query = { categoryName: 'Website' };
    // const contest = await collection.findOne(query);
    // console.log('RESULT:', contest);
  } finally {
    // Ensures that the mongoClient will close when you finish/error
    await mongoClient.close();
  }
}
// run().catch(console.dir);

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

router.get('/contests/:contestId', (req, res) => {
  database.collection('contests')
    .findOne({ id: Number(req.params.contestId) })
    .then(contest => res.send(contest))
    .catch(console.error);
});

export default router;
