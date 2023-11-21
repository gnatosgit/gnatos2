'use strict';

!function ($) {
    var screenLarge = 1200,
        screenMedium = 992,
        screenSmall = 768;

    function buttonClick() {
        var $el = $(this).parents('.anps-input');
        var items = $el.find('.anps-input__hidden').val().split('|');

        $el.find('.anps-input__item--active').removeClass('anps-input__item--active');
        $(this).parent().addClass('anps-input__item--active');

        $el.find('.anps-input__active').html($(this).html());

        $el.find('.anps-input__field').val(items[$el.find('.anps-input__item--active').index()]);

        $(this).blur();
    }

    $('.anps-input__button').on('click', function () {
        buttonClick.call(this);
    });

    $('.anps-input__active').on('click', function () {
        $(this).parent().toggleClass('anps-input__select--active');
    });

    $('.anps-input__field').on('input', function () {
        var $el = $(this).parents('.anps-input');
        var inputVal = $el.find('.anps-input__hidden').val();

        if (inputVal === '') {
            inputVal = '|||';
        }

        var items = inputVal.split('|');

        items[$el.find('.anps-input__item--active').index()] = $(this).val();

        $el.find('.anps-input__hidden').val(items.join('|'));
        $el.find('.anps-input__hidden').trigger('keydown');
    });

    function changeState() {
        var index = 0;
        var width = $('#vc_inline-frame').width();

        if (width >= screenLarge) {
            index = 3;
        } else if (width >= screenMedium) {
            index = 2;
        } else if (width >= screenSmall) {
            index = 1;
        }

        $('.anps-input').each(function () {
            buttonClick.call($(this).find('.anps-input__item').eq(index).find('button').get(0));
        });
    }

    $(window).on('resize', changeState);

    $('.vc_screen-width').on('click', function () {
        setTimeout(changeState, 100);
    });
}(window.jQuery);
