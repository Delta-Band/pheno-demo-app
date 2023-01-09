function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
}

function filterToRegEx(filter) {
  if (!filter || filter === 'undefined') return;
  const filterSplit = decodeURIComponent(filter).split(',');
  const regex = filterSplit.reduce((acc, itm, i) => {
    if (i === filterSplit.length - 1) {
      acc += `${escapeRegExp(itm)}`;
    } else {
      acc += `${escapeRegExp(itm)}|`;
    }
    return acc;
  }, '');
  return new RegExp(regex, 'gi');
}

export function filterFields(fields, folderID, filter) {
  const filterRegEx = filterToRegEx(filter);
  return fields.filter(field => {
    switch (true) {
      case Boolean(folderID && folderID !== 'undefined' && !filterRegEx):
        return field.folderID === folderID;
      case Boolean(folderID && folderID !== 'undefined' && filterRegEx):
        console.log('here');
        return (
          field.folderID === folderID && field.name.search(filterRegEx) >= 0
        );
      case Boolean(!folderID || (folderID === 'undefined' && filterRegEx)):
        return field.name.search(filterRegEx) >= 0;
      default:
        return true;
    }
  });
}

export function getIconByDatType(type) {
  switch (type.toLowerCase()) {
    case 'time series':
      return 'timer';
    case 'tabular':
      return 'table';
    case 'image':
      return 'image';
    case 'molecular':
      return 'molecule';
    case 'health records':
      return 'health-book';
    default:
      return null;
  }
}
