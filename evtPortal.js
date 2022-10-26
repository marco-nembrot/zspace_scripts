#pragma strict

function Start () {

}

function Update () {

}


var levelToLoad : String;
function OnTriggerEnter( other : Collider ) {
	print(other.gameObject.name);
	if (other.gameObject.name.Equals("First Person Controller") || other.gameObject.name.Equals("Joueur"))
		Application.LoadLevel( levelToLoad );
}