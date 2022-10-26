#pragma strict

private var on;
function Start () {
	if (Application.loadedLevelName == "Labyrinthe") {
		GameObject.Find("Kompass").BroadcastMessage("Active", false);
		GameObject.Find("Voltorb").BroadcastMessage("Active", false);
	}
	GameObject.Find(this.name+"/Text").SendMessage("ActiveGui", false);
	
	if (this.name.Equals("Coffre_Wall"))
		on = staticVariables.isVoltorb;
	if (this.name.Equals("Coffre_Wood"))
		on = staticVariables.isKompass;
	if (this.name.Equals("Cape"))
		on = staticVariables.isCape;
	if (this.name.Equals("Phantom"))
		on = staticVariables.isPhantom;
	if (this.name.Equals("Trash"))
		on = staticVariables.isTrash;
	if (this.name.Equals("Recipe"))
		on = staticVariables.isRecipe;
}

function Update () {
	if (Application.loadedLevelName == "Labyrinthe") {
		if (staticVariables.isKompass || cheatCodes.kompassUnlock)
			GameObject.Find("Kompass").BroadcastMessage("Active", true);
		if (staticVariables.isVoltorb || cheatCodes.voltorbUnlock)
			GameObject.Find("Voltorb").BroadcastMessage("Active", true);
	}
}

function OnTriggerEnter( other : Collider ) {
	if (other.gameObject.name.Equals("Joueur") || other.gameObject.name.Equals("First Person Controller")){
		if (staticVariables.soundOn && gameObject.audio)
			gameObject.audio.Play();
			
		if (on)
			GameObject.Find(this.name+"/Text").guiText.text = "There is nothing left here...";
		GameObject.Find(this.name+"/Text").SendMessage("ActiveGui", true);
		
		if (this.name.Equals("Coffre_Wall"))
			staticVariables.isVoltorb = true;
		if (this.name.Equals("Cape"))
			staticVariables.isCape = true;
		if (this.name.Equals("Phantom"))
			staticVariables.isPhantom = true;
		if (this.name.Equals("Trash"))
			staticVariables.isTrash = true;
		if (this.name.Equals("Recipe"))
			staticVariables.isRecipe = true;
		if (this.name.Equals("Music"))
			staticVariables.isMusicBox = true;
	}
}
function OnTriggerExit( other : Collider ) {	
	if (other.gameObject.name.Equals("Joueur") || other.gameObject.name.Equals("First Person Controller")){
		GameObject.Find(this.name+"/Text").SendMessage("ActiveGui", false);
		if (!this.name.Equals("Coffre_Glass") && !this.name.Equals("Music"))
			GameObject.Find(this.name+"/Text").guiText.text = "There is nothing left here...";
	}
}


function OnGUI() {		

}