/*//AND
var AND_array = [];
var store_function = document.getElementById('function_selection');

function ANDgate(AND_line, time)
{
	var AND_currentLine;
	var AND_logicOutput;
	var AND_findLL;
	
	document.getElementById('demo1').innerHTML = AND_array;
	/*For loop below searches AND_array for the line called, then stores the name to 
		use later.
	
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
	
	if (AND_logicOutput != AND_currentLine.prevlogic)
	{
		if (eval(AND_findLL).gateDelay != 0 &&
			eval(AND_findLL).gate_delayLevel != 0 &&
			eval(AND_findLL).gate_delayLevel != logic_vary)
		{
			document.getElementById('test').innerHTML = 'Gate has a delay!';
			if((AND_currentLine.prev_gateInc > eval(AND_findLL).gate_delayLevel &&
				AND_logicOutput == 'HIGH') ||
				(AND_currentLine.prev_gateInc < eval(AND_findLL).gate_delayLevel &&
				AND_logicOutput == 'LOW'))
			{
				document.getElementById('demo').innerHTML = 'Logic switched mid-change!';
				eval(AND_findLL).inputs.push(time);
				order_existingArray(LL_index);
			}
		}
		else
		{
			document.getElementById('test').innerHTML = 'Gate has an input!';
			eval(AND_findLL).inputs.push(time);
			order_existingArray(LL_index);
		}
		document.getElementById('demo').innerHTML = eval(AND_findLL).gate_delayLevel;

		AND_currentLine.prev_gateInc = eval(AND_findLL).gate_increment;
	}
		
	
	//IC line names have to be eval()'d from AND_array eval(AND_array[0].inputs[0])
	/*if (logic_lines[0].logic_state == 'HIGH')
	{
		document.getElementById('test').innerHTML = "Test text";
	}
}

function ANDgate_setup()
{
	var table_inputs = "<table><tr><th>AND</th></tr>";

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
			// IC_nameLF grabs name from name textbox
			var IC_nameLF = document.getElementById('create_name').value;
			
			//Gets the amount of names with 'selected_input' class
			var AND_classCounter = document.getElementsByClassName('selected_input');
			
			//Used to store gate name and input location for gate
			var AND_inputObject = {name: IC_nameLF, inputs:[], prevlogic: '', prev_gateInc: 0};
			
			/*Two for loops are used to get the name for each table element with the selected_input class
				and finds which logic line the name belongs to.
			
			for (var iter_classCounter = 0; iter_classCounter < AND_classCounter.length; iter_classCounter++)
			{
				for (var LL_index = 0; LL_index < logic_lines.length; LL_index++)
				{
					/*When the line is found, the if statement stores the name into the inputs and breaks for loop
						for (hopefully) efficient processing.
					
					if (logic_lines[LL_index].name == AND_classCounter[iter_classCounter].innerHTML)
					{
						AND_inputObject.inputs.push('logic_lines['+ LL_index +']');
						break;
					}
				}
			}
			
			AND_array.push(AND_inputObject);
			store_function.value = 'ANDgate("' + IC_nameLF + '", logic_timing)';
			document.getElementById('moreLogic').innerHTML = "";
		});
	});
	//To allow the IC Creator to access setup info: update function flag, gate function name
	//Hold values to that multiple lines can use the same gate without interfering with eachother
		//Needs the main gate function to access line information
}
*/

/*
	--------[Gate Function]--------
		[Use an array to store information on multiple gates]
		var {gate name}_array = [];
	
		[Declare the function with:
			a variable that can be used to match wih its corresponding logic_lines
			the current "time" of the logic display to push in as an input]
		function {gate name}gate({gate name}_line, time)
		{...
		}
	
		[Gate Variables]
		var OR_currentLine;
		var OR_logicOutput;
		var OR_findLL;

		[The block below can be reused to find the which gate is being called
		and matches the name of the line in the stored {gate name}_array]
	
		for (var {gate name}_lineFinder = 0; {gate name}_lineFinder < {gate name}_array.length; {gate name}_lineFinder++)
		{
			if ({gate name}_line == {gate name}_array[{gate name}_lineFinder].name)
			{
				{gate name}_currentLine = {gate name}_array[{gate name}_lineFinder];
				break;
			}
		}


		[The block below finds the line in logic_lines and retrieves its current logic state]
		for (var LL_index = 0; LL_index < logic_lines.length; LL_index++)
		{
			if (logic_lines[LL_index].name == {gate name}_line)
			{
				{gate name}_findLL = 'logic_lines[' + LL_index + ']';
				{gate name}_currentLine.prevlogic = eval({gate name}_findLL).logic_state;
				break;
			}
		}

		
		[The block is used to calculate if the gate should go HIGH or LOW]
		for (var {gate name}_inputIter = 0; {gate name}_inputIter < {gate name}_currentLine.inputs.length; {gate name}_inputIter++)
		{
			[The block of code inside the for loop can contain any state calculation]
			{gate name}_logicOutput = 'HIGH';
			if (eval {gate name}_currentLine.inputs[{gate name}_inputIter]).logic_state == 'LOW')
			{
				{gate name}_logicOutput = 'LOW';
				break;
			}
		}


		[The if block below can be used to check if the logic state of the gate
		needs to change. It first checks if the logic state changed from the 
		previous time then if the gate has any delay, or reached the top or bottom. 
		If the gate has delay, then it compares the previous signal level,
		stored in the gate storage array, to the current signal level, stored 
		in logic_lines and if the logic output of the gate is currently HIGH or LOW]
		if ({gate name}_logicOutput != {gate name}_currentLine.prevlogic)
		{
			if (eval({gate name}_findLL).gateDelay != 0 &&
				eval({gate name}_findLL).gate_delayLevel != 0 &&
				eval({gate name}_findLL).gate_delayLevel != logic_vary)
			{
				if(({gate name}_currentLine.prev_gateInc > eval({gate name}_findLL).gate_delayLevel &&
					{gate name}_logicOutput == 'HIGH') ||
					({gate name}_currentLine.prev_gateInc < eval({gate name}_findLL).gate_delayLevel &&
					{gate name}_logicOutput == 'LOW'))
				{
					eval({gate name}_findLL).inputs.push(time);
					order_existingArray(LL_index);
				}
			}
			else
			{
				eval({gate name}_findLL).inputs.push(time);
				order_existingArray(LL_index);
			}
			
			{gate name}_currentLine.prev_gateInc = eval({gate name}_findLL).gate_increment;
		}

	--------[Gate Setup]--------
		[Gate setup is a function OUTSIDE the main [Gate Function]]
		function {gate name}gate_setup()
		{...
		}
		
		[Starts a table with the gate name]
		var table_inputs = "<table><tr><th>{gate name}</th></tr>";


		[Block bolow loads the table with all the line names]
		for (var table_count = 0; table_count < logic_lines.length; table_count++)
		{
			table_inputs += "<tr><td class='inputTable'>"	+
				logic_lines[table_count].name				+
				"</tr></td>";
		}
		table_inputs += "</table>"							+
		"<button id='createObject'>Finish Gate</button>";
		document.getElementById('moreLogic').innerHTML = table_inputs;

		[JQuery function below nests other JQ functions inside. Not sure if 
		that's neccesary though, but I also don't want to touch my working gate.]
		$(document).ready(function()
		{
			...
		});


		[JQuery function changes table element class when clicked on]
		$(".inputTable").click(function()
			{
				$(this).toggleClass("selected_input");
			});


		[Creates gate object when "finish gate" button is presed]
		$("#createObject").click(function()
		{
			// IC_nameLF grabs name from name textbox
			var IC_nameLF = document.getElementById('create_name').value;
			
			//Gets the amount of names with 'selected_input' class
			var {gate name}_classCounter = document.getElementsByClassName('selected_input');
			
			//Used to store gate name and input location for gate
			var {gate name}_inputObject = {name: IC_nameLF, inputs:[], prevlogic: '', prev_gateInc: 0};
			
			/*Two for loops are used to get the name for each table element with the selected_input class
				and finds which logic line the name belongs to.
			
			for (var iter_classCounter = 0; iter_classCounter < {gate name}_classCounter.length; iter_classCounter++)
			{
				for (var LL_index = 0; LL_index < logic_lines.length; LL_index++)
				{
					/*When the line is found, the if statement stores the name into the inputs and breaks for loop
						for (hopefully) efficient processing.
					
					if (logic_lines[LL_index].name == {gate name}_classCounter[iter_classCounter].innerHTML)
					{
						{gate name}_inputObject.inputs.push('logic_lines['+ LL_index +']');
						break;
					}
				}
			}
			
			{gate name}_array.push({gate name}_inputObject);
			store_function.value = '{gate name}gate("' + IC_nameLF + '", logic_timing)';
			document.getElementById('moreLogic').innerHTML = "";
		});
*/