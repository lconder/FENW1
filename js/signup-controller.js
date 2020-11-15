

$(document).on('submit','#form_signup',function(e) {

  e.preventDefault();

  let emailSignUp = $('#emailSignUp');
  let emailHelpSignUp = $('#emailHelpSignUp');
  let passwordHelpSignUp = $('#passwordHelpSignUp');
  let passwordSignUp = $('#passwordSignUp');
  let usernameHelpSignUp = $('#usernameHelpSignUp');
  let usernameSignUp = $('#usernameSignUp');

    console.log({
      email: emailSignUp.val(),
      username: usernameSignUp.val(),
      password: passwordSignUp.val()
    })

  let emailTxt = emailSignUp.val() || '';
  let passwordTxt = passwordSignUp.val() || '';
  let usernameTxt = usernameSignUp.val() || '';

  if(usernameTxt.trim().length <= 0) {
    usernameHelpSignUp.text('Ingresa un nombre de usuario');
    return;
  } else {
    usernameHelpSignUp.text('');
  }

  if(emailTxt.trim().length <= 0) {
    emailHelpSignUp.text('Ingresa un correo válido');
    return;
  } else {
    emailHelpSignUp.text('');
  }

  if(passwordTxt.trim().length <= 0) {
    passwordHelpSignUp.text('Ingresa una contraseña');
    return;
  } else {
    passwordHelpSignUp.text('');
  }

  return registerUser({
    username: usernameTxt,
    email: emailTxt,
    password: passwordTxt,
  });
});