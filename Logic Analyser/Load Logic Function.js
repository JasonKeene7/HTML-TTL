function_screen = document.getElementById('functionList');
open_gate = document.getElementById('openGate')

function functionLoader()
{
	document.getElementById('test').innerHTML = directory.length;
	function_screen.style.display = 'block';
	var function_listText = '<ul>';
	for (var directory_count = 0; directory_count < directory.length; directory_count++)
	{
		function_listText += 
		'<li onclick="hideLoader(directory['	+
		directory_count							+
		'])">' 									+
		directory[directory_count][0] 			+
		'<br><img src="'						+
		directory[directory_count][1]			+
		'" alt="img not found">'				+
		'</li>';
	}
	function_listText += '</ul>';
	function_screen.innerHTML = function_listText;
}

function hideLoader(IC_logic)
{
	eval(IC_logic[3]);
	function_screen.style.display = 'none';
}

$("body").dblclick(function()
{
	function_screen.style.display = 'none';
});