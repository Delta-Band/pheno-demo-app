import path from 'path';
import { promises as fs } from 'fs';
import uniq from 'lodash/uniq';

export default async function handler(req, res) {
  const { folderID } = req.query;

  // absolute path to json directory
  const jsonDirectory = path.join(process.cwd(), 'json');

  // get folders
  let folderList = await fs.readFile(jsonDirectory + '/folders.json', 'utf8');
  folderList = JSON.parse(folderList);

  // get fields
  let fields = await fs.readFile(jsonDirectory + '/fields.json', 'utf8');
  fields = JSON.parse(fields);

  // filter the fields by folderID (if specified)
  if (folderID && folderID !== 'undefined') {
    fields = fields.filter(field => field.folderID === folderID);
  }

  // build the folders object and enrich with information form the fields object
  let folders = fields.reduce((acc, field) => {
    acc[field.folderID] = {
      name: folderList.find(itm => itm.id === field.folderID).name,
      participants: Math.max(
        acc[field.folderID]?.participants || 0,
        field.participants || 0
      ),
      measurements: acc[field.folderID]?.measurements
        ? acc[field.folderID].measurements + field.measurements
        : field.measurements,
      cohorts: acc[field.folderID]?.cohorts
        ? uniq(acc[field.folderID].cohorts.concat(field.cohorts))
        : field.cohorts
    };
    return acc;
  }, {});

  // convert to array
  folders = Object.keys(folders).reduce((acc, key) => {
    acc.push(Object.assign(folders[key], { id: key }));
    return acc;
  }, []);

  res.status(200).json(folders);
}
