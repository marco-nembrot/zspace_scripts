#pragma strict

function Start () {
	GameObject.Find("Roof").guiTexture.enabled = false;
	GameObject.Find("Block_Tutorial").BroadcastMessage("ActiveGui", false);
}

private var object : String = "";
private var isTitled : boolean = false;
private var onAnimation : boolean = false;
function Update () {
	if (!GameObject.Find("Intro").animation.isPlaying && onAnimation) {
		onAnimation = false;
		if (object == "Instructions")
			GameObject.Find("Block_"+object).transform.Translate(0, 1.65, 0);
		if (object == "Tutorial")
			GameObject.Find("Block_Tutorial/Story").BroadcastMessage("ActiveGui", true);
		object = "";
	}
}


var couleurEntrer : Color = Color.green;
var couleurSortie : Color = Color.white;
var tailleEntrer : float;
var tailleSortie : float;

function OnMouseEnter() {
	guiText.material.color = couleurEntrer;
	guiText.fontSize = tailleEntrer;
	GameObject.Find(this.name+"Tampon").renderer.material.color = couleurEntrer;
/*	
	if (!isTitled)
		GameObject.Find("Sounds/onMouseOver2").audio.Play();
//*/
}

function OnMouseExit(){
	if (!isTitled) {
		guiText.material.color = couleurSortie;
		guiText.fontSize = tailleSortie;
		GameObject.Find(this.name+"Tampon").renderer.material.color = couleurSortie;
	}
}


function OnMouseDown() {
	object = this.name;
	
	if (!isTitled && object != "ZSpace") {
		GameObject.Find("Sounds/onMouseDown").audio.Play();
		if (object != "Enter") {
			isTitled = true;
			onAnimation = true;
			GameObject.Find("Intro/ZSpace").guiText.fontSize = 70;
			GameObject.Find("Intro").animation.Play("onClick_"+object);
		} else {
			Application.LoadLevel(1);
		}
		
		if (object == "Credits") {	
			GameObject.Find("Roof").guiTexture.enabled = true;
			GameObject.Find("Sounds/Credits").audio.Play();
			var script : evtCredits;
			script = GameObject.Find("Block_Credits").GetComponent("evtCredits");
			script.crawling = true;
		}
	}
}