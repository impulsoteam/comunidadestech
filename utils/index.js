export const paramFilter = (array, filter) => {
  const newArray = array.map((item) => {
    if (
      (item.category === filter.category || filter.category === '') &&
      (item.tags.includes(filter.tags) || filter.tags === '') &&
      (item.model === filter.model || filter.model === '') &&
      (item.location.country === filter.country || filter.country === '') &&
      (item.location.state === filter.state || filter.state === '') &&
      (item.location.city === filter.city || filter.city === '') &&
      (item.nameSearch.includes(filter.nameSearch) || filter.nameSearch === '')
    )
      return item;
  });
  return newArray.filter((value) => value);
};
