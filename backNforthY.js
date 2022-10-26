#pragma strict

var speed : float;
var distance : int;
var center : Vector3;
var t : boolean = true;
var isSafe : boolean = true;

function Start () {
	center.y = transform.position.y;
}

function Update () {	
	var x : int = transform.position.x;
	var y : int = transform.position.y;
	var z : int = transform.position.z;
	
	if (isSafe)
		transform.Translate(0, speed*getDirection(y, center.y - distance, center.y + distance)*Time.deltaTime, 0);
}


function getDirection(p : float, inf : float, sup : float) {
	if (p >= inf) {
		t = false;
	} else {
		if (p <= sup) {
			t = true;
		}
	}
	
	if (t)
		return(1);
	else
		return(-1);
}