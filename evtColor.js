#pragma strict

var couleur : Color = Color.black;
function Start () {
	guiText.material.color = couleur;
}

function Update () {
}
function OnGui () {
	guiText.material.color = couleur;
}