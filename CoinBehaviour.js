#pragma strict

private var world : World_Cube;
function Start() {
	world = GameObject.Find("World").GetComponent("World_Cube");
	world.SendMessage("Count");
}


private var win : World_Window;
function OnTriggerEnter( other : Collider ) {
	win = GameObject.Find("Level").GetComponent("World_Window");
	world.SendMessage("AddCoin");
	
	renderer.enabled = false;
	collider.enabled = false;
	Destroy(GetComponent("Halo"));
	if ( audio && staticVariables.soundOn ) {
		audio.Play();
	}
}

function Update () {
}