#pragma strict

private var on : boolean = false;
private var player : GameObject;
private var motor : CharacterMotor;

function Start () {
	player = GameObject.Find("First Person Controller");
	motor = GameObject.Find("First Person Controller").GetComponent("CharacterMotor");
}

function Update () {
	if (on) {
		var x_speed : int;
		var y_speed : int = 20;
		var z_speed : int = 160;
		
		x_speed = (transform.position.x < 11) ? 10 : 0;
		if (transform.position.y < 80)
			transform.Translate(x_speed * Time.deltaTime, y_speed * Time.deltaTime, 0);
		else 
			transform.Translate(0, 0, z_speed * Time.deltaTime);
			
		player.transform.position = transform.position;
	}
	
	if (transform.position.z > 1500) {
		print("end");
		Application.LoadLevel("End");
	}
}

function OnTriggerEnter( other : Collider ) {
	if (other.gameObject.name.Equals("First Person Controller")) {
		player.transform.position.x = transform.position.x;
		player.transform.position.z = transform.position.z;
		motor.movement.maxForwardSpeed = 0;
		motor.movement.maxSidewaysSpeed = 0;
		motor.movement.maxBackwardsSpeed = 0;
		
		Destroy(GameObject.Find("GUIPanel"));
		GameObject.Find("Level").BroadcastMessage("Audio", true);
		GameObject.Find("End").BroadcastMessage("ActiveGui", true);	
		
		if (staticVariables.soundOn)
			GameObject.Find("End/Sound").audio.Play();
		on = true;
	}
}