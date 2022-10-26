#pragma strict

function Start () {

}

function Update () {

}

function Audio(flag : boolean) {
	if (flag)
		audio.Stop();
	else
		audio.Play();
}