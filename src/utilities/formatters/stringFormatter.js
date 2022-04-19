export const capitalFirst = (str) => {
  const arr = str.trim().split(" ");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = `${arr[i].charAt(0).toUpperCase()}${arr[i].slice(1)}`;
  }
  return arr.join(" ");
}
