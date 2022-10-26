#pragma strict


static var soundOn : boolean = true;
static var sound_key : String = "I";


static var tips_key : String = "T";
static var stat_key : String = "F";
static var pause_key : String = "P";


static var ctrl_key : String = "C";
static var ctrl_text : String = "Move around with the arrows keys.\nControl your camera with the mouse."+ 
		"\nJump with the right shift key. \n\nTap the "+ctrl_key+" key to close this window.";


static var map_key : String = "M";


static var help_key : String = "H";
static var help_title : String = "Keyboard shortcuts";

static var help_begin : String = ctrl_key+" : show/hide controls \n"+tips_key+" : show/hide tip \n"+stat_key+" : show/hide game stats \n"+pause_key+" : pause the game \n"+sound_key+" : turn on/off audio";
static var help_end : String = "\n\n"+help_key+" : show/hide me";
static var help_text : String =  help_begin+help_end;

static var help_gui_show = "Tap "+help_key+" to show the help window.";
static var help_gui_hide = "Tap "+help_key+" to hide the help window.";



static var isVoltorb : boolean = false;
static var isKompass : boolean = false;
static var isSecretRoom : boolean = false;
static var isPendant : boolean = false;


static var isCape : boolean = false;
static var isTrash : boolean = false;
static var isRecipe : boolean = false;
static var isPhantom : boolean = false;
static var isMusicBox : boolean = false;
static var isTombRaider : boolean = false;


static var count_dead : int = 0;
static var count_crushed : int = 0;
static var count_falling : int = 0;
static var count_drowning : int = 0;
static var count_electrocuted : int = 0;

static var score : int = 0;
static var rank : String;


function Start () {	}
function Update () { }

static function UpdateScore(){
	var scoreCoefficient : int = 100;
	score = 0;
	
	//Score Bonus
	if(isVoltorb)
		score += 8*scoreCoefficient;
	if(isKompass)
		score += 4*scoreCoefficient;
	if(isSecretRoom)
		score += 12*scoreCoefficient;
	if(isPendant)
		score += 6*scoreCoefficient;
	
	if(isCape)
		score += 2*scoreCoefficient;
	if(isTrash)
		score += 4*scoreCoefficient;
	if(isRecipe)
		score += 4*scoreCoefficient;
	if(isPhantom)
		score += 2*scoreCoefficient;
	if(isMusicBox)
		score += 6*scoreCoefficient;
	
	if(isTombRaider)
		score += 4*scoreCoefficient;
	
	//Score malus
	score -= count_crushed*scoreCoefficient/6;
	score -= count_falling*scoreCoefficient/2;
	score -= count_drowning*scoreCoefficient/4;
	score -= count_electrocuted*scoreCoefficient/4;
	
	if(cheatCodes.mapUnlock){
		score -= scoreCoefficient;
	}
	if(cheatCodes.kompassUnlock){
		score -= 2*scoreCoefficient;
	}
	if(cheatCodes.voltorbUnlock){
		score -= scoreCoefficient/2;
	}
	if(cheatCodes.spiritTracks){
		score -= 4*scoreCoefficient;
	}
	if(cheatCodes.stopMotion){
		score -= scoreCoefficient;
	}
	if(cheatCodes.stopWall1){
		score -= scoreCoefficient/2;
	}
	if(cheatCodes.stopWall2){
		score -= scoreCoefficient/2;
	}
	
	//Maximum possible score
	var maxScore : int = 0;
	maxScore = (8+4+12+6+2+4+4+2+6+4)*scoreCoefficient;
	var rankTreshold : int = maxScore/10;
	if(score < rankTreshold)
		rank = "F";
	if(score >= rankTreshold)
		rank = "E";
	if(score >= 2*rankTreshold)
		rank = "D";
	if(score >= 4*rankTreshold)
		rank = "C";
	if(score >= 6*rankTreshold)
		rank = "B";
	if(score >= 8*rankTreshold)
		rank = "A";
	if(score == maxScore)
		rank = "S";
}

static function getNewDeath(value : String) {
	if (value.Equals("Crushed"))
		count_crushed ++;
	if (value.Equals("Falling"))
		count_falling ++;
	if (value.Equals("Drowning"))
		count_drowning ++;
	if (value.Equals("Electrocuted"))
		count_electrocuted ++;
		
	count_dead ++;
}

static function hasObjects() {
	return (isVoltorb || isKompass || isCape || isTrash || isRecipe || isPhantom || isTombRaider);
}
static function haSecrets() {
	return (isSecretRoom || isMusicBox);
}