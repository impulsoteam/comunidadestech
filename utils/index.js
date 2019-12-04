export const paramFilter = (array, filter) => {
  const newArray = array.map((item) => {
    if (
      (item.category === filter.category || filter.category === '') &&
      (item.tags.includes(filter.tags) || filter.tags === '') &&
      (item.model === filter.model || filter.model === '') &&
      (item.type.includes(filter.type) || filter.type === '') &&
      (item.location.country === filter.country || filter.country === '') &&
      (item.location.state === filter.state || filter.state === '') &&
      (item.location.city === filter.city || filter.city === '') &&
      (item.nameSearch.includes(filter.nameSearch) || filter.nameSearch === '')
    )
      return item;
  });
  return newArray.filter((value) => value);
};

export const normalize = (array) => {
  array.map((item) => (item.nameSearch = item.name.toLowerCase()));
  return array.sort((a, b) => (a.name > b.name ? 1 : -1));
};
