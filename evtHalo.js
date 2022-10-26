#pragma strict


var start : boolean = true;
private var temp : CharacterMotor;
private var mfs : float;
private var mss : float;
private var mbs : float;
function Start () {
	temp = GameObject.Find("First Person Controller").GetComponent("CharacterMotor");
	mfs = temp.movement.maxForwardSpeed;
	mss = temp.movement.maxSidewaysSpeed;
	mbs = temp.movement.maxBackwardsSpeed;

	if (start) {
		temp.movement.maxForwardSpeed = 0;
		temp.movement.maxSidewaysSpeed = 0;
		temp.movement.maxBackwardsSpeed = 0;
	}
}

function Update () {
	
}


function OnTriggerEnter( other : Collider ) {	
	temp.movement.maxFallSpeed = 2;
	if (!start) {
		temp.movement.maxForwardSpeed = 0;
		temp.movement.maxSidewaysSpeed = 0;
		temp.movement.maxBackwardsSpeed = 0;
		GameObject.Find("First Person Controller").transform.position.y = gameObject.transform.position.y;
		GameObject.Find("First Person Controller").transform.position.z = gameObject.transform.position.z;
	} else {
		temp.movement.maxForwardSpeed = mfs;
		temp.movement.maxSidewaysSpeed = mss;
		temp.movement.maxBackwardsSpeed = mbs;
	}
}

function OnTriggerExit( other : Collider ) {	
	if (!start)
		Application.LoadLevel("level1");
		
	temp.movement.maxFallSpeed = 20;
	Destroy(GameObject.Find("Halo"));
}