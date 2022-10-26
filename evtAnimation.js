#pragma strict

function Start () {
	
}

function Update () {
	if (this.name.Equals("Piege  1")) {
		if (cheatCodes.stopWall1)
			animation.Stop();
		else
			animation.Play();
	}
	
	if (this.name.Equals("Piege  2")) {
		if (cheatCodes.stopWall2)
			animation.Stop();
		else
			animation.Play();
	}
}