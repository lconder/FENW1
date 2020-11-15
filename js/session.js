const jwt = localStorage.getItem('jwt');
const username = localStorage.getItem('username');
var time = localStorage.getItem('time') || 60;
var tokens = localStorage.getItem('tokens') || 20;
var interval;