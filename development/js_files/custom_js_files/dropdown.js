(function($) {

    $.fn.dropdown = function(param) {
        return $(this).each(function(){
            setting = $.extend({
                color: 'green',
                backgroundColor: 'yellow'
            }, param)

            var default_opt = $(this).find('option[value="0"]')
            var options = $(this).find('option').not('[value="0"]');
            $(this).after('<div class="select-input"><span></span></div>');
            var select_input = $(this).next('.select-input').find('span');
            // start to form .selected-item-name tag to append
            var selected_item_name = $("<section class='selected-item-name'></section>")
                .append('<label for="food-name" ></label>')
                .append('<i class="material-icons">keyboard_arrow_down</i>');
            selected_item_name.find('label')
            .append(default_opt.html())
            .attr('data-key', default_opt.attr('value'));

            selected_item_name.on('click', dropdown_box_click_to_show_menu)
            //end of formimg selected_item_name tag]

            select_input.append(selected_item_name);

            // start to form .select-items tag to append
            var select_items = $('<div class="select-items"></div>')
                .append(function() {
                    var ul = $('<ul></ul>')
                    ul.append(
                        $('<li class="default"></li>')
                        .html(
                            $(default_opt)
                            .html()
                        ).attr('data-value', $(default_opt).val())
                    );

                    options.each(function(a, b) {
                        ul.append(
                            $('<li></li>')
                            .html(
                                $(b).html()
                            )
                            .attr('data-value', $(b).val())
                        );
                    });
                    ul.find('li').on('click', dropdown_item_click_event);
                    return ul;
                })
                // end of forming .select-items tag

            select_input.append(select_items);
        })

    };

    function dropdown_item_click_event(e,b) {
    	e.stopPropagation();
        $(this).parents('.select-items').prev('.selected-item-name').find('>label').html($(e.target).html()).attr('data-key', $(e.target).data('value'))
        $(this).parents('.select-items').fadeOut(100);
    }

    function dropdown_box_click_to_show_menu() {
        $(this).next('.select-items').fadeIn(100)
    }
}(jQuery));
