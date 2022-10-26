#pragma strict


public var allowedTime: int;
private var currentTime: int;
private var textfield: GUIText;
function Start () {
	GameObject.Find("ZGUI_big").GetComponent("GUITexture").guiTexture.enabled = false;
	GameObject.Find("ZGUI_middle").GetComponent("GUITexture").guiTexture.enabled = false;
}

function Update () {

}

function Awake() {
	currentTime = allowedTime;
	// retrieve the GUIText Component and set the text
	textfield = GameObject.Find("TxtTimer").GetComponent(GUIText);
	UpdateTimerText();
	// start the timer ticking
	TimerTick();
}
function UpdateTimerText() {
	// update the textfield
	textfield.text = currentTime.ToString();
}

function TimerTick() {
	// while there are seconds left
	while(currentTime > 0) {
		// wait for 1 second
		yield WaitForSeconds(1);
		// reduce the time
		currentTime--;
			
		UpdateTimerText();
		
		if (currentTime == (2*allowedTime/3)) {
			GameObject.Find("ZGUI").GetComponent("GUITexture").guiTexture.enabled = false;
			GameObject.Find("ZGUI_middle").GetComponent("GUITexture").guiTexture.enabled = true;
		}
		
		if (currentTime == (allowedTime/3)) {
			GameObject.Find("ZGUI_big").GetComponent("GUITexture").guiTexture.enabled = true;
			GameObject.Find("ZGUI_middle").GetComponent("GUITexture").guiTexture.enabled = false;
		}
		
		if (currentTime == 9) {
			GameObject.Find("Level").BroadcastMessage("Audio", true);
			GameObject.Find("HeartAttack").audio.Play();
		}
	}
	
	
	// game over and restart
	if (!staticVariables.isVoltorb && !cheatCodes.voltorbUnlock)
		Application.LoadLevel("CubeFailed");
	else {
		if (staticVariables.soundOn)
			GameObject.Find("Level").audio.Play();
		GameObject.Find("ZGUI_big").GetComponent("GUITexture").guiTexture.enabled = false;
		GameObject.Find("ZGUI").GetComponent("GUITexture").guiTexture.enabled = true;
		GameObject.Find("Map").GetComponent("GUIText").guiText.text = "The strange ball you found in the Labyrinthe reacts to the thunder ! You're now immunized ! You can stay here as long as you want and search for that secret room.";
		
		var t : World_Window;
		t = GameObject.Find("Level").GetComponent("World_Window");
		t.tips_bool = true;
	}
}

function End() {
	currentTime = 10;
}