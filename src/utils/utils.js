export function getRandomElementInArray(arr, num) {
  let result = [];
  for (let i = 0; i < num; i++) {
    let luckyOne = Math.floor(Math.random() * (arr.length - i));
    result.push(arr[luckyOne]);
    arr[luckyOne] = arr[arr.length - i - 1];
  }
  return result;
}

export function numberFormat(num) {
  if (num >= 100000000) {
    num = Math.round(num / 10000000) / 10 + "亿";
  } else if (num >= 10000) {
    num = Math.round(num / 10000) + "万";
  }
  return num;
}

export function formatIndex(index) {
  index += 1;
  if (index < 10) {
    index = "0" + index;
  }
  return index;
}

export function randomNum(n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n);
}

export function shuffle(arr) {
  let _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let j = randomNum(0, i);
    let temp = arr[i];
    _arr[i] = _arr[j];
    _arr[j] = temp;
  }
  return _arr;
}
