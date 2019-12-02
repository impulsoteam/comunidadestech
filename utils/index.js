export const paramFilter = (array, filter) => {
  const newArray = array.map((item) => {
    if (
      (item.category === filter.category || filter.category === '') &&
      (item.tags.includes(filter.tags) || filter.tags === '') &&
      (item.model === filter.model || filter.model === '') &&
      (item.country === filter.country || filter.country === '') &&
      (item.state === filter.state || filter.state === '') &&
      (item.city === filter.city || filter.city === '') &&
      (item.nameSearch.includes(filter.nameSearch) || filter.nameSearch === '')
    )
      return item;
  });
  return newArray.filter((value) => value);
};
