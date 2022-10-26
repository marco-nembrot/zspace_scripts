#pragma strict

function Start () {

}

function Update () {

}

private var GO : GameObject;
GO = GameObject.Find("Block_Tutorial");
function OnMouseDown() {
	var object = this.name;
	GameObject.Find("Sounds/onMouseOver1").audio.Play();
	//GO.animation.Play("onClick_"+this.name);
	GO.BroadcastMessage("ActiveGui", false);
	
	if (object == "controls")
		GO.Find("Controls").BroadcastMessage("ActiveGui", true);
		
	if (object == "interface")
		GO.Find("Interface").BroadcastMessage("ActiveGui", true);
	if (object == "story")
		GO.Find("Story").BroadcastMessage("ActiveGui", true);
		
	if (object == "play") {
		Application.LoadLevel("Tutorial");
	}
}