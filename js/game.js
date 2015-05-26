//Global Vars//
var DIFFICULTY = 1;
var TARGET_MULT = 3;
var TARGET_COLOR = 0xffffff;
var targetArr = [];

//*Display the game**//
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'ColorSnipe', { preload: preload, create: create, update: update });

// Load images and sounds
function preload() {
	game.load.image('target', 'assets/target.png');
	game.load.image('shirt', 'assets/shirt.png');
};


function create() {
    // Set stage background color
    game.stage.backgroundColor = '#444444';

    generateLevel();

    // Show FPS
    this.game.time.advancedTiming = true;
    this.fpsText = this.game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );

    // Show Level
    this.levelText = this.game.add.text(
        20, 600-40, 'Level:'+DIFFICULTY, { font: '16px Arial', fill: '#ffffff' }
    );


    // Show target lbel
    this.targetText = this.game.add.text(
        30,0, 'Target', { font: '16px Arial', fill: '#ffffff' }
    );
};

// The update() method is called every frame
function update() {
    //show level
    this.levelText.setText('Level:'+DIFFICULTY);

};

function generateLevel(){

	//clear level
	for(var i = 0; i < targetArr.length; i++) {
		targetArr[i].img.kill();
		targetArr[i].shirt.kill();
	}

	targetArr = [];


	//Add random people with random colors
    for(var i = 0; i <= TARGET_MULT*DIFFICULTY; i++) {
    	var target = {};


        target.x = game.rnd.integerInRange(100, this.game.width-100);
        target.y = game.rnd.integerInRange(100, this.game.height-100);
        target.img = game.add.image(target.x, target.y, 'target');
        target.img.scale.setTo(.3,.3);
        target.img.inputEnabled = true;

        //add shirt
        target.shirt = game.add.image(target.x+1, target.y+30, 'shirt');
        target.shirt.scale.setTo(.30,.29);
        target.shirt.tint = Math.random() * 0xffffff;


        if(i == TARGET_MULT*DIFFICULTY){
        	TARGET_COLOR = target.shirt.tint;
        	target.img.events.onInputDown.add(win,this);
        }else{
        	target.img.events.onInputDown.add(lose,this);
        }

        targetArr.push(target);

    }

    //Show desired target
    var desired = game.add.image(0, 20, 'shirt');
    desired.tint = TARGET_COLOR;

}

function win(){
	DIFFICULTY++;
	generateLevel();


}

function lose(){
	DIFFICULTY = 1;
	generateLevel();
}
