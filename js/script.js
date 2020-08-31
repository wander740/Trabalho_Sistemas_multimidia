(function(){
    
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        pixelArt: true,
        zoom: 1,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            //debug: true
          }
        },
        scene: {
            preload: preload,        
            create: create,
            update: update
        }

    };

    window.game = new Phaser.Game(config);      

    function preload() {
       

    
    }
      
    function create() {
    


    }
      

    function update() {



    }

}());