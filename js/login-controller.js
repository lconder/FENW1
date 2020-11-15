
$(document).on('submit','#form_login',async function(e) {

  let usernameLogin = $('#usernameLogin');
  let usernameHelp = $('#usernameHelpLogin');
  let passwordHelp = $('#passwordHelpLogin');
  let passwordLogin = $('#passwordLogin');

  e.preventDefault();

  let usernameTxt = usernameLogin.val(), passwordTxt = passwordLogin.val();

  if(usernameTxt.trim().length <= 0) {
    usernameHelp.text('Ingresa un correo válido');
    return;
  } else {
    usernameHelp.text('');
  }

  if(passwordTxt.trim().length <= 0) {
    passwordHelp.text('Ingresa una contraseña');
    return;
  } else {
    passwordHelp.text('');
  }
  let responseLogin = await loginUser({
    username: usernameTxt,
    password: passwordTxt,
  });

  if(!responseLogin) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error!',
    });
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Sesión iniciada',
    }).then( function () {
      location.reload();
    });
  }
});