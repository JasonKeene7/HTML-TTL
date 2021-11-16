var sample_id;
var slider_id;
var HIGH_color;
var LOW_color

var get_sliderColor;

function line_color()
{
	if (logic_lines[0].logic_state == "HIGH")
	{
		logic.strokeStyle = HIGH_color;
	}
	else
	{
		logic.strokeStyle = LOW_color;
	}
}

function line_colorCheck()
{
	if (document.getElementById("line_color").value == "color")
	{
		document.getElementById("line_color").value = "no-color";
	}
	else
	{
		document.getElementById("line_color").value = "color";
		line_colorLoader(1);
		line_colorLoader(2);
	}
	logic.beginPath();
}

function line_colorLoader(id_number)
{
	sample_id = "cbox" + id_number;
	slider_id = "color_slider" + id_number;
	
	get_sliderColor = document.getElementById(slider_id);
	store_color = "hsl(" + get_sliderColor.value + ", 100%, 50%)";
	
	show_sliderColor = document.getElementById(sample_id);
	
	show_sliderColor.style.backgroundColor = store_color;
		
	if (id_number == 1)
	{
		HIGH_color = store_color;
	}
	else if (id_number == 2)
	{
		LOW_color = store_color;
	}
}