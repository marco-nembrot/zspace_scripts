#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter( other : Collider ) {	
	if (other.gameObject.name.Equals("Joueur") || other.gameObject.name.Equals("First Person Controller"))
		if (staticVariables.soundOn)  
			audio.Play();	
}
function OnTriggerExit( other : Collider ) {	
	audio.Stop();
}