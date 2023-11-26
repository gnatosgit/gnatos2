if (jQuery('#anps-buttons').length) {
    window.state = JSON.parse(jQuery('#anps-buttons').val().replace(/\\/g, ''));

    /* Change state before main form submits */

    jQuery('form').on('submit', function() {
        jQuery('#anps-buttons').val(JSON.stringify(window.state));
    });

    /* Add number to the end of names (helper function) */

    function nameNumber(type) {
        var num = state.buttons.reduce(function (acc, cur) {
            return cur.type === type ? acc + 1 : acc;
        }, 0);

        if (num > 0) {
            return ' ' + (num + 1);
        }

        return '';
    }

    /* Options component */

    Vue.component('button-options', {
        props: {
            button: {
                type: Object,
            },
        },
        template: '#button-options',
    });

    /* Color component */

    Vue.component('button-color', {
        props: [
            'button', 'type', 'prop'
        ],
        mounted: function () {
            var that = this;
            setTimeout(function() {
                var el = jQuery(that.$refs['field']);
                el.ColorPicker({
                    onBeforeShow: function (foo, bar) {
                        el.ColorPickerSetColor(el.val());
                    },
                    onChange: function (hsb, hex, rgb) {
                        that.updateColor(hex);
                    },
                });
            }, 100);
        },
        computed: {
            color: function() {
                return this.button[this.type][this.prop];
            },
            stylePreview: function() {
                return {
                    backgroundColor: '#' + this.color,
                };
            },
        },
        methods: {
            focus: function(event) {
                jQuery(this.$refs.field).click().focus();
            },
            updateColor: function(val) {
                this.button[this.type][this.prop] = val;
            },
            changeColor: function(event) {
                this.button[this.type][this.prop] = event.target.value;
            },
        },
        template: '#button-color',
    });

    /* Add component */

    Vue.component('button-add', {
        methods: {
            add: function () {
                var newID = state.buttons[state.buttons.length - 1].id + 1;

                switch (this.$refs['type'].value) {
                    case 'normal': state.buttons.push({
                        name: 'Normal button' + nameNumber('normal'),
                        id: newID,
                        type: 'normal',
                        normalStyle: {
                            'background-color': '000',
                            'border-radius': '5',
                            'box-shadow': '',
                            'color': 'fff',
                        },
                        hoverStyle: {
                            'background-color': 'fff',
                            'color': '000',
                        },
                    }); break;
                    case 'gradient': state.buttons.push({
                        name: 'Gradient button' + nameNumber('gradient'),
                        id: newID,
                        type: 'gradient',
                        normalStyle: {
                            'color': 'fff',
                            'background-color-1': '000',
                            'background-color-2': '666',
                            'border-radius': '5',
                            'box-shadow': '',
                        },
                        hoverStyle: {
                        },
                    }); break;
                    case 'border': state.buttons.push({
                        name: 'Border button' + nameNumber('border'),
                        id: newID,
                        type: 'border',
                        normalStyle: {
                            'color': '666',
                            'background-color': '',
                            'border-color': '666',
                            'border-radius': '5',
                            'border-width': '2',
                        },
                        hoverStyle: {
                            'background-color': '',
                            'border-color': '000',
                            'color': '000',
                        },
                    }); break;
                    case 'text': state.buttons.push({
                        name: 'Text button' + nameNumber('text'),
                        id: newID,
                        type: 'text',
                        normalStyle: {
                            'color': '666',
                        },
                        hoverStyle: {
                            'color': '000',
                        },
                    }); break;
                }
            },
        },
        template: '#button-add',
    });

    /* Default button component */

    Vue.component('button-default', {
        props: {
            button: {
                type: Object,
            },
        },
        computed: {
            id: function() {
                return 'button-default-' + this.button.id;
            }
        },
        methods: {
            setDefault: function() {
                state.defaultButton = this.button.id;
            },
        },
        template: '#button-default',
    });

    /* Secondary button component */

    Vue.component('button-secondary', {
        props: {
            button: {
                type: Object,
            },
        },
        computed: {
            id: function () {
                return 'button-secondary-' + this.button.id;
            }
        },
        methods: {
            setSecondary: function () {
                state.secondaryButton = this.button.id;
            },
        },
        template: '#button-secondary',
    });

    /* Menu button component */

    Vue.component('button-menu', {
        props: {
            button: {
                type: Object,
            },
        },
        computed: {
            id: function () {
                return 'button-menu-' + this.button.id;
            }
        },
        methods: {
            setMenu: function () {
                state.menuButton = this.button.id;
            },
        },
        template: '#button-menu',
    });

    /* Name component */

    Vue.component('button-name', {
        data: function () {
            return {
                canEdit: false,
                isEditing: false,
            };
        },
        props: {
            button: {
                type: Object,
            }
        },
        methods: {
            allowEdit: function () {
                this.canEdit = true;
            },
            startEditing: function () {
                this.isEditing = true;
            },
            stopEditing: function () {
                this.isEditing = false;
            },
            disableEdit: function () {
                this.canEdit = false;
            },
        },
        template: '#button-name',
    });

    /* Remove component */

    Vue.component('button-remove', {
        props: {
            button: {
                type: Object,
            },
        },
        methods: {
            remove: function (event) {
                var id = this.button.id;

                state.buttons.forEach(function(btn, index) {
                    if (btn.id === id) {
                        state.buttons.splice(index, 1);
                    }
                });

                if (id === state.defaultButton) {
                    state.defaultButton = state.buttons[0].id;
                }
            },
        },
        template: '#button-remove',
    });

    /* Preview component */

    Vue.component('button-preview', {
        data: function () {
            return {
                state: 'normal',
            };
        },
        props: {
            normalStyle: {
                type: Object,
            },
            hoverStyle: {
                type: Object,
            },
            type: {
                type: String,
            },
            shadow: {
                type: String,
            },
        },
        computed: {
            styleAttr: function () {
                var style = JSON.parse(JSON.stringify(this.normalStyle));
                var styleHover = JSON.parse(JSON.stringify(this.hoverStyle));

                for (prop in style) {
                    if (prop.toLowerCase().indexOf('color') > -1) {
                        if (style[prop] === '') {
                            style[prop] = 'transparent';
                        } else {
                            style[prop] = '#' + style[prop];
                        }
                    } else if (prop === 'border-width' || prop === 'border-radius') {
                        style[prop] += 'px';
                    }
                }

                for (prop in styleHover) {
                    if (prop.toLowerCase().indexOf('color') > -1) {
                        if (styleHover[prop] === '') {
                            styleHover[prop] = '#' + styleHover[prop];
                        } else {
                            styleHover[prop] = '#' + styleHover[prop];
                        }
                    } else if (prop === 'border-width' || prop === 'border-radius') {
                        style[prop] += 'px';
                    }
                }

                if (this.state === 'hover') {
                    style = Object.assign(style, styleHover);
                }

                if (this.type === 'gradient') {
                    style.backgroundImage = 'linear-gradient(to right, ' + style['background-color-1'] + ', ' + style['background-color-2'] + ')';
                    delete style['background-color-1'];
                    delete style['background-color-2'];
                }

                if (style['box-shadow']) {
                    style['box-shadow'] = '0 10px 25px 0 #' + style['box-shadow'];
                }

                return style;
            },
            classAttr: function () {
                return {
                    'anps-btn': true,
                    'anps-btn--md': true,
                    ['anps-btn--' + this.type]: true,
                };
            },
        },
        methods: {
            changeState(state) {
                this.state = state;
            },
        },
        template: '#button-preview',
    });

    /* Initiate app */

    var app = new Vue({
        el: '#button-maker',
        data: {
            buttons: state.buttons,
            state: state,
        },
    });
}
