import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  const folderID = req.query.folderID;
  let data = await fs.readFile(jsonDirectory + '/fields.json', 'utf8');
  data = await JSON.parse(data);
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
