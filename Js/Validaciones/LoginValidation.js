$(document).ready(function() {
    $('#signUpForm').validate({
        rules: {
            userInput: {
                required: true
            },
            passwordInput: {
                required: true
            }
        },
        messages: {
            userInput: {
                required: "Por favor ingrese el nombre de usuario"
            },
            passwordInput: {
                required: "Por favor ingrese la contraseña"
            }
        }
    });
});
