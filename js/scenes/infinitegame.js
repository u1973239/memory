
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
		this.temps = 2000; //dificultat facil per defecte
		this.dificultatlvl = 10; //dificultat facil per defecte
		this.arraycards = [];
		this.jocstotal = 0;
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
		/*
		switch (options_data.dificulty){
			case 'easy':
				this.temps = 2000;
				this.dificultatlvl = 10;
				break;
			case 'normal':
				this.temps = 1300;
				this.dificultatlvl = 20;
				break;
			case 'hard':
				this.temps = 700;
				this.dificultatlvl = 30;
				break;
		
		}*/

		this.arraycards = ['cb','co','sb','so','tb','to'];
		this.cards = options_data.cards;
		this.arraycards = this.arraycards.slice(); //Es fa una copia
		this.arraycards.sort(function(){return Math.random() - 0.5}); // Array aleatòria
		this.arraycards = this.arraycards.slice(0, this.cards); // S'agafen els primers ncards 
		this.arraycards = this.arraycards.concat(this.arraycards); // Es dupliquen
		this.arraycards.sort(function(){return Math.random() - 0.5});

		this.cameras.main.setBackgroundColor(0xBFFCFF);
		//cartes mostrades
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
		this.cards = this.physics.add.staticGroup();
		//cartes tapades
		for(let j = 0; j < this.arraycards.length; j++)
		{
			
			if(j < 4)
			{
				this.cards.create(250 + 100 * j,300, 'back');

			}
			else
			{
				this.cards.create(250 + 100 * (j-4),450, 'back');

			}
				
		}
		//Es mostren les cartes al començament de la partida
		this.cards.children.iterate((card)=>{
			card.setInteractive();
			card.disableBody(true,true);

		})
		//Es tornen a tapar
		setTimeout(() =>{
			this.cards.children.iterate((card)=>{
				card.enableBody(false, 0, 0, true, true);
			})
		},this.temps);
		

		let i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = this.arraycards[i];
			i++;
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= this.dificultatlvl;
						card.disableBody(true,true);
						var click = this.firstClick; // variable auxiliar
						setTimeout(()=>{ //Mostrar cartes 1s al fallar
							click.enableBody(false, 0, 0, true, true);
							card.enableBody(false, 0, 0, true, true);
						},1000);
						if (this.score <= 0){
							alert("Game Over, you have completed " + this.jocstotal + " games");
							

							//Guardar cada patida quan perdem
							let arrayPartidesTotals = [];
							let n_partides = 0;
							if(sessionStorage.partides2){
								arrayPartidesTotals = JSON.parse(sessionStorage.partides2);
								if(!Array.isArray(arrayPartidesTotals)) arrayPartidesTotals = [];
								var lastElement = arrayPartidesTotals[arrayPartidesTotals.length - 1];
								n_partides = lastElement.idpartida+1;
							}
							let partida = {
								idpartida: n_partides,
								joc: this.jocstotal,
							}
							arrayPartidesTotals.push(partida);
							sessionStorage.partides2 = JSON.stringify(arrayPartidesTotals);
							loadpage("../");


						}
					}
					else{
						this.correct++;
						if (this.correct >= options_data.cards){
							this.correct = 0;
							this.jocstotal++;
							if(this.temps - 100 > 300){
								this.temps -= 100;
							}
							else{
								this.temps = 300;
							}
							if(this.dificultatlvl < 100){
								this.dificultatlvl += 5;
							}
							this.create();
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

