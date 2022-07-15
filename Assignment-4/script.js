let k = true;

$(document).ready(function(){

    $('.clicks').on('click', function(){
        if(k){
            $('#box').addClass('show');
            k = false;
        }
        else{
            $('#box').removeClass('show');
            k = true;
        }
    });

    $('.submission').on('click', function(){
        $('#box').removeClass('show');
        k = true;
    });

    $('.close_popup').on('click', function(){
        $('#box').removeClass('show');
        k = true;
    });

});