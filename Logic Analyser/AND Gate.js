//AND Gate

//AND_array stores information for multiple AND gates
var AND_array = [];
//Stores function and function parameters in a hidden text bar 
var store_function = document.getElementById('function_selection');

function ANDgate(AND_line, time)
{
	var AND_currentLine;
	var AND_logicOutput;
	var AND_findLL;
	
	/*For loop below searches AND_array for the line called, then stores the name to 
		use later.
	*/
	for (var AND_lineFinder = 0; AND_lineFinder < AND_array.length; AND_lineFinder++)
	{
		if (AND_line == AND_array[AND_lineFinder].name)
		{
			AND_currentLine = AND_array[AND_lineFinder];
			break;
		}
	}
	
	/*For loop finds the logic_line the name belongs to and stores the logic state
		the line is currently in.
	*/
	for (var LL_index = 0; LL_index < logic_lines.length; LL_index++)
	{
		if (logic_lines[LL_index].name == AND_line)
		{
			AND_findLL = 'logic_lines[' + LL_index + ']';
			AND_currentLine.prevlogic = eval(AND_findLL).logic_state;
			break;
		}
	}
	
	/*For loop checks if each input line is HIGH If not, the logic state of the gate is
		set to LOW and the for lop is immediately exited.
	*/
	for (var AND_inputIter = 0; AND_inputIter < AND_currentLine.inputs.length; AND_inputIter++)
	{
		AND_logicOutput = 'HIGH';
		if (eval(AND_currentLine.inputs[AND_inputIter]).logic_state == 'LOW')
		{
			AND_logicOutput = 'LOW';
			break;
		}
	}
	
	/*If statement checks if the logic state of the line changed. If so, the current time
		is stored into the current line's inputs
	*/
	if (AND_logicOutput != AND_currentLine.prevlogic)
	{
		//If statement checks if the gate has delay or has already stabilized
		if (eval(AND_findLL).gateDelay != 0 &&
			eval(AND_findLL).gate_delayLevel != 0 &&
			eval(AND_findLL).gate_delayLevel != logic_vary)
		{
			/*If statement checks if:
				The signal is decreasing and the gate needs to change into a HIGH
				The Signal is increasing and the gate needs to change into a LOW
			If any of these parameters are true, the current time is added to the inputs 
				array of the gate
			*/
			if((AND_currentLine.prev_gateInc > eval(AND_findLL).gate_delayLevel &&
				AND_logicOutput == 'HIGH') ||
				(AND_currentLine.prev_gateInc < eval(AND_findLL).gate_delayLevel &&
				AND_logicOutput == 'LOW'))
			{
				eval(AND_findLL).inputs.push(time);
				order_existingArray(LL_index);
			}
		}
		
		//Adds an input into the gate's inputs array if if statement isn't true
		else
		{
			document.getElementById('test').innerHTML = 'Gate has an input!';
			eval(AND_findLL).inputs.push(time);
			order_existingArray(LL_index);
		}
		AND_currentLine.prev_gateInc = eval(AND_findLL).gate_increment;
	}
}

function ANDgate_setup()
{
	//A table is creates to display all the inputs available to the gate with a confirm button
	var table_inputs = "<table><tr><th>AND</th></tr>";
	for (var table_count = 0; table_count < logic_lines.length; table_count++)
	{
		table_inputs += "<tr><td class='inputTable'>"	+
			logic_lines[table_count].name				+
			"</tr></td>";
	}
	table_inputs += "</table>"							+
	"<button id='createObject'>Finish Gate</button>"	+
	"<button id='cancelGate'>Cancel</button>";
	
	document.getElementById('moreLogic').innerHTML = table_inputs;
	
	$(document).ready(function()
	{
		/*When selecting gate inputs, clicking on text toggles class to indicate 
			selection and to find its location in logic_lines[].
		*/
		$(".inputTable").click(function()
		{
			$(this).toggleClass("selected_input");
		});
		
		$("#createObject").click(function()
		{
			// IC_nameLF grabs name from name text box
			var IC_nameLF = document.getElementById('create_name').value;
			
			//Gets the amount of names with 'selected_input' class
			var AND_classCounter = document.getElementsByClassName('selected_input');
			
			//Used to store gate name and input location for gate
			var AND_inputObject = {name: IC_nameLF, inputs:[], prevlogic: '', prev_gateInc: 0};
			
			/*Two for loops are used to get the name for each table element with the selected_input class
				and finds the logic line the name matches with.
			*/
			for (var iter_classCounter = 0; iter_classCounter < AND_classCounter.length; iter_classCounter++)
			{
				for (var LL_index = 0; LL_index < logic_lines.length; LL_index++)
				{
					/*When the line is found, the if statement stores the name into the inputs and breaks for loop
						for (hopefully) efficient processing.
					*/
					if (logic_lines[LL_index].name == AND_classCounter[iter_classCounter].innerHTML)
					{
						AND_inputObject.inputs.push('logic_lines['+ LL_index +']');
						break;
					}
				}
			}
			
			//Stores all accumulated information into AND_array
			AND_array.push(AND_inputObject);
			
			//Storing the function as a text prevents calling when creating the function
			store_function.value = 'ANDgate("' + IC_nameLF + '", logic_timing)';
			document.getElementById('moreLogic').innerHTML = "";
		});
		$("#cancelGate").click(function()
		{
			document.getElementById('moreLogic').innerHTML = "";
		})
	});
}