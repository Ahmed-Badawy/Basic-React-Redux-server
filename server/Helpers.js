
function getRandomResponseTime() {
  var max = 3000; // ms
  var min = 500;
  return Math.floor(Math.random() * (max - min)) + min;
}

export default { 
	getRandomResponseTime
}

