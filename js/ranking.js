var load_obj = function(){
	var vue_instance = new Vue({
		el: "#saves_id",
		data: {
			saves2: []
		},
		created: function(){
			let arrayPartidesTotals = [];
			if(sessionStorage.partides2){
				arrayPartidesTotals = JSON.parse(sessionStorage.partides2);
				if(!Array.isArray(arrayPartidesTotals)) arrayPartidesTotals = [];
			}
			this.saves2 = arrayPartidesTotals;
		},
		methods: { 
			load: function(i){
				sessionStorage.idPartida2 = i;
				loadpage("../html/game.html");
			}			
		}
	});
	return {}; 
}();
