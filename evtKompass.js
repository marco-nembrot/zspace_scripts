#pragma strict

var texture : Texture2D;
private var angle : float;
private var size : Vector2;
private var pos : Vector2;
private var rect : Rect;
private var pivot : Vector2;

function Start () {
	size = new Vector2(texture.width, texture.height);
	pos = new Vector2(Screen.width - (texture.width/2), texture.height/2);
	Update();
}

function Update () {
	angle = - GameObject.Find("First Person Controller").transform.rotation.eulerAngles.y;
    rect = new Rect(pos.x - size.x * 0.5f, pos.y - size.y * 0.5f, size.x, size.y);
    pivot = new Vector2(rect.xMin + rect.width * 0.5f, rect.yMin + rect.height * 0.5f);
}


function OnGUI() {
	var matrixBackup : Matrix4x4 = GUI.matrix;
	GUIUtility.RotateAroundPivot(angle, pivot);
	GUI.DrawTexture(rect, texture);
	GUI.matrix = matrixBackup;
}