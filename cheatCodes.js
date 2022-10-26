#pragma strict

static var mapUnlock : boolean = false;
static var voltorbUnlock : boolean = false;
static var kompassUnlock : boolean = false;

static var spiritTracks : boolean = false;

static var stopMotion : boolean = false;
	static var stopWall1 : boolean = false;
	static var stopWall2 : boolean = false;


function Start () {

}

function Update () {
	if (Input.GetKeyUp(KeyCode.F1)) 	Application.LoadLevel("Introduction");
	if (Input.GetKeyUp(KeyCode.F2)) 	Application.LoadLevel("Tutorial");
	if (Input.GetKeyUp(KeyCode.F3)) 	Application.LoadLevel("Labyrinthe");
	if (Input.GetKeyUp(KeyCode.F4)) 	Application.LoadLevel("level1");
	if (Input.GetKeyUp(KeyCode.F5)) 	Application.LoadLevel("level2");
	if (Input.GetKeyUp(KeyCode.F6)) 	Application.LoadLevel("Cube");
	if (Input.GetKeyUp(KeyCode.F12)) 	Application.LoadLevel("Level0");
	
	if ( Input.GetButton("Left") && Input.GetButton("Right") ) {
		spiritTracks = true;
		Application.LoadLevel("Level0");
	}
}


private var s : String = "";
private var isCheat : boolean = false;
function OnGUI() {
    var e : Event = Event.current;
	var temp : CharacterMotor;
	
	if (e.Equals(Event.KeyboardEvent("#Q")) && !isCheat) {
		print("Enter a cheat code...");
		isCheat = true;
	}
	
	if (e.Equals(Event.KeyboardEvent("return")) && isCheat) {
		print(s);
		
		if (s.Equals("map") || s.Equals("MAP")) {
			mapUnlock = true;
			staticVariables.help_text = staticVariables.help_begin+"\n"+staticVariables.map_key+" : show/hide the map"+staticVariables.help_end;
		}
		
		if (s.Equals("voltorb") || s.Equals("VOLTORB")) {
			voltorbUnlock = true;
		}
		
		if (s.Equals("kompass") || s.Equals("KOMPASS")) {
			kompassUnlock = true;
		}
		
		if (s.Equals("spirit") || s.Equals("SPIRIT")) {
			spiritTracks = true;
			Application.LoadLevel("Level0");
		}
		
		if ( (s.Equals("die") || s.Equals("DIE")) && Application.loadedLevelName.Equals("Cube")) {
			GameObject.Find("GUIPanel").SendMessage("End");
		}
		
		if ( (s.Equals("portal") || s.Equals("PORTAL")) && Application.loadedLevelName.Equals("Cube")) {
			GameObject.Find("Level").BroadcastMessage("ShowPortal");
		}
		
		if ( (s.Equals("stop") || s.Equals("STOP")) && Application.loadedLevelName.Equals("level2")) {
			stopMotion = true;
		}
		if ( (s.Equals("stop wall 1") || s.Equals("STOP WALL 1")) && Application.loadedLevelName.Equals("level2")) {
			stopWall1 = true;
		}
		if ( (s.Equals("stop wall 2") || s.Equals("STOP WALL 2")) && Application.loadedLevelName.Equals("level2")) {
			stopWall2 = true;
		}
		if ( (s.Equals("start wall 1") || s.Equals("START WALL 1")) && Application.loadedLevelName.Equals("level2")) {
			stopWall1 = false;
		}
		if ( (s.Equals("start wall 2") || s.Equals("START WALL 2")) && Application.loadedLevelName.Equals("level2")) {
			stopWall2 = false;
		}
		
		if ( (s.Equals("speedup") || s.Equals("SPEEDUP")) && Application.loadedLevelName.Equals("level1")) {
			temp = GameObject.Find("Joueur").GetComponent("CharacterMotor");
			temp.movement.maxForwardSpeed += 10;
		}
		
		if ( (s.Equals("speedlow") || s.Equals("SPEEDLOW")) && Application.loadedLevelName.Equals("level1")) {
			temp = GameObject.Find("Joueur").GetComponent("CharacterMotor");
			temp.movement.maxForwardSpeed -= 10;
		}
		
		s = "";
        isCheat = false;
    }
	
	if (isCheat) {
		s = GUI.TextField (Rect (10, Screen.height - 20, 100, 20), s, 25);
	} 
}


static function hasCheated() {
	return (mapUnlock || voltorbUnlock || kompassUnlock || stopMotion || stopWall1 || stopWall2);
}