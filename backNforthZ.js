#pragma strict

function Start () {


}

var t : boolean = false;
var speed : float;
var distance : int;
var center : Vector3;
var isSafe : boolean = true;
function Update () {	
	var x : int = transform.position.x;
	var y : int = transform.position.y;
	var z : int = transform.position.z;
	
	if (isSafe)	
		transform.Translate(speed*getDirection(x, center.x - distance, center.x + distance)*Time.deltaTime, 0, 0);
}


function getDirection(p : float, inf : float, sup : float) {
	if (p <= inf) {
		t = true;
	} else {
		if (p >= sup) {
			t = false;
		}
	}
	
	if (t)
		return(1);
	else
		return(-1);
}
