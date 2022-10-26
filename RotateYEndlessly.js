#pragma strict

var direction : int;
var rotate_speed : float = 100;
function Start () {

}

function Update () {
   transform.Rotate(0, direction * rotate_speed * Time.deltaTime, 0);
}