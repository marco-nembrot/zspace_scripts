#pragma strict


function Start() {	}

function OnTriggerEnter( other : Collider ) {
	staticVariables.isPendant = true;
	
	renderer.enabled = false;
	collider.enabled = false;
	if ( audio && staticVariables.soundOn ) {
		audio.Play();
	}
}

function Update () {	}