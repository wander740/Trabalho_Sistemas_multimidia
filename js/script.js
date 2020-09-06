var config = {
	type: Phaser.AUTO,
	width: 800,
    height: 600,
    pixelArt: true,
    zoom: 1,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var fl = false;

function preload(){

  this.load.image('bg','assets/Background/flipshot000.png');
  //this.load.image('ob','assets/object/flipshot002.png');

  this.load.spritesheet('ob','assets/object/flipshot002.png',
        //32 pixel de largura e 48 de altura
        { frameWidth: 20, frameHeight: 20 }
  );
}
    
function create(){

  //plano de fundo
  var bac = this.add.sprite(400, 300, 'bg').setScale(2.8);

  //objeto 
  object = this.physics.add.sprite(41, 150, 'ob',0);
  object.setScale(2.8);

  //animaçao do objeto
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('ob', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

}

function update(){

  //dando play na animação
  object.anims.play('left', true);
  
  
}