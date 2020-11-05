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
var score = 0;
var score1 = 0;

function preload() {

  this.load.image('bg', 'assets/Background/flipshot000.png');

  this.load.spritesheet('ob', 'assets/object/flipshot002.png',
    { frameWidth: 20, frameHeight: 20 }
  );

  this.load.spritesheet('chintaMove', 'assets/Chinta.png',
    { frameWidth: 60, frameHeight: 50 }
  );

  this.load.spritesheet('chintaMove1', 'assets/Chinta.png',
    { frameWidth: 60, frameHeight: 50 }
  );

  this.load.image('coli', 'assets/collision/Colisao.png')

  this.load.spritesheet('ball', 'assets/ball/ball.png',
    { frameWidth: 14, frameHeight: 14 }
  );

}

function create() {

  //criando grupo que grada a colisão do ataque
  coli = this.physics.add.group();

  //plano de fundo
  var bac = this.add.sprite(400, 300, 'bg').setScale(2.8);

  //objeto 
  //object = this.physics.add.sprite(41, 150, 'ob', 0);
  objects = this.physics.add.group();
  obj1 = objects.create(41, 150, 'ob', 0);
  obj1.setScale(2.5);
  obj2 = objects.create(41, 300, 'ob', 2);
  obj2.setScale(2.5);
  obj3 = objects.create(41, 450, 'ob', 4);
  obj3.setScale(2.5);

  //objeto 
  //object = this.physics.add.sprite(41, 150, 'ob', 0);
  objects1 = this.physics.add.group();
  obj4 = objects1.create(760, 150, 'ob', 0);
  obj4.setScale(2.5);
  obj5 = objects1.create(760, 300, 'ob', 2);
  obj5.setScale(2.5);
  obj6 = objects1.create(760, 450, 'ob', 4);
  obj6.setScale(2.5);

  // posição do chinta
  chinta = this.physics.add.sprite(100, 300, 'chintaMove', 0);

  // posição do chinta
  chinta1 = this.physics.add.sprite(700, 300, 'chintaMove', 0);

  // personagem colidi nas bordas
  chinta.setCollideWorldBounds(true);


  // personagem colidi nas bordas
  chinta1.setCollideWorldBounds(true);

  // aumentando o chinta
  chinta.setScale(2.5);

  // aumentando o chinta1
  chinta1.setScale(2.5);

  //verdadeiro se o personagem estiver atacando
  chinta.attack = false;
  chinta.dash = false;

  //verdadeiro se o personagem estiver atacando
  chinta1.attack = false;
  chinta1.dash = false;

  //mudando caixa de colisão
  chinta.body.setSize(35, 40, 0, 0);

  //mudando caixa de colisão
  chinta1.body.setSize(35, 40, 0, 0);

  //bola
  b = this.physics.add.sprite(chinta.x, chinta.y, 'ball', 0);
  

  b.setScale(2.0);
 
  //adicionando velocidade na direção x e y
  b.vel_x = 16;
  b.vel_y = 16;



  this.anims.create({
    key: 'dt',
    frames: this.anims.generateFrameNumbers('chintaMove', { start: 8, end: 9 }),
    frameRate: 7,
    repeat: 0
  });

  this.anims.create({
    key: 'dp',
    frames: this.anims.generateFrameNumbers('chintaMove', { start: 4, end: 5 }),
    frameRate: 7,
    repeat: 0
  });

  this.anims.create({
    key: 'df',
    frames: this.anims.generateFrameNumbers('chintaMove', { start: 6, end: 7 }),
    frameRate: 7,
    repeat: 0
  });

  this.anims.create({
    key: 'db',
    frames: this.anims.generateFrameNumbers('chintaMove', { start: 10, end: 11 }),
    frameRate: 7,
    repeat: 0
  });

  //animaçao do objeto
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('ob', { start: 0, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'b',
    frames: this.anims.generateFrameNumbers('ball', { start: 0, end: 3 }),
    frameRate: 20,
    repeat: -1
  });

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

  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('chintaMove', { start: 13, end: 16 }),
    frameRate: 10,
    repeat: -1
  });






  this.anims.create({
    key: 'dt1',
    frames: this.anims.generateFrameNumbers('chintaMove1', { start: 8, end: 9 }),
    frameRate: 7,
    repeat: 0
  });

  this.anims.create({
    key: 'dp1',
    frames: this.anims.generateFrameNumbers('chintaMove1', { start: 4, end: 5 }),
    frameRate: 7,
    repeat: 0
  });

  this.anims.create({
    key: 'df1',
    frames: this.anims.generateFrameNumbers('chintaMove1', { start: 6, end: 7 }),
    frameRate: 7,
    repeat: 0
  });

  this.anims.create({
    key: 'db1',
    frames: this.anims.generateFrameNumbers('chintaMove1', { start: 10, end: 11 }),
    frameRate: 7,
    repeat: 0
  });

  //animaçao do objeto
  // this.anims.create({
  //   key: 'left',
  //   frames: this.anims.generateFrameNumbers('ob', { start: 0, end: 7 }),
  //   frameRate: 10,
  //   repeat: -1
  // });

  // this.anims.create({
  //   key: 'b',
  //   frames: this.anims.generateFrameNumbers('ball', { start: 0, end: 3 }),
  //   frameRate: 20,
  //   repeat: -1
  // });

  //criando o chinta se movendo
  this.anims.create({
    key: 'move1',
    frames: this.anims.generateFrameNumbers('chintaMove1', { start: 17, end: 22 }),
    frameRate: 10,
    repeat: -1
  });

  //criando o chinta atacando
  this.anims.create({
    key: 'attack1',
    frames: this.anims.generateFrameNumbers('chintaMove1', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: 0
  });

  this.anims.create({
    key: 'idle1',
    frames: this.anims.generateFrameNumbers('chintaMove1', { start: 13, end: 16 }),
    frameRate: 10,
    repeat: -1
  });

  // pegar o input do teclado
  cursors = this.input.keyboard.createCursorKeys();

  keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
  keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ff0000' });
  scoreText1 = this.add.text(600, 16, 'score: 0', { fontSize: '32px', fill: '#ff0000' });



  /*
  physics.add.overlap(coli, this.stars, function(player, enemy) {
    player.destroy();
    enemy.destroy();
  });*/

  this.physics.add.collider(b, objects, hitboll, null, this);
  this.physics.add.collider(b, coli, hitbox, null, this);


  this.physics.add.collider(b, objects1, hitboll1, null, this);
  this.physics.add.collider(b, coli, hitbox, null, this);

  //this.physics.add.overlap(chinta, objects, resultScore, null, this);

}

function update() {

  //sempre setar velocidade para zero
  chinta.setVelocity(0);
  chinta1.setVelocity(0);
  //flage que vai indicar quando o player estiver 
  //em movimento
  var move = false;
  var move1 = false;
  //dando play na animação

  //só aceita outro comanda se não estiver atacando
  if (!chinta.attack && !chinta.dash) {
    //space é o botão de atack
    if (cursors.space.isDown) {
      chinta.attack = true;

      chinta.anims.play('attack', true);

      var pos = 15;
      //ativar colisão
      colis = this.physics.add.sprite(chinta.x + pos, chinta.y - pos, 'coli');
      //aumentar altura da colisão
      colis.displayHeight = 80;
      colis.displayWidth = 50;

      //adicionar colisão ao grupo
      coli.add(colis);

      //quando a animação de ataque terminar 
      //ficar parado
      chinta.once('animationcomplete', () => {
        //colocar animação idle aqui
        chinta.anims.play('idle', true);
        //desabilitar colisão
        coli.clear(true, true);
        chinta.attack = false;
      });

    } else {

      if (cursors.left.isDown) {

        chinta.setVelocityX(-160);

        move = true;

        //dash
        if (keyM.isDown && !chinta.dash) {

          chinta.setVelocityX(-1000);
          chinta.dash = true;
          chinta.anims.play("db", true);

          chinta.once('animationcomplete', () => {
            chinta.anims.play('idle', true);
            chinta.dash = false;
          });

        }

      } else if (cursors.right.isDown) {
        chinta.setVelocityX(160);

        move = true;

        //dash
        if (keyM.isDown && !chinta.dash) {

          chinta.setVelocityX(1000);
          chinta.dash = true;
          chinta.anims.play("df", true);

          chinta.once('animationcomplete', () => {
            chinta.anims.play('idle', true);
            chinta.dash = false;
          });

        }
      } if (cursors.up.isDown) {
        chinta.setVelocityY(-160);

        move = true;

        //dash
        if (keyM.isDown && !chinta.dash) {

          chinta.setVelocityY(-1000);
          chinta.dash = true;
          chinta.anims.play("dt", true);

          chinta.once('animationcomplete', () => {
            chinta.anims.play('idle', true);
            chinta.dash = false;
          });

        }
      } else if (cursors.down.isDown) {
        chinta.setVelocityY(160);

        move = true;

        //dash
        if (keyM.isDown && !chinta.dash) {

          chinta.setVelocityY(1000);
          chinta.dash = true;
          chinta.anims.play("dp", true);

          chinta.once('animationcomplete', () => {
            chinta.anims.play('idle', true);
            chinta.dash = false;
          });

        }
      }

      if (!chinta.dash) {

        //se estiver se movendo ativar animação de movimento
        if (move) {
          chinta.anims.play('move', true);
        } else {
          //colocar animação idle aqui
          chinta.anims.play('idle', true);

          //dash quando parado
          if (keyM.isDown) {

            chinta.setVelocityX(1000);
            chinta.dash = true;
            chinta.anims.play("df", true);

            chinta.once('animationcomplete', () => {
              chinta.anims.play('idle', true);
              chinta.dash = false;
            });

          }

        }

      }

    }
  }




  chinta1.setFlipX(true);

  //só aceita outro comanda se não estiver atacando
  if (!chinta1.attack && !chinta1.dash) {
    //space é o botão de atack
    if (keyX.isDown) {
      chinta1.attack = true;

      chinta1.anims.play('attack1', true);

      var pos = 15;
      //ativar colisão
      colis = this.physics.add.sprite(chinta1.x + pos, chinta1.y - pos, 'coli');
      //aumentar altura da colisão
      colis.displayHeight = 80;
      colis.displayWidth = 50;

      //adicionar colisão ao grupo
      coli.add(colis);

      //quando a animação de ataque terminar 
      //ficar parado
      chinta1.once('animationcomplete', () => {
        //colocar animação idle aqui
        chinta1.anims.play('idle1', true);
        //desabilitar colisão
        coli.clear(true, true);
        chinta1.attack = false;
      });

    } else {
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)

      if (keyA.isDown) {

        chinta1.setVelocityX(-160);

        move1 = true;

        //dash
        if (keyC.isDown && !chinta1.dash) {

          chinta1.setVelocityX(-1000);
          chinta1.dash = true;
          chinta1.anims.play("db1", true);

          chinta1.once('animationcomplete', () => {
            chinta1.anims.play('idle1', true);
            chinta1.dash = false;
          });

        }

        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
      } else if (keyD.isDown) {
        chinta1.setVelocityX(160);

        move1 = true;

        //dash
        if (keyC.isDown && !chinta1.dash) {

          chinta1.setVelocityX(1000);
          chinta1.dash = true;
          chinta1.anims.play("df1", true);

          chinta1.once('animationcomplete', () => {
            chinta1.anims.play('idle1', true);
            chinta1.dash = false;
          });

        }
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
      } if (keyW.isDown) {
        chinta1.setVelocityY(-160);

        move1 = true;

        //dash
        if (keyC.isDown && !chinta.dash) {

          chinta1.setVelocityY(-1000);
          chinta1.dash = true;
          chinta1.anims.play("dt1", true);

          chinta1.once('animationcomplete', () => {
            chinta1.anims.play('idle1', true);
            chinta1.dash = false;
          });

        }
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
      } else if (keyS.isDown) {
        chinta1.setVelocityY(160);

        move1 = true;

        //dash
        if (keyC.isDown && !chinta.dash) {

          chinta1.setVelocityY(1000);
          chinta1.dash = true;
          chinta1.anims.play("dp1", true);

          chinta1.once('animationcomplete', () => {
            chinta1.anims.play('idle1', true);
            chinta1.dash = false;
          });

        }
      }

      if (!chinta1.dash) {

        //se estiver se movendo ativar animação de movimento
        if (move) {
          chinta1.anims.play('move1', true);
        } else {
          //colocar animação idle aqui
          chinta1.anims.play('idle1', true);

          //dash quando parado
          if (keyC.isDown) {

            chinta1.setVelocityX(1000);
            chinta1.dash = true;
            chinta1.anims.play("df", true);

            chinta1.once('animationcomplete', () => {
              chinta1.anims.play('idle1', true);
              chinta1.dash = false;
            });

          }

        }

      }

    }
  }

  obj1.anims.play('left', true);
  obj2.anims.play('left', true);
  obj3.anims.play('left', true);
  b.anims.play('b', true);

  obj4.anims.play('left', true);
  obj5.anims.play('left', true);
  obj6.anims.play('left', true);
 

  //verificando se passou da borda
  if (b.x < 40) {
    b.x = 40;
    b.vel_x = -b.vel_x;
  } else if (b.x + 45 > 800) {
    ball_pos_x = 800 - 45;
    b.vel_x = -b.vel_x;
  }

  if (b.y < 60) {
    b.y = 60;
    b.vel_y = -b.vel_y;
  } else if (b.y + 28 > 600) {
    b.y = 600 - 28;
    b.vel_y = -b.vel_y;
  }

  //fazer o objeto se mecher
  b.x += b.vel_x;
  b.y += b.vel_y;

}

function hitboll(boll, obj) {
  obj.disableBody(true, true);
  boll.vel_x = -boll.vel_x;
  score += 10;
  scoreText.setText('Score: ' + score);
  if (score == 40) {

    window.location.href = "http://localhost:8080/index.html"
  }
}


function hitboll1(boll, obj1) {
  obj1.disableBody(true, true);
  boll.vel_x = -boll.vel_x;
  score1 += 10;
  scoreText1.setText('Score: ' + score1);
  if (score1 == 40) {

    window.location.href = "http://localhost:8080/index.html"

  }
}

function hitbox(boll, col) {
  if (boll.vel_x < 0) {

    boll.vel_x = -boll.vel_x;

  }
  //se estiver no limite maximo não soma mais
  if (Math.abs(boll.vel_x) == 48) {
    return;
  }
  boll.vel_x += 32;

  //aumenta velocidade
  this.time.delayedCall(1600, () => {
    if (boll.vel_x == 48) {
      boll.vel_x -= 32;
    } else if (boll.vel_x == -48) {
      boll.vel_x += 32;
    }
  })

}
