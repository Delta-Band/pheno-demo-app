import path from 'path';
import { promises as fs } from 'fs';
import { filterFields } from '../../shared/utils';

export default async function handler(req, res) {
  const { fieldID } = req.query;

  // absolute path to json directory
  const jsonDirectory = path.join(process.cwd(), 'json');

  // get fields
  let data = await fs.readFile(jsonDirectory + '/fields.json', 'utf8');
  data = await JSON.parse(data);

  // find specific field with id
  data = data.find(field => field.id === fieldID);

  //Return the content of the data file in json format
  res.status(200).json(data);
}
