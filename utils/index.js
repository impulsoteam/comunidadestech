export const paramFilter = (array, filter) => {
  Object.keys(filter).forEach((key) => !filter[key] && delete filter[key]);
  const keys = Object.keys(filter);
  let filtered = array.filter((item) => {
    for (const key of keys) {
      if (item[key] && !item[key].includes(filter[key])) return false;
      if (
        Object.keys(array[0].location).includes(key) &&
        filter[key] !== item.location[key]
      )
        return false;
    }
    return true;
  });
  return filtered;
};

export const normalize = (array) => {
  array.map((item) => (item.nameSearch = item.name.toLowerCase()));
  return array.sort((a, b) => (a.name > b.name ? 1 : -1));
};

export const formatName = (name) =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(' ')
    .join('-');
