'use strict';

jQuery(function($) {
    $('.anps-ajax-load').on('click', function(){
        var button = $(this);
        $.ajax({         
            url: anps_load.ajaxurl,
            type: "post",          
            data: {
                action: 'anps_load_more',
                current_page : anps_load.anps_current_page
            },
            success: function (data) {
                if(data) {
                    $('.anps-ajax-blog').append(data);
                    anps_load.anps_current_page++;

                    if(anps_load.anps_current_page == anps_load.anps_max_pages) {
                        button.remove();
                    }
                } else {
                    button.remove();
                }
            }
        });
    }); 
});