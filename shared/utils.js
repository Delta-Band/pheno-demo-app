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

export function filterToRegEx(filter) {
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
