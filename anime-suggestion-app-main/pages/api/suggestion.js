import { MongoClient } from 'mongodb';

export default async function handler(req, res) {

console.log("reached server");
const uri = 'mongodb+srv://2023mt03061:AsqhgboehIcTE5Ar@cluster0.tzwotuy.mongodb.net/assignment?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const { searchQuery } = req.query;
var list =searchQuery.split(',');
let ArrayList = [];
var listCount = 0;

try {
  await client.connect();

  list.forEach(async value => {

    const searchString = value.trim();
    // console.log(searchString);
    const SearchPatternQuery = { tags: { $regex: searchString, $options: 'i' } };

  const database = client.db('assignment');
  const collection = database.collection('cc');
  const data = await collection.find(SearchPatternQuery).sort({ rating: -1 }).limit(4).toArray();
  // console.log(SearchPatternQuery);
  ArrayList=ArrayList.concat(data);
  listCount++
  //console.log(ArrayList);
  if(ArrayList.length !==0 && (listCount === list.length) ) res.status(200).json(ArrayList);
  else if(listCount === list.length && ArrayList.length === 0) res.status(200).json([]);

  });

  // const SearchPatternQuery = { tags: { $regex: searchQuery, $options: 'i' } };

  // const database = client.db('assignment');
  // const collection = database.collection('cc');
  // const data = await collection.find(SearchPatternQuery).sort({ rating: -1 }).limit(50).toArray();
  


} finally {

  if(listCount === list.length) await client.close();
}
};
