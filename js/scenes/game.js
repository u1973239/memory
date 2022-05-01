var options_data = {
	cards:2, dificulty:"hard"
};

var json = localStorage.getItem("config");
	if(json)
		options_data = JSON.parse(json);

class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.temps = 700;
		this.dificultatlvl = 20;
		this.arraycards = [];
    }

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
	
    create (){
		
		switch (options_data.dificulty){
			case 'easy':
				this.temps = 1700;
				dificultatlvl = 10;
				break;
			case 'normal':
				this.temps = 700;
				dificultatlvl = 20;
				break;
			case 'hard':
				this.temps = 300;
				dificultatlvl = 30;
				break;
		
		}

		this.arraycards = ['cb','co','sb','so','tb','to'];
		this.cards = options_data.cards;
		arraycards = arraycards.slice(); //Es fa una copia
		arraycards.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		arraycards = arraycards.slice(0, this.cards); // S'agafen els primers ncards 
		arraycards = arraycards.concat(arraycards); // Es dupliquen
		arraycards.sort(function(){return Math.random() - 0.5});

		this.cameras.main.setBackgroundColor(0xBFFCFF);
		
		for(let j = 0; j < this.arraycards.length; j++)
		{
			
			if(j < 4)
			{
				this.add.image(250 + 100 * j,300,this.arraycards[j]);

			}
			else
			{
				this.add.image(250 + 100 * (j-4),450,this.arraycards[j]);

			}
				
		}
		/*
		this.add.image(250, 300, arraycards[0]);
		this.add.image(350, 300, arraycards[1]);
		this.add.image(450, 300, arraycards[2]);
		this.add.image(550, 300, arraycards[3]);
		*/
		this.cards = this.physics.add.staticGroup();
		/*
		this.cards.create(250, 300, 'back');
		this.cards.create(350, 300, 'back');
		this.cards.create(450, 300, 'back');
		this.cards.create(550, 300, 'back');
		*/

		var timer = this.time.addEvent({ delay: sec, callback: onEvent, callbackScope: this, loop: false });
		this.cards.children.iterate((card)=>{
			card.disableBody(true,true);
			setTimeout(this.desmostrarInicial, sec);
		});

		function onEvent (){
			this.cards.children.iterate((card)=>{
				card.enableBody(false, 0, 0, true, true);
			});
		}

		let i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= this.dificultatlvl;
						setTimeout(()=>{
							this.firstClick.enableBody(false, 0, 0, true, true);
							card.enableBody(false, 0, 0, true, true);
						},1000);
						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= options_data.cards){
							alert("You Win with " + this.score + " points.");
							loadpage("../");
						}
					}
					this.firstClick = null;
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
	}
	
	update (){	}
}

