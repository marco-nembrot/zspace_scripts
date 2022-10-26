#pragma strict

function Start () {

}

function Update () {

}


function OnMouseDown() {
	// if we clicked the play button
	if (this.name == "Retry" || this.name == "Enter") {
		Application.LoadLevel("Cube");
	}// if we clicked the Back button
	else if (this.name == "buttonBack") {
		Application.LoadLevel("Introduction");
	}
	else {
		
	}
}


function OnMouseEnter () {
    guiText.material.color = Color.red;
}

function OnMouseExit () {
	guiText.material.color = Color.white;
}