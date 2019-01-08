function axios(v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), 3000)
  });
}


export default axios; 