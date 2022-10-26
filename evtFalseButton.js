#pragma strict

var couleurEntrer : Color;
var couleurSortie : Color = Color.white;
var tailleEntrer : float;
var tailleSortie : float;


function Start () {
	couleurEntrer = Color.magenta;
	tailleEntrer = guiText.fontSize;
	tailleSortie = guiText.fontSize;
}

function Update () {

}

function OnMouseEnter() {
	guiText.material.color = couleurEntrer;
	guiText.fontSize = tailleEntrer;
	if (this.name != "buttonBack") {
		GameObject.Find(this.name+"/Tampon").guiText.material.color = couleurEntrer;
		GameObject.Find(this.name+"/Tampon").guiText.fontSize = tailleEntrer;
	}
}

function OnMouseExit(){
	guiText.material.color = couleurSortie;
	guiText.fontSize = tailleSortie;
	if (this.name != "buttonBack") {
		GameObject.Find(this.name+"/Tampon").guiText.material.color = couleurSortie;
		GameObject.Find(this.name+"/Tampon").guiText.fontSize = tailleSortie;
	}

}