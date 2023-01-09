import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const { folderID } = req.query;

  // absolute path to json directory
  const jsonDirectory = path.join(process.cwd(), 'json');

  // get fields
  let data = await fs.readFile(jsonDirectory + '/fields.json', 'utf8');
  data = await JSON.parse(data);

  // filter the fields by folderID (if specified)
  if (folderID && folderID !== 'undefined') {
    data = data.reduce((acc, field) => {
      if (field.folderID === folderID) {
        acc.push(field);
      }
      return acc;
    }, []);
  }
  // if (req.query.filter !== 'undefined') {
  //   const filtersRegEx = filterToRegEx(decodeURIComponent(req.query.filter));
  //   data = data.reduce((acc, field) => {
  //     if (field.name.search(filtersRegEx) >= 0) {
  //       acc.push(field);
  //     }
  //     return acc;
  //   }, []);
  // }
  //Return the content of the data file in json format
  res.status(200).json(data);
}
