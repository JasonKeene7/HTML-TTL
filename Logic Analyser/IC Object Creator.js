var get_name = document.getElementById("create_name");
var get_inversion = document.getElementById("create_inversion");
var get_inputs = document.getElementById("create_inputs");
var get_gateDelay = document.getElementById("create_gateDelay");
var get_logicStart = document.getElementById("create_startLogic");
var get_logicalHIGH = document.getElementById("logical_H");
var get_logicalLOW = document.getElementById("logical_L");
var logic_functionStorage = document.getElementById('function_selection');

var select_element = document.getElementById("edit_IC");
var edit_box = document.getElementById("editor_container");

var logic_label = 0;
function initialization()
{
	logic_label = 0;
}

function IC_objectCreator()
{
	var name_taken = false;
	
	//Checks if logic_lines is empty and if line is not named
	if (logic_lines.length == 0 && get_name.value.trim() == "")
	{
		name_taken = true;
		get_name.style.backgroundColor = "hsla(204,100%,50%,0.5)";
		get_name.value = "";
		get_name.placeholder = "Please enter a name";
	}
	
	else
	{
		/*For loop checks if the name of the line is already taken or there is no 
			name or is only whiteSpace. If any of these are true, then the user
			will be notified.
		*/
		for (var x = 0; x < logic_lines.length; x++)
		{
			//Checks if the name is already taken
			if (get_name.value == logic_lines[x].name)
			{
					name_taken = true;
					get_name.style.backgroundColor = "hsla(0,100%,50%,0.5)";
					get_name.value = "";
					get_name.placeholder = "Name already taken";
					break;
			}
			//Checks if fields is empty or has only whiteSpace
			if (get_name.value.trim() === "")
			{
					name_taken = true;
					get_name.style.backgroundColor = "hsla(204,100%,50%,0.5)";
					get_name.value = "";
					get_name.placeholder = "Please enter a name";
					break;
			}
		}

		//If nothing is wrong, a new logic object is created
		if (!name_taken)
		{
			get_name.style.backgroundColor = "white";
			//eval() is used to create multiple variables with different names
			eval('var IC'+ 
				logic_label+
				' = new IC_object();'
				);
			
			//The new logic object is added to logic_lines array
			logic_lines.push(eval("IC"+logic_label));
			IC_createFunction();
			load_names();
			reset_logicClock();
			get_logicStart.value = false;
			
			//logic_label counts up by one for next valid logic object
			logic_label++;
		}
	}
}

//IC_object holds the parameters for the new logic object
function IC_object()
{
	this.name = get_name.value;
	this.location = (logic_lines.length+1)*(logic_vary+logic_space);
	//Turns inverted input from a string to a boolean with eval()
	this.inverted = eval(get_inversion.value);
	//Function prepares array
	this.inputs = input_orderer(false);
	this.start = eval(get_logicStart.value);
	this.input_iter = 0;
	this.gateDelay = Number(get_gateDelay.value);
	this.gate_delayLevel = 0;
	this.prev_logic = 0;
	this.gate_signalChange = 0;
	this.gate_increment = 0;
	this.logic_output = [0,0,0,
			function()
			{
				return this[0]-this[1]*this[2];
			}];
	this.logic_change = [get_logicalHIGH.value, get_logicalLOW.value];
	this.logic_state = "LOW";
	this.logic_function = [0, logic_functionStorage.value];
}

//Converts inputs from string to a numerically ordered array
function input_orderer(edit_flag)
{
	if (edit_flag)
	{
		var input_array = edit_inputs.value.split(" ");
	}
	
	else
	{
		var input_array = get_inputs.value.split(" ");
	}
	var ordered_array = [];
	
	//Checks if array contains letters or unnecessary zeros
	for (var x = 0; x < input_array.length; x++)
	{
		var number_checker = Number(input_array[x]);
	
		if (!Number.isInteger(number_checker) || input_array[x] == 0)	
		{
			continue;
		}
		ordered_array.push(input_array[x]);
	}
	
	ordered_array = ordered_array.sort(function(a, b){return a - b});
	var pruned_array = [];
	
	/*For loop below checks if any duplicate numbers are present by comparing their position
		in the ordered_array to the first time the number is seen. If the location does not
		match, the number is skipped over, exluding it from pruned_array.
	*/
	for (var x = 0; x < ordered_array.length; x++)
	{
		var search_array = ordered_array[x].toString();
	
		if (ordered_array.indexOf(search_array) != x)	
		{
			continue;
		}
			pruned_array.push(ordered_array[x]);
	}
	return pruned_array;
}

function order_existingArray(IC_lineReorder)
{
	var reorder_line = logic_lines[IC_lineReorder];
	var reorder_array = reorder_line.inputs.sort(function(a, b){return a - b});
	var repruned_array = [];
	
	/*For loop chacks if any value is repeated by comparing its position to 
		the value's first appearance in the array
	*/
	for (var x = 0; x < reorder_array.length; x++)
	{
		var search_array = reorder_array[x];
		if (reorder_array.indexOf(search_array) != x)	
		{
			continue;
		}
		repruned_array.push(reorder_array[x]);
	}
	reorder_line.inputs = repruned_array;
}

function IC_createFunction()
{
	if (logic_lines[logic_label].logic_function[1] !== 'null')
	{
		logic_lines[logic_label].logic_function[0] = 1;
	}
	logic_functionStorage.value = 'null';
}

/*In order to load all the line names properly using createElement object,
	you need to leave the scope in which the create object is located.
	So the function below is used to call and exit the scope of the
	editor_nameLoader.
*/
function editor_nameLoaderIter()
{	
	select_element.innerHTML = '';	//Clears selection element
	
	//for loop used to call the name loader function
	for (var x = 0; x < logic_lines.length; x++)
	{
		editor_nameLoader(x);
	}
}

function editor_nameLoader(iter)
{
	
	var option_element = document.createElement("OPTION");		
	/*The create option element needs to be local to function to create 
		multiple option selectors
	Using the for loop iteration, the logic name and option value is loaded,
		then the option is loaded into the editor select element.
	*/
	option_element.innerHTML = logic_lines[iter].name;
	option_element.value = iter;
	select_element.appendChild(option_element);
}

function IC_editor()
{
	var edit_name = logic_lines[select_element.value].name;
	//edit_inptStr needs to be converted to a string first before string methods will work
	var edit_inputStr = logic_lines[select_element.value].inputs.toString();
	var edit_logicH = logic_lines[select_element.value].logic_change[0];
	var edit_logicL = logic_lines[select_element.value].logic_change[1];
	var edit_srtlogic = logic_lines[select_element.value].start;
	var edit_invert = logic_lines[select_element.value].inverted;
	var edit_gateDely = logic_lines[select_element.value].gateDelay;
	
	edit_box.innerHTML =
		'Name:<input id="edit_name" type="text" value=""><br>'							+
		'Inputs:<input id="edit_inputs" type="text" value=""><br>'						+
		'Logical HIGH:<input id="edit_logical_H" type="number" value="">%<br>'			+
		'Logical LOW:<input id="edit_logical_L" type="number" value="">%<br>'			+
		'Logic Start:<select id="edit_startLogic">'										+
				'<option value="false">LOW</option>'									+
				'<option value="true">HIGH</option>'									+
			'</select><br>'																+
		'Inversion:<select id="edit_inversion" value="true">'							+
				'<option value="false">false</option>'									+
				'<option value="true">true</option>'									+
			'</select><br>'																+
		'Gate Delay:<input id="edit_gateDelay" type="number" value=""><br>'				+
		'<button onclick="change_ICValues(select_element.value)">Save Changes</button>'	+
		'<button onclick="close_editBox()">Cancel</button>';
		
	document.getElementById("edit_name").value =
		edit_name;
	document.getElementById("edit_inputs").value =
		edit_inputStr.replace(",", " ");
	document.getElementById("edit_logical_H").value =
		edit_logicH;
	document.getElementById("edit_logical_L").value =
		edit_logicL;
	document.getElementById("edit_startLogic").value =
		edit_srtlogic;
	document.getElementById("edit_inversion").value =
		edit_invert;
	document.getElementById("edit_gateDelay").value =
		edit_gateDely;
}

function change_ICValues(edit_ICLine)
{
	var get_editName = document.getElementById("edit_name");
	var get_editInversion = document.getElementById("edit_inversion");
	var get_editInputs = document.getElementById("edit_inputs");
	var get_editGateDelay = document.getElementById("edit_gateDelay");
	var get_editLogicStart = document.getElementById("edit_startLogic");
	var EDIT = logic_lines[edit_ICLine];
	
	EDIT.name = get_editName.value;
	EDIT.inverted = eval(get_editInversion.value);
	EDIT.inputs = input_orderer(true);
	EDIT.start = eval(get_editLogicStart.value);
	EDIT.gateDelay = Number(get_editGateDelay.value);
	close_editBox()
	
	reset_logicClock();
	load_names();
}

function close_editBox()
{
	edit_box.innerHTML = "";
}
/*
document.getElementById("test").innerHTML =
	ordered_array.indexOf(search_array);
var new_inputs = {
		name:'CLK',		//Name of logic line
		location:15,		//Location of logic line on canvas
		inverted:false,		//Weather or not the signal is inverted
		/*Logic inputs. INPUTS MUST BE IN AN ARRAY!! Sort method
		*	numerically sorts the input values
		
		inputs:test_inputs.sort(function(a, b){return a - b}),
		start: true,		//Starting position of logic
		input_iter:0,		//Used to keep cycle through the inputs
		gateDelay:6,		//How long the signal takes to change from HIGH to LOW
		gate_delayLevel:0,		//Used to save logic location
		prev_logic:0,		//Used to save previous logic state
		gate_signalChange:0,		//Indicates if the logic goes LOW to HIGH of HIGH to LOW
		gate_increment: 0,		//Used to calculate height of logic level with a gate delay
		/*key: [not, flip, change, function]
		*	[draw_logic] saves the first three variables to use later in 
		*	calculating	the location of the previous and current logic.
		
		logic_output:[0,0,0,
			function ()
			{
				return this[0]-this[1]*this[2];
			}]
		this.logic_change = [get_logicalHIGH.value, get_logicalLOW.value];		//Stores values for signal hysteresis
		this.logic_state = "LOW";		//Holds what logic state the line has
		this.logic_function = [0, logic_functionStorage.value];		//Stores logic gate information
		};
*/