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
