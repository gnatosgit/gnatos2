'use strict';

jQuery(function($) {
    $('[data-tags]').each(function() {
        var $el = $(this);

        $el.selectize({
            plugins: ['remove_button', 'drag_drop'],
            persist: false,
            delimiter: ',',
            maxItems: $el.data('max-items'),
            create: function (input) {
                return {
                    value: input,
                    text: input
                }
            },
            onChange: function () {
                $('.vc_edit-form-tab select, .vc_edit-form-tab input').trigger('change');
            },
        });
    });
});
