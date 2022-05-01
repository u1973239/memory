var load_obj = function(){
	var vue_instance = new Vue({
		el: "#saves_id",
		data: {
			saves: []
		},
		created: function(){
			let a_partides = [];
			if(localStorage.partides){
				a_partides = JSON.parse(localStorage.partides);
				if(!Array.isArray(a_partides)) a_partides = [];
			}
			this.saves2 = a_partides;
		},
		methods: { 
			load: function(i){
				sessionStorage.idPartida = i;
				loadpage("../html/index.html");
			}			
		}
	});
	return {}; 
}();
