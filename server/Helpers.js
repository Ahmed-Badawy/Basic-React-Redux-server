
function getRandomResponseTime() {
  var max = 1200; // ms
  var min = 150;
  return Math.floor(Math.random() * (max - min)) + min;
}

export default { 
	getRandomResponseTime
}

