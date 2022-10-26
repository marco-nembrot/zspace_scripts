#pragma strict

private var text : String = "";
private var death : String = "";
private var haSecrets : boolean;
private var hasObjects : boolean;
private var hasCheated : boolean;
function Start () {
	staticVariables.UpdateScore();
	GameObject.Find("Rank").guiText.text = staticVariables.rank;
	GameObject.Find("Score").guiText.text = "("+staticVariables.score+")";

	hasCheated = cheatCodes.hasCheated();
	haSecrets = staticVariables.haSecrets();
	hasObjects = staticVariables.hasObjects();
	
	text = "You have done it ! You have reached a way out and you are walking home peacefully.\n";
	if (!staticVariables.isPendant) {
		text += "\nYou didn't find your sister's pendant but at least, she has you !\n";
		if (hasObjects) 
			text += "Plus, you did take some stuff from here. Let's see what's in your bag...\n"+getListObjects();
	} else {
		text += "\nYour sister has missed you so much ! \nShe is very happy now that you have found her pendant ! Congrats ! \n";
		if (hasObjects) 
			text += "Hey hey, look at that ! \n"+getListObjects()+"Quite the explorer !\n";
	}

	death += "\nWhat an adventure !\nAnd some great memories too !\n"+getDeaths();;

	if (haSecrets) 
		text += " \nSeems like you have discovered a few secrets here... \nBravo !";

	if (!staticVariables.isPendant) {
		text += "\n\n\nSomehow, you can hear the crystal calling... \nDoes feel like unfinished business, huh ?";
		text += "\nYour mind is now binded to this world \nand you are able to come back here spiritually.";
		text += "\nPress the F12 button to reach the World-in-Between, \ncrossroad to every level in this game.";
	}
	
	GameObject.Find("Text").guiText.text = text;
	GameObject.Find("Death").guiText.text = death;
}

function Update () { }


function getListObjects() {
	var text : String = "";
	
	if (staticVariables.isVoltorb)
		text += "     Voltorb ball\n";
	if (staticVariables.isKompass)
		text += "     Silent Labyrinth compass\n";
	if (staticVariables.isPendant)
		text += "     Crystal pendant\n";
		
	if (staticVariables.isCape)
		text += "     Invisible cape in here... somewhere...\n";
	if (staticVariables.isTrash)
		text += "     Trash can\n";
	if (staticVariables.isRecipe)
		text += "     Weird old rum recipe\n";
	if (staticVariables.isPhantom)
		text += "     White phantom mask\n";
	if (staticVariables.isTombRaider)
		text += "     Stolen treasure tomb\n";
	
	return(text);
}

function getDeaths() {
	var text : String = "";
	var separator : String = "\n         ";
	if (staticVariables.count_dead > 0) {
		text += "You died "+staticVariables.count_dead+" time";
		text += (staticVariables.count_dead > 1) ? "s" : "";
		
		text += " including";
		
		if (staticVariables.count_crushed > 0)
			text += separator+staticVariables.count_crushed+" crushing";
			text += (staticVariables.count_crushed > 1) ? "s" : "";
		if (staticVariables.count_falling > 0)
			text += separator+staticVariables.count_falling+" falling";
			text += (staticVariables.count_falling > 1) ? "s" : "";
		if (staticVariables.count_drowning > 0)
			text += separator+staticVariables.count_drowning+" drowning";
			text += (staticVariables.count_drowning > 1) ? "s" : "";
		if (staticVariables.count_electrocuted > 0)
			text += separator+staticVariables.count_electrocuted+" electrocution\n";
			text += (staticVariables.count_electrocuted > 1) ? "s" : "";
	}
	
	return(text);
}