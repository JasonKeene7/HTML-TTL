//OR
var OR_array = [];
//var store_function = document.getElementById('function_selection');

function ORgate(OR_line, time)
{
	var OR_currentLine;
	var OR_logicOutput;
	var OR_findLL;
	
	/*For loop below searches OR_array for the line called, then stores the name to 
		use later.
	*/
	for (var OR_lineFinder = 0; OR_lineFinder < OR_array.length; OR_lineFinder++)
	{
		if (OR_line == OR_array[OR_lineFinder].name)
		{
			OR_currentLine = OR_array[OR_lineFinder];
			break;
		}
	}
	
	/*For loop finds the logic_line the name belongs to and stores the logic state
		the line is currently in.
	*/
	for (var LL_index = 0; LL_index < logic_lines.length; LL_index++)
	{
		if (logic_lines[LL_index].name == OR_line)
		{
			OR_findLL = 'logic_lines[' + LL_index + ']';
			OR_currentLine.prevlogic = eval(OR_findLL).logic_state;
			break;
		}
	}
	
	/*For loop checks if each input line is HIGH If not, the logic state of the gate is
		set to LOW and the for lop is immediately exited.
	*/
	for (var OR_inputIter = 0; OR_inputIter < OR_currentLine.inputs.length; OR_inputIter++)
	{
		OR_logicOutput = 'LOW';
		if (eval(OR_currentLine.inputs[OR_inputIter]).logic_state == 'HIGH')
		{
			OR_logicOutput = 'HIGH';
			break;
		}
	}
	
	/*If statement checks if the logic state of the line changed. If so, the current time
		is stored into the current line's inputs
	*/
	if (OR_logicOutput != OR_currentLine.prevlogic)
	{
		//If statement checks if the gate has delay or has already stabilized
		if (eval(OR_findLL).gateDelay != 0 &&
			eval(OR_findLL).gate_delayLevel != 0 &&
			eval(OR_findLL).gate_delayLevel != logic_vary)
		{
			/*If statement checks if:
				The signal is decreasing and the gate needs to change into a HIGH
				The Signal is increasing and the gate needs to change into a LOW
			If any of these parameters are true, the current time is added to the inputs 
				array of the gate
			*/
			if((OR_currentLine.prev_gateInc > eval(OR_findLL).gate_delayLevel &&
				OR_logicOutput == 'HIGH') ||
				(OR_currentLine.prev_gateInc < eval(OR_findLL).gate_delayLevel &&
				OR_logicOutput == 'LOW'))
			{
				eval(OR_findLL).inputs.push(time);
				order_existingArray(LL_index);
			}
		}
		
		//Adds an input into the gate's inputs array if if statement isn't true
		else
		{
			document.getElementById('test').innerHTML = 'Gate has an input!';
			eval(OR_findLL).inputs.push(time);
			order_existingArray(LL_index);
		}
		OR_currentLine.prev_gateInc = eval(OR_findLL).gate_increment;
	}
}


function ORgate_setup()
{
	document.getElementById('demo').innerHTML = "Can you see me?";
	var table_inputs = "<table><tr><th>OR</th></tr>";
	
	for (var table_count = 0; table_count < logic_lines.length; table_count++)
	{
		table_inputs += "<tr><td class='inputTable'>"	+
			logic_lines[table_count].name				+
			"</tr></td>";
	}
	table_inputs += "</table>"							+
	"<button id='createObject'>Finish Gate</button>";
	
	document.getElementById('moreLogic').innerHTML = table_inputs;
	
	$(document).ready(function()
	{
		$(".inputTable").click(function()
		{
			$(this).toggleClass("selected_input");
		});
		
		$("#createObject").click(function()
		{
			var IC_nameLF = document.getElementById('create_name').value;
			
			var OR_classCounter = document.getElementsByClassName('selected_input');
			
			var OR_inputObject = {name: IC_nameLF, inputs:[], prevlogic: '', prev_gateInc: 0};
			
			for (var iter_classCounter = 0; iter_classCounter < OR_classCounter.length; iter_classCounter++)
			{
				for (var LL_index = 0; LL_index < logic_lines.length; LL_index++)
				{
					if (logic_lines[LL_index].name == OR_classCounter[iter_classCounter].innerHTML)
					{
						OR_inputObject.inputs.push('logic_lines['+ LL_index +']');
						break;
					}
				}
			}
			
			OR_array.push(OR_inputObject);
			store_function.value = 'ORgate("' + IC_nameLF + '", logic_timing)';
			document.getElementById('moreLogic').innerHTML = "";
		});
	});
}