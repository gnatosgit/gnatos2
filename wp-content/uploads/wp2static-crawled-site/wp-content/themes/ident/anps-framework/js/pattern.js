'use strict';

jQuery(document).ready(function ($) {
	$('.admin-pattern-item').on('click', function(e) {
        e.preventDefault();

		$('.admin-patern-radio input').eq($(this).index()).click();

        $(".selected-pattern").removeClass('selected-pattern');
		$(this).addClass('selected-pattern');

		if ($(this).index() === 0) {
			$("#patern-type-wrapper, #custom-patern-wrapper").show();
		} else {
			$("#patern-type-wrapper, #custom-patern-wrapper").hide();
		}

        return false;
	});

    /* Pattern change */
    $('.admin-patern-select, #patern-type-wrapper').on('click', function(){
        anps_pattern_color_visibility()
    });

    /* Toggle */
    $('#anps_is_boxed').on('click', function(){
        anps_boxed_toggle()
    });

    anps_boxed_toggle();

    function anps_pattern_color_visibility() {
        if ($('.admin-patern-item:first-child').hasClass('selected-pattern')) {
            if ($('#back-type-custom-color').is(':checked')) {
                $('#custom-background-color-wrapper').show();
                $('#custom-patern-wrapper').hide();
            } else {
                $('#custom-background-color-wrapper').hide();
                $('#custom-patern-wrapper').show();
            } 
        } else  {
            $('#custom-patern-wrapper, #custom-background-color-wrapper').hide();
        }
    }

    function anps_boxed_toggle() {
        if ($('#anps_is_boxed').is(':checked')) {
            $('.boxed-wrapper').show();
            anps_pattern_color_visibility()
        } else  {
            $('.boxed-wrapper').hide();
        }
    }
});
