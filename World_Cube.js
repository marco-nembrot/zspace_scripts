#pragma strict


var update : boolean = false;
var coins : int = 0;			//number of coins taken
var coins_count : int = 0;		//number total of coins



function Start () {		
	if (staticVariables.isPendant)
		GameObject.Find("SecretRoom").BroadcastMessage("Active", false);
		
	GameObject.Find("Projector").light.enabled = false;
	GameObject.Find("Portal_Oasis").BroadcastMessage("Active", false);	
}
function Update () {
	if (update && !GameObject.Find("C1").audio.isPlaying) {
		update = false;
			
		if (staticVariables.soundOn) {
			var world = GameObject.Find("Level").audio;
			world.volume = 1;
		}
	}
}


function AddCoin () {	
	coins++;	
	
	if (coins_count == coins) {
		ShowPortal();
	}
}
function Count () {		coins_count++;	}


private var textscore:GUIText;
private var textscoreleft:GUIText;
function Awake(){
	if (GameObject.Find("GUIPanel")) {
		textscore = GameObject.Find("TxtScore").GetComponent(GUIText);
		textscoreleft = GameObject.Find("TxtScoreLeft").GetComponent(GUIText);
		OnGUI();
	}
}
function OnGUI() {		
	if (GameObject.Find("GUIPanel")) {
		textscore.text = coins.ToString();
		textscoreleft.text = (coins_count-coins).ToString();
	}
/*
	GUI.Label( Rect( 20, 0, 100, 100 ), "COINS : "+coins+"/"+coins_count);
	if (coins_count == coins) {
		GUI.Label( Rect( Screen.width/2, 0, 400, 100 ), "There is nothing left here... Let's find the portal to the next level.");
	}
//*/
}

function ShowPortal() {
	if (staticVariables.soundOn) {
		var world = GameObject.Find("Level").audio;
		world.volume = 0.6;
	}
	
	GameObject.Find("C1").audio.Play();	
	Destroy(GameObject.Find("Hidden"));
	
	update = true;
	GameObject.Find("Projector").light.enabled = true;
	GameObject.Find("Portal_Oasis").BroadcastMessage("Active", true);
}