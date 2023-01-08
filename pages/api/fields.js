import path from 'path';
import { promises as fs } from 'fs';

// function filterToRegEx(filter) {
//   const filterSplit = filter.split(',');
//   const regex = filterSplit.reduce((acc, itm, i) => {
//     if (i === filterSplit.length - 1) {
//       acc += `${escapeRegExp(itm)}`;
//     } else {
//       acc += `${escapeRegExp(itm)}|`;
//     }
//     return acc;
//   }, '');
//   return new RegExp(regex, 'gi');
// }

export default async function handler(req, res) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'json');
  //Read the json data file data.json
  let data = await fs.readFile(jsonDirectory + '/fields.json', 'utf8');
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
  res.status(200).json(JSON.parse(data));
}
