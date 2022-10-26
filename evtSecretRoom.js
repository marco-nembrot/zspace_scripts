#pragma strict

function Start () {

}


function OnTriggerEnter( other : Collider ) {
	if (!staticVariables.isSecretRoom) {
		if (other.gameObject.name.Equals("First Person Controller")) {
			
			if ( audio && staticVariables.soundOn ) {
				audio.Play();
			}
			staticVariables.isSecretRoom = true;
		}
	}
}


function Update () {

}