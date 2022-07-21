$(document).ready(function(){
    $('#usernamevalidation').hide();
    $('#passwordvalidation').hide();
    $('#confirmpasswordvalidation').hide();
    $('#emailvalidation').hide();
    var Error = true;
    var password_error = true;
    var confirm_password_error = true;
    var email_error=true;

    $('#username').keyup(function(){
        username_validation();
    });
    function username_validation(){
        var username_val = $('#username').val();
        if(username_val.length == ''){
            $('#usernamevalidation').show();
            $('#usernamevalidation').html('Username cannot be empty');
            $('#usernamevalidation').css('color', 'red');
            Error = false;
            return false;
        }
        else{
          $('#usernamevalidation').hide();
        }
        if(username_val.length <4){
            $('#usernamevalidation').show();
            $('#usernamevalidation').html('Username should contain atleast 4 characters');
            $('#usernamevalidation').css('color', 'red');
            Error = false;
            return false;
        }
        else{
          $('#usernamevalidation').hide();
        }
    }
        // ----email validation----
    $('#email').keyup(function(){
        email_validation();
    });
    function email_validation(){
        var email_val = $('#email').val();
        if(email_val.length == ''){

            $('#emailvalidation').show();
            $('#emailvalidation').html('Email cannot be empty');
            $('#emailvalidation').css('color', 'red');

            email_error = false;
            return false;
        }
        else{
            email_error = true;
            $('#emailvalidation').hide();
        }
        if(!email_val.match(/^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/)){
            $('#emailvalidation').show();
            $('#emailvalidation').html('Email must be in a valid format.');
            $('#emailvalidation').css('color', 'red');

            email_error = false;
            return false;
        }
        else{
            email_error = true;
            $('#emailvalidation').hide();
        }
    }

    $('#password').keyup(function(){
        password_validation();
    });
    function password_validation(){
        var password1 = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        var password_val = $('#password').val();
        if(password_val.length<7){
            $('#passwordvalidation').show();
            $('#passwordvalidation').html('Password should contain atleast 8 characters');
            $('#passwordvalidation').css('color', 'red');
            password_error = false;
            return false;
        }
        else{
          $('#passwordvalidation').hide();
        }
        if(!password1.test(password_val)){
            $('#passwordvalidation').show();
            $('#passwordvalidation').html('Password should contain a small character,a number,a special character and a large character');
            $('#passwordvalidation').css('color', 'red');
            password_error = false;
            return false;
        }
        else{
          $('#passwordvalidation').hide();
        }

    }
    $('#confirmpassword').keyup(function(){
        confirm_password();
    });
    function confirm_password(){
      var confirm_password_val=$('#confirmpassword').val();
      var password_val = $('#password').val();
      if(password_val!=confirm_password_val){
        $('#confirmpasswordvalidation').show();
        $('#confirmpasswordvalidation').html('Password did not match');
        $('#confirmpasswordvalidation').css('color','red');
        confirm_password_error=false;
        return false;
      }
      else{
        $('#confirmpasswordvalidation').hide();
      }
    }

    $('#submitValidation').click(function(){
      username_validation();
      password_validation();
      confirm_password();
      if(Error==true && password_error==true && confirm_password_error==true){
        return true;
      }
      else{
        return false;
      }

    });


});
