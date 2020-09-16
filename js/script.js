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

function preload() {

  this.load.image('bg', 'assets/Background/flipshot000.png');

  this.load.spritesheet('ob', 'assets/object/flipshot002.png',
    { frameWidth: 20, frameHeight: 20 }
  );

  this.load.spritesheet('chinta', 'assets/Chinta Nemoto.png',
    { frameWidth: 60, frameHeight: 58}
  );

  this.load.spritesheet('chintaMove', 'assets/move/Chinta Nemoto.png',
    { frameWidth: 50, frameHeight: 60 }
  );


}

function create() {

  //plano de fundo
  var bac = this.add.sprite(400, 300, 'bg').setScale(2.8);

  //objeto 
  // object = this.physics.add.sprite(41, 150, 'ob', 0);
  //object.setScale(2.8);

  //animaçao do objeto
  // this.anims.create({
  //   key: 'left',
  //   frames: this.anims.generateFrameNumbers('ob', { start: 0, end: 7 }),
  //   frameRate: 10,
  //   repeat: -1
  // });

  // posição do chinta
  chinta = this.physics.add.sprite(100, 300, 'chinta',0);

  // personagem colidi nas bordas
  chinta.setCollideWorldBounds(true);

  // aumentando o chinta
  chinta.setScale(2.0);

  //criando o chinta parado
  this.anims.create({
    key: 'stand',
    frames: this.anims.generateFrameNumbers('chinta', { start: 0, end: 0 }),
    frameRate: 20,
    //epeat: -1
  });

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('chinta', { start: 0, end: 0 }),
    frameRate: 20,
    //repeat: -1
  });

  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('chinta', { start: 8, end: 15  }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('chinta', { start: 8, end: 15  }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'left',
    frames: [ { key: 'chinta', frame: 29 } ],
    frameRate: 20,
    //repeat: -1
  });

  // pegar o input do teclado
  cursors = this.input.keyboard.createCursorKeys();

}

function update() {

  //dando play na animação
  //object.anims.play('left', true);

  if (cursors.left.isDown)
  {
      chinta.setVelocityX(-160);

      chinta.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
      chinta.setVelocityX(160);

      chinta.anims.play('right', true);
  }
  else
  {
      chinta.setVelocityX(0);

      chinta.anims.play('stand');
  }

  if (cursors.up.isDown)
  {
      chinta.setVelocityY(-50);

      chinta.anims.play('up', true);
  }

  if (cursors.down.isDown)
  {
      chinta.setVelocityY(50);

      chinta.anims.play('down', true);
  }

}