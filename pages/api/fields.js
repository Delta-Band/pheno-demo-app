import path from 'path';
import { promises as fs } from 'fs';
import { filterFields } from '../../shared/utils';

export default async function handler(req, res) {
  const { folderID, filter } = req.query;

  // absolute path to json directory
  const jsonDirectory = path.join(process.cwd(), 'json');

  // get fields
  let data = await fs.readFile(jsonDirectory + '/fields.json', 'utf8');
  data = await JSON.parse(data);

  // filter the fields by folderID (if specified)
  data = filterFields(data, folderID, filter);

  // reduce data to exclude graph info
  data = data.map(field => {
    delete field.dataDistribution;
    delete field.dataAccumulation;
    delete field.distributionStats;
    return field;
  });

  //Return the content of the data file in json format
  res.status(200).json(data);
}
