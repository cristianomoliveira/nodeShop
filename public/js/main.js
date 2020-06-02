$(function(){
   
    
    alert('oi');
    
    if($('textarea#ta').length){
        CKEDITOR.replace('ta');
    }

    $('a.confirmDeletion').on('click', function () {
        if (!confirm('Confirma apagar?'))
            return false;
    });

});