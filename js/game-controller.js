time = localStorage.getItem("time");
tokens = localStorage.getItem("tokens");
matches = tokens / 2;

$(document).ready(function() {

  for (let i=0; i<matches; i++) {
    randoms.push(
      cards[
        Math.floor(Math.random() * (cards.length-1 + 1))
      ],
    );
  }
  randoms = [...randoms, ...randoms]
  randoms = randoms.sort(() => Math.random() - 0.5);

  let str = "<div class='row'>";
  for (let i=0; i<tokens; i++) {
    str += `<div class="col-md-2">
                <img id=${i} class="cardImg cardActive" src="./images/${back}">
            </div>`;
  }
  str += "</div>"
  document.getElementById('boardgame').innerHTML = str;

  $('#time_left').html(secondsToMinutes(time));
  clearInterval(interval);
  interval = setInterval(function () {
    time = time-1;
    if(time >= 0) {
      $('#time_left').html(secondsToMinutes(time));
    } else {
      points = points + getPunctuation();
      showNotification();
      clearInterval(interval);
    }
  }, 1000);

});

$(document).on('click','.cardActive',function(e) {

  let id = e.target.id;
  let _id = "#" + e.target.id;

  if (first_selection && second_selection) {
    console.log("En este momento se encuentran 2 cartas seleccionadas");
    return;
  } else if (!first_selection) {
    first_selection = this;
    $(_id).attr('src', "./images/"+randoms[id]);
  } else if (Number(first_selection.id)===Number(id)) {
    console.log("Has seleccionado la misma carta");
    return;
  } else if (!second_selection) {
    second_selection = this;
    $(_id).attr('src', "./images/"+randoms[id]);
  }

  let first_selection_id = first_selection.id;
  let _first_selection_id = '#'+first_selection_id;

  let second_selection_id = second_selection ? second_selection.id : null;
  let _second_selection_id = second_selection ? '#'+second_selection_id : null;

  if(second_selection) {
    if(first_selection.src.localeCompare(second_selection.src)===0) {
      matches = matches - 1;
      points = points + 15;
      $(_first_selection_id).removeClass('cardActive');
      $(_second_selection_id).removeClass('cardActive');
      first_selection = null;
      second_selection = null;
    } else {
      points = points - 5;
      setTimeout(function() {
        $(_first_selection_id).attr('src', "./images/" + back);
        $(_second_selection_id).attr('src', "./images/" + back);
        first_selection = null;
        second_selection = null;
      }, 700);
    }
    $('#points').html(points);

    if(matches <= 0) {
      points = points + getPunctuation()

      if(localStorage.getItem("jwt")) {
        createRecord({
          punctuation:  points + getPunctuation(),
          cards: tokens,
          disposedTime: time,
        });
      }
      showNotification();
    }
  }
});

function getPunctuation() {

  let total = 0;
  console.log({ tokens, time });
  if( Number(tokens) === 26 ) {
    total = total + 25;
  } else if( Number(tokens) === 32 ) {
    total = total + 50;
  }

  switch (Number(localStorage.getItem("time"))) {
    case 60:
      total = total + 100;
      break;
    case 90:
      total = total + 75;
      break;
    case 120:
      total = total + 50;
      break;
    case 150:
      total = total + 25;
      break;
  }
  return total;
}

function secondsToMinutes(seconds) {
  return `${Math.trunc(seconds/60)}:${seconds%60}`
}

function showNotification () {
  Swal.fire({
    title: '¡Juego finalizado!',
    text: 'Tu puntaje es: ' + points,
    showCancelButton: true,
    confirmButtonText: 'OK',
  }).then( function () {
    location.reload();
  })
}







