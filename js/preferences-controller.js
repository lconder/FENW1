
$( document ).ready(function() {

  time = localStorage.getItem('time');

  $("#success").hide();
  $("#tokens").val(tokens);
  $("#time").val(time);

  $("#form_preferences").submit( function(e) {

    localStorage.setItem('tokens', $("select#tokens").val());
    localStorage.setItem('time', $("select#time").val());

    $("#success").slideDown("slow");

    setTimeout(function () {
      $("#success").slideUp("slow");
    }, 700);
    e.preventDefault();

  });
});
