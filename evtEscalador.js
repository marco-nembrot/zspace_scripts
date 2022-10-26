#pragma strict

private var tempy : backNforthY;
private var tempz : backNforthZ;
function Start () {
	if (GameObject.Find("Escalador"))
		tempy = GameObject.Find("Escalador").GetComponent("backNforthY");
	if (GameObject.Find("Moving"))
		tempz = GameObject.Find("Moving").GetComponent("backNforthZ");
}

function Update () {
}

function OnTriggerEnter( other : Collider ) {	
	//print("enter");
	if (other.gameObject.name.Equals("First Person Controller")) {
		if (tempy)
			tempy.isSafe = false;
		if (tempz)
			tempz.isSafe = false;
	}
}

function OnTriggerExit( other : Collider ) {	
	//print("exit");
	if (other.gameObject.name.Equals("First Person Controller")) {
		if (tempy)
			tempy.isSafe = true;
		if (tempz)
			tempz.isSafe = true;
	}
}