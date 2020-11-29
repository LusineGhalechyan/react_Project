export const jsDateformatter = () => {
  const date = new Date();

  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const formatDate = (str = "") => str.slice(0, 10);
