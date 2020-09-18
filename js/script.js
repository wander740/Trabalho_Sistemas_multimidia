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

  this.load.spritesheet('chintaMove', 'assets/Chinta.png',
    { frameWidth: 60, frameHeight: 50 }
  );

  this.load.image('coli','assets/collision/Colisao.png')
}

function create() {

  //criando grupo que grada a colisão do ataque
  coli = this.physics.add.group();

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
  chinta = this.physics.add.sprite(100, 300, 'chintaMove',0);

  // personagem colidi nas bordas
  chinta.setCollideWorldBounds(true);

  // aumentando o chinta
  chinta.setScale(2.0);

  //verdadeiro se o personagem estiver atacando
  chinta.attack = false;

  //criando o chinta se movendo
  this.anims.create({
    key: 'move',
    frames: this.anims.generateFrameNumbers('chintaMove', { start: 17, end: 22 }),
    frameRate: 10,
    repeat: -1
  });

  //criando o chinta atacando
  this.anims.create({
    key: 'attack',
    frames: this.anims.generateFrameNumbers('chintaMove', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: 0
  });

  // pegar o input do teclado
  cursors = this.input.keyboard.createCursorKeys();

  /*
  physics.add.overlap(coli, this.stars, function(player, enemy) {
    player.destroy();
    enemy.destroy();
  });*/

}

function update() {

  //sempre setar velocidade para zero
  chinta.setVelocity(0);
  //flage que vai indicar quando o player estiver 
  //em movimento
  var move = false;
  //dando play na animação

  //só aceita outro comanda se não estiver atacando
  if(!chinta.attack){
    //space é o botão de atack
    if(cursors.space.isDown){
      chinta.attack = true;

      chinta.anims.play('attack',true);

      var pos = 10;
      //ativar colisão
      colis = this.physics.add.sprite(chinta.x+pos,chinta.y,'coli');
      //aumentar altura da colisão
      colis.displayHeight = 80;

      //adicionar colisão ao grupo
      coli.add(colis);

      //quando a animação de ataque terminar 
      //ficar parado
      chinta.once('animationcomplete', () => {
        //colocar animação idle aqui
        chinta.anims.play('move', false);
        //desabilitar colisão
        coli.clear(true,true);
        chinta.attack = false;
      });

    }else{
      if (cursors.left.isDown){
          chinta.setVelocityX(-160);

          move = true;
      }else if (cursors.right.isDown){
          chinta.setVelocityX(160);

          move = true;
      }if (cursors.up.isDown){
          chinta.setVelocityY(-50);

          move = true;
      }else if (cursors.down.isDown){
          chinta.setVelocityY(50);

          move = true;
      }

      //se estiver se movendo ativar animação de movimento
      if(move){
        chinta.anims.play('move', true);
      }else{
        //colocar animação idle aqui
        chinta.anims.play('move', false);
      }
    }
  }
}