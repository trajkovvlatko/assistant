import IContentItem from '../interfaces/IContentItem';

export function group(arr: IContentItem[]) {
  const grouped = arr.reduce((res: any, obj: IContentItem) => {
    const key = obj.dueDate ? Date.parse(obj.dueDate.toString()) : 0;
    if (!res[key]) res[key] = [];
    res[key].push({...obj});
    return res;
  }, {});
  return Object.keys(grouped)
    .sort()
    .reduce(
      (acc, key) => ({
        ...acc,
        [key]: grouped[key],
      }),
      {}
    );
}

export function isValidUrl(val: string) {
  try {
    new URL(val);
  } catch (_) {
    return false;
  }

  return true;
}
