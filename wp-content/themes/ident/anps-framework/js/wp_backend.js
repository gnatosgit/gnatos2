"use strict";
jQuery(document).ready(function($) {
	$('.showhide').hide();
	if ($('.hideall-trigger').is(':checked')) {
		$('.hideall').hide();
	}
	if ($('.showhide-trigger').is(':checked')) {
		$('.showhide').show();
	}

	$('.showhide-trigger').on('click', showHide);

	function showHide() {
		if ($('.showhide-trigger').is(':checked')) {
			$('.showhide').show();
			$('.hideshow').hide();
		}
		else {
			$('.showhide').hide();
			$('.hideshow').show();
		}
	}

	showHide();

	$('.hideall-trigger').on('click', function () {
		if ($('.showhide-trigger').is(':checked')) {
			$('.showhide-trigger').prop('checked', false);
		}
		if ($('.hideall-trigger').is(':checked')) {
			$('.hideall').hide();
		}  else {
			$('.hideall').show();
			$('.showhide').hide();
		}
	});

    /* Hide Google Maps notice */

    $('.anps-notice .notice-dismiss').on('click', function () {
        $.post(
            anps.ajaxurl,
            {
                'action': 'anps_dismiss_notice',
            }
        );
	});

	$('.anps-admin .row .row label').matchHeight();
});
