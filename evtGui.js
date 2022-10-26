#pragma strict

function Start () {

}

function Update () {

}


function ActiveGui(flag : boolean) {
	if (guiText)
		guiText.enabled = flag;
	if (guiTexture)
		guiTexture.enabled = flag;
}