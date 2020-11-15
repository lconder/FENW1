let records = [];
const back = 'purple_back.jpg';
const cards = [
  'AS.jpg',
  'AC.jpg',
  'AD.jpg',
  'AH.jpg',
];
let matches = tokens / 2;
var first_selection = null, second_selection = null;
var points = 0;
var randoms = []
var topRecords = true;

function loadIndex() {
  $('#root').load('pages/main.html');
}

function loadLogin() {
  $('#root').load('pages/login.html');
  reloadJs('js/login-controller.js');
}

function loadGame() {
  $('#root').load('pages/game.html');
  reloadJs('js/game-controller.js');
}

function signup() {
  $('#root').load('pages/signup.html');
  reloadJs('js/signup-controller.js');
}

function logout() {
  localStorage.removeItem('jwt');
  loadLogin();
  $('#login').show();
  $('#signup').show();
  $('#logout').hide();
  $('#own').hide();
}

function scores(_top) {
  $('#root').load('pages/scores.html');
  topRecords = _top;
  reloadJs('js/scores-controller.js');
}

function preferences() {
  $('#root').load('pages/preferences.html');
  reloadJs('js/preferences-controller.js');
}

$( document ).ready(function() {
  $('body').bootstrapMaterialDesign();
  if(localStorage.getItem('jwt')) {
    $('#login').hide();
    $('#signup').hide();
    $('#logout').show();
    $('#own').show();
  } else {
    $('#login').show();
    $('#signup').show();
    $('#logout').hide();
    $('#own').hide();
  }
  loadIndex();
});

function reloadJs(src) {
  $('script[src="' + src + '"]').remove();
  $('<script>').attr('src', src).appendTo('head');
}


$('a.links').click(function () {
  let id = $(this).attr('id');
  switch (id) {
    case 'game': loadGame(); break;
    case 'login': loadLogin(); break;
    case 'signup': signup(); break;
    case 'logout': logout(); break;
    case 'top': scores(true); break;
    case 'own': scores(false); break;
    case 'preferences': preferences(); break;
  }
});