#pragma strict

var isPaused : boolean = false;

var help_window; 
var help_bool : boolean = false;
var help_rect : Rect = Rect(20, 40, 160, 60);

var tips_window; 
var tips_bool : boolean = true;
var tips_rect : Rect = Rect(Screen.width / 2, 20, 400, 120);

var ctrl_window;
var ctrl_bool : boolean = false;
var ctrl_rect : Rect = Rect(20, 100, 260, 110);

var stat_window;
var stat_bool : boolean = false;

private var map_bool : boolean = false;

function Start () {		
	print("Now entering the level "+Application.loadedLevel+"...");
	
	GameObject.Find("Map").SendMessage("ActiveGui", map_bool);
	if (!staticVariables.soundOn) 
		GameObject.Find("Level").BroadcastMessage("Audio", true);	
}
function Update () {
	if ( Input.GetKeyUp(getCode(staticVariables.ctrl_key)) || Input.GetButtonUp("Ctrl Window")  ) 
		ctrl_bool = (ctrl_bool) ? false : true;
	if ( Input.GetKeyUp(getCode(staticVariables.tips_key)) || Input.GetButtonUp("Tip Window") )
		tips_bool = (tips_bool) ? false : true;
	if ( Input.GetKeyUp(getCode(staticVariables.help_key)) || Input.GetButtonUp("Help Window") ) 
		help_bool = (help_bool) ? false : true;
	if ( Input.GetKeyUp(getCode(staticVariables.stat_key)) || Input.GetButtonUp("Stats Window") ) 
		stat_bool = (stat_bool) ? false : true;
	
	if ( Input.GetKeyUp(getCode(staticVariables.map_key)) || Input.GetButtonUp("Map") )
		map_bool = (map_bool) ? false : true;
	
	
	if ( Input.GetKeyUp(getCode(staticVariables.pause_key)) || Input.GetButtonUp("Pause") ) {	
		if (!isPaused) {
			isPaused = true;
			GameObject.Find("Level").BroadcastMessage("Audio", true);
			Time.timeScale = 0.0;	
		} else {
			isPaused = false;
			GameObject.Find("Level").BroadcastMessage("Audio", false);
			Time.timeScale = 1.0;
		}
	}
	
	if (Input.GetKeyUp(getCode(staticVariables.sound_key)) || Input.GetButtonUp("Audio") ) {	
		if (!staticVariables.soundOn) {
			staticVariables.soundOn = true;
			GameObject.Find("Level").BroadcastMessage("Audio", false);	
		} else {
			staticVariables.soundOn = false;
			GameObject.Find("Level").BroadcastMessage("Audio", true);	
		}
	}
}


function OnGUI() {		
	var style : GUIStyle = GUIStyle();
		style.fontSize = 14;
		style.fontStyle = FontStyle.Bold;
	
	var audio : String = (staticVariables.soundOn) ? "ON" : "OFF";
	GUI.Label(Rect(20, 10, 220, 20), "Audio : "+audio, style);
	GUI.Label(Rect(21, 11, 220, 20), "Audio : "+audio, style);		
	
	if (help_bool) {		
		help_window = GUI.Window (0, Rect(25, 40, 200, 200), showHelp, "Help");
		GUI.Label(Rect(20, 25, 220, 20), staticVariables.help_gui_hide, style);
		GUI.Label(Rect(21, 26, 220, 20), staticVariables.help_gui_hide, style);
	} else {	
		GUI.Label(Rect(20, 25, 220, 20), staticVariables.help_gui_show, style);
		GUI.Label(Rect(21, 26, 220, 20), staticVariables.help_gui_show, style);
	}
	
	if (isPaused) {
		GUI.Label(Rect(180, 10, 220, 20), "GAME PAUSED", style);
		GUI.Label(Rect(181, 11, 220, 20), "GAME PAUSED", style);
	}
	
	if (ctrl_bool) {
		GUI.color = Color.red;
		ctrl_window = GUI.Window (1, Rect(20, Screen.height / 2, 260, 110), showControls, "Controls");
	}
	
	if (tips_bool) {		
		GUI.color = Color.green;
		tips_window = GUI.Window (2, Rect(Screen.width / 2, Screen.height - 100, 400, 80), showTips, "Tips");
	}
	
	if (stat_bool) {		
		GUI.color = Color.magenta;
		stat_window = GUI.Window (3, Rect(Screen.width / 2 + 40, 60, 320, 400), showStats, "Game Statistics");
	}
	
	if (cheatCodes.mapUnlock)
		GameObject.Find("Map").SendMessage("ActiveGui", map_bool);
}


//make the contents of the windows
//(the value of GUI.color is set to what it was when the window was created in the code above)
function showTips(windowID : int) {
	//print ("Window " + windowID + " opened.");
	
	var text : String = GameObject.Find("Map").guiText.text;
	GUI.Label( Rect(20, 20, 360, 100), text);
		
	//make the windows be draggable
	GUI.DragWindow(Rect(0, 0, 10000, 10000));
}

function showControls(windowID : int) {
	GUI.DragWindow(Rect(0, 0, 10000, 10000));
	
	GUI.Label( Rect(20, 20, 400, 100), staticVariables.ctrl_text);
}

function showHelp(windowID : int) {
	GUI.Label( Rect(25, 25, 360, 140), staticVariables.help_title);
	GUI.Label( Rect(30, 50, 360, 140), staticVariables.help_text);
}

function showStats(windowID : int) {
	var text : String = "\t\t\tCurrent Level : "+getLevelName(Application.loadedLevel)+"\n\n";
	text += "Objects earned\n"+getListObjects()+"\n\n";
	text += "Events actived\n"+getListEvents()+"\n\n";
	text += "Cheat Codes used\n"+getListCheats()+"\n\n";
	text += "Dead Times\n"+getDead()+"\n\n";
	
	GUI.Label( Rect(20, 20, 360, 400), text);
}


function getLevelName(level : int) {
	switch(level) {
		case 1 : 
			return("the Silent Labyrinth");
			break;
		case 2 :
			return("the Haunted Oasis");
			break;
		case 3 :
			return("the Tomb Raider");
			break;
		case 4 : 
			return("the Invisible Cube");
			break;
		default : 
			return("No idea !");
			break;
	}
}
function getListObjects() {
	var text : String = "";
	
	if (staticVariables.isVoltorb)
		text += "\t\tVoltorb ball\n";
	if (staticVariables.isKompass)
		text += "\t\tSilent Labyrinth compass\n";
	if (staticVariables.isPendant)
		text += "\t\tCrystal pendant\n";
		
	if (staticVariables.isCape)
		text += "\t\tInvisible cape in here... somewhere...\n";
	if (staticVariables.isTrash)
		text += "\t\tTrash can collected\n";
	if (staticVariables.isRecipe)
		text += "\t\tWeird old rum recipe\n";
	if (staticVariables.isPhantom)
		text += "\t\tWhite phantom mask\n";
	if (staticVariables.isTombRaider)
		text += "\t\tStolen treasure tomb\n";
	
	if (text == "")
		text += "\t\tNone";
	
	return(text);
}
function getListEvents() {
	var text : String = "";

	if (staticVariables.isSecretRoom)
		text += "\t\tSecret room visited\n";
	if (staticVariables.isMusicBox)
		text += "\t\tMusic box opened\n";
	if (text == "")
		text += "\t\tNone";
	
	return(text);
}
function getListCheats() {
	var text : String = "";

	if (cheatCodes.mapUnlock)
		text += "\t\tMap access unlocked\n";
	if (cheatCodes.voltorbUnlock)
		text += "\t\tthe Silent Labyrinth compass unlocked\n";
	if (cheatCodes.kompassUnlock)
		text += "\t\tthe Silent Labyrinth Voltorb unlocked\n";
	if (cheatCodes.stopMotion)
		text += "\t\tthe Slow Motion Tomb Raider actived\n";
	if (cheatCodes.spiritTracks)
		text += "\t\tthe World-in-Between visited\n";
	if (text == "")
		text += "\t\tNone";
	
	return(text);
}
function getDead() {
	var text : String = "";

	text += "\t\tTotal : "+staticVariables.count_dead+"\n";
//*
	if (staticVariables.count_crushed > 1)
		text += "\t\t\t"+staticVariables.count_crushed+" crushings\n";
	if (staticVariables.count_falling > 1)
		text += "\t\t\t"+staticVariables.count_falling+" fallings\n";
	if (staticVariables.count_drowning > 1)
		text += "\t\t\t"+staticVariables.count_drowning+" drownings\n";
	if (staticVariables.count_electrocuted > 1)
		text += "\t\t\t"+staticVariables.count_electrocuted+" electrocutions\n";
//*/
	if (text == "")
		text += "\t\tNone";
	
	return(text);
}


function getCode(key : String) {
	if (key == "a" || key == "A")		return "a";
	if (key == "b" || key == "B")		return "b";
	if (key == "c" || key == "C")		return "c";
	if (key == "d" || key == "D")		return "d";
	if (key == "e" || key == "E")		return "e";
	if (key == "f" || key == "F")		return "f";
	if (key == "g" || key == "G")		return "g";
	if (key == "h" || key == "H")		return "h";
	if (key == "i" || key == "I")		return "i";
	if (key == "j" || key == "J")		return "j";
	if (key == "k" || key == "K")		return "k";
	if (key == "l" || key == "L")		return "l";
	if (key == "m" || key == "M")		return "m";
	if (key == "n" || key == "N")		return "n";
	if (key == "o" || key == "O")		return "o";
	if (key == "p" || key == "P")		return "p";
	if (key == "q" || key == "Q")		return "q";
	if (key == "r" || key == "R")		return "r";
	if (key == "s" || key == "S")		return "s";
	if (key == "t" || key == "T")		return "t";
	if (key == "u" || key == "U")		return "u";
	if (key == "v" || key == "V")		return "v";
	if (key == "w" || key == "W")		return "w";
	if (key == "x" || key == "X")		return "x";
	if (key == "y" || key == "Y")		return "y";
	if (key == "z" || key == "Z")		return "z";
	
	if (key == "space")					return "space";
	if (key == "Ctrl Window")			return "Ctrl Window";
	
	return(key);
}