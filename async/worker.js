onmessage = function() {
  console.log(new Date());

  let myDate;
  for(let i = 0; i < 10000000; i++) {
    let date = new Date();
    myDate = date
  }

  console.log(new Date());
}
