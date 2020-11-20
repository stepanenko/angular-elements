
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const mongodbUri = 'mongodb+srv://sergio:333444@react-samer-buna.uuh93.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(mongodbUri, { useUnifiedTopology: true }, (err, client) => {
  assert.strictEqual(null, err);

  console.log("Connected successfully to mongoDB");

  let contestCount = 0;
  client.db('react_full').collection('contests').find({}).each((err, contest) => {
    assert.strictEqual(null, err);
    if (!contest) return;

    contestCount++;
    client.db('react_full').collection('names')
      .find({ id: { $in: contest.nameIds } })
      .project({ _id: 1 })
      .toArray()
      .then(_ids => {
        const newIds = _ids.map(o => o._id);
        client.db('react_full').collection('contests').updateOne(
          { id: contest.id },
          { $set: { nameIds: newIds } }
        ).then(() => {
          console.info('Updated', contest._id);
          contestCount--;
          if (contestCount === 0) client.close();
        });
      })
      .catch(console.error);
  });

});
