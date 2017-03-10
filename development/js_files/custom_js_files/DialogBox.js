$(document).ready(function(){
	var food_table = $('.food-table');
	if(food_table.length>0){
		food_table.find('.row:not(:first) .cell:not(:first-of-type)').on('dblclick',function(event) {
			var dialog =$('.dialog-box');
			dialog.empty();
			// Create Dialog box and append to ".dialog-box"
			$('<div class="dialog"></div>').appendTo('.dialog-box');
			// Add headline to .dialog
			$('<h3 class="headline">عملیات رزرو غذا</h3>').appendTo('.dialog');
			// Start to create food detail table
			$('<table  class="reservation-table"><tbody></tbody></table>')
				.appendTo('.dialog');
				//food detail table first row
			var td = $('<td></td>')
			var select =$('<select name="food_selection" id="food_selection"></select>')
				.append('<option value="0" data-value="default" >غذا را انتخاب کنید...</option>')
				.append('<option value="1">زرش پلو با مرغ</option>')
				.append('<option value="2">کشمش پلو</option>');
			td.append(select);
			$('<tr></tr>')	.append('<td><i class="material-icons">restaurant</i></td>')
					.append(td)
					.appendTo('.dialog .reservation-table tbody');
			select.dropdown();

				// food detail table second row
			$('<tr></tr>')	.append('<td><i class="material-icons">local_atm</i></td>')
					.append('<td class="cost">۱۲۰۰۰ </td>')
					.appendTo('.dialog .reservation-table tbody');

				// food detail table third row
			var self=$("<td></td>").append(
				$('<select name="self-place" id="self-place"></select>')
					.append(
						$('<option value="1">سلف مرکزی</option>')
					)
					.append(
						$('<option value="0" selected>سلف را انتخاب کنید</option>')
					)
					
			)
			$('<tr></tr>')	.append('<td><i class="material-icons">place</i></td>')
					.append(self)
					.appendTo('.dialog .reservation-table tbody');
			self.find('select').dropdown();
				// food detail table forth row
			$('<tr></tr>')	.append('<td><i class="material-icons">plus_one</i></td>')
					.append('<td class="count"> <input type="text" class="count input-field" value="1"> </td>')
					.appendTo('.dialog .reservation-table tbody');
			$('.dialog .reservation-table .count').keydown(inc_dec_food_count);

			$('<div class="buttons"></div>')
				.append('<div class="btn confirm">تأیید <i class="material-icons">done</i> </div>')
				.append('<div class="btn cancel">انصراف<i class="material-icons">window_close</i> </div>').appendTo('.dialog');
			var box = dialog.find('.dialog');
			dialog.fadeIn(200);
			box.show(100);
			box.animate({marginTop: "+=20px"});
			dialog.on('click',function(e) {
				if(!e.isPropagationStopped())
					e.stopPropagation();
			});
			box.find('.cancel').on('click',function(){
				box.animate({marginTop: "-=30px"},100).fadeOut(200);
				dialog.fadeOut(200,function(){
					$(this).empty();
				})
			})
			
		});
	}
})


// this function detect keypressed code and increase or decrease the value of input box 
function inc_dec_food_count(e){
	// e.preventDefault(); // prevent the default action (scroll / move caret)
    e.stopPropagation();
	switch(e.which) {
		case 39:
        case 38: // up
        $(this).val(parseInt($(this).val())+1);
        break;
        case 40: // down
        case 37: // down
        if ($(this).val()>1)
        	$(this).val(parseInt($(this).val())-1);
        break;
        default: return; // exit this handler for other keys
    }

}