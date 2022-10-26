#pragma strict

private var reboot : boolean = false;
function Start () {

}

function Update () {
	if (reboot && !GameObject.Find("Sounds/onMouseOver2").audio.isPlaying)
		Application.LoadLevel("Introduction");
}

function OnMouseDown() {
	if (this.name == "buttonBack") {
		reboot = true;
		GameObject.Find("Sounds/onMouseOver2").audio.Play();
	} else {
		GameObject.Find("Sounds/onMouseOver1").audio.Play();
	}
}

