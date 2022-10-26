#pragma strict


var url : String = "http://www.";
var couleurEntrer : Color = Color(1, 0.67, 0.04, 1);
var couleurSortie : Color = Color(0, 0.41, 1, 1);


function Start () {
	guiText.material.color = couleurSortie;
}

function Update () {

}

function OnMouseEnter() {
	guiText.material.color = couleurEntrer;
}

function OnMouseExit(){
	guiText.material.color = couleurSortie;
}

function OnMouseDown() {
	//Application.OpenURL(url);
	print("Go to "+url+"...");
}