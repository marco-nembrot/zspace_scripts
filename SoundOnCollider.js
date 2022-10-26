#pragma strict

function Start () {

}


private var object : World_Window;
	object =  GameObject.Find("Level").GetComponent("World_Window");
function Update () {
	if (object)
		if (object.isPaused || !staticVariables.soundOn)
			audio.Stop();
}

	
var parent : GameObject;
var isShown : boolean = false;
function OnTriggerEnter( other : Collider ) {	
	audio.Play();	
	WorldAudio(0.6);
	isShown = true;
}
function OnTriggerExit( other : Collider ) {	
	audio.Stop();
	WorldAudio(1);
	isShown = false;
}

function WorldAudio(v : float) {
	var world = GameObject.Find("Level").audio;
	world.volume = v;
}

function OnGUI() {		
	if (isShown) {
		var gui : GUIText = GameObject.Find(parent.name).guiText;
		var style : GUIStyle = GUIStyle();
			style.font = gui.font;
			style.fontSize = gui.fontSize;
			style.fontStyle = gui.fontStyle;
			
		GUI.Box (Rect(Screen.width / 2, Screen.height / 2, 260, 110), gui.text, style);
		GUI.color = Color.white;
		//ID unique => 13 pour l'adresse des portals
		GUI.Window(13, Rect(Screen.width / 2 - (40+gui.text.Length), Screen.height / 2 - 20, gui.text.Length*gui.fontSize, 50), null, "Portal");
	}
}