

$(document).ready(function(){
	alert('Called YO!!');
	$("#sortable1").sortable({
		update: function (event, ui) {
	        //alert('Hey Marc');
	        var outVal = "";
	        // Loop through draggable values
	        $("#sortable1 li>span").each(function (i, el) {
	            //alert($(el).html())
	            outVal += $(el).html() + "^";
	        });

	        //dragUserValue = outVal;
			$("#sortableAnswer").val(outVal);
		}
	});

});

