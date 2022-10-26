#pragma strict

var speed = 0.2;
var crawling = false;
function Start() {
}

function Update () {
    if (!crawling)
		return;
		
    transform.Translate(0, Time.deltaTime * speed, 0);
	if (transform.position.y > 10.65)
		crawling = false;
}
