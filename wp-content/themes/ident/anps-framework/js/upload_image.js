jQuery(document).ready(function($) {
    var formfield;

    jQuery('.upload_image_button').on('click', function() {
        $('html').addClass('Image');
        formfield = $(this).prev().attr('name');
        tb_show('', 'media-upload.php?type=image&TB_iframe=true');
        return false;
    });

    window.original_send_to_editor = window.send_to_editor;
    window.send_to_editor = function(html) {
        if (formfield) {
            fileurl = $('img','<div>' + html + '</div>').attr('src');
            $('#'+formfield).val(fileurl);
            $('#'+formfield).change();
            tb_remove();
            $('html').removeClass('Image');
            formfield = '';
        } else {
            window.original_send_to_editor(html);
        }
    };
});
