<template>
	<div class="scheduling">
		<div v-if="!receivedKit" class="welcome-message">
			<h3>Parabéns! Agora você é um colaborador</h3>
			<p>Em breve você receberá pelos correios um kit facilitador na sua casa e se tornará apto a solicitar coletas!<br>
			Volte assim que seu kit chegar.				 
			</p>
		</div>
		<div v-if="!scheduled&&receivedKit">
			<b-row>
				<b-col cols="12">
					<p>Informe a quantidade de óleo armazenado para solicitar uma coleta.
					Assim que possível, avisaremos sobre a data agendada em que o coletor passará na sua região.</p>
				</b-col>
			</b-row>
			<b-row>
				<b-col cols="6" class="vertical-align">
					<p class="scheduling-text">Quantidade de Litros</p>
					<div>
						<span class="arrow" v-on:click="addLiter">
							<icon name="chevron-up" scale="3"></icon>
						</span>
						<span class="scheduling-liters" >{{liters}}</span>
						<span class="arrow" v-on:click="removeLiter">
							<icon name="chevron-down" scale="3"></icon>
						</span>	
					</div>	
				</b-col>
				<b-col offset="2" cols="4" class="vertical-align">
					<div class="scheduling-points">
						<p>Pontos</p>
						<span class="points">{{points}}</span>
					</div>			
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b-button :disabled="liters==0" class="btn-agendar" v-on:click="schedule" >Agendar!</b-button>
				</b-col>
			</b-row>
		</div>
		<div v-if="scheduled&&receivedKit" class="scheduling-info">
			<h3>Coleta Solicitada!</h3>

			<span><b>Dia da solicitação: </b>{{requestDate}}</span> <br>
			<span class="scheduling-date"><b>Dia da coleta:</b> {{schedulingDate}}</span>
			<p> Para viabilizar nosso serviço, agendamos as coletas de acordo com a quantidade de óleo disponível em cada região. Se o <b>dia da coleta</b> ainda não foi definido, pode relaxar! Enviaremos um aviso por <b>SMS</b> informando a data da coleta assim que for marcada. Para isso, verifique na sessão 'Dados' se a opção de '<b>Receber SMS</b>' está ativada.<br>
			Se você trocou alguma <b>recompensa</b>, ela será deixada no seu recipiente de coleta!  
			</p>
		</div>
	</div>

	
	
</template>

<script>
import firebase from 'firebase';

var config = {
	apiKey: "AIzaSyDdBcbCkoy19iwJr1ATMJLMsq8gf_4GQHI",
	authDomain: "descarte-oleo.firebaseapp.com",
	databaseURL: "https://descarte-oleo.firebaseio.com",
	projectId: "descarte-oleo",
	storageBucket: "descarte-oleo.appspot.com",
	messagingSenderId: "428516539350"
};
var FBApp = firebase.initializeApp(config,'scheduling');
FBApp = FBApp.database();

export default{
	data: function(){
		return{
			liters:0,
			scheduled:false,
			requestDate:'',
			today:'',
			receivedKit:false,
			schedulingDate:''
		}
	},
	firebase: function(){
    	return{
    		schedules: FBApp.ref('/scheduling/')
    	}
    },
	methods: {
		addLiter(){
			this.liters++;
		},
		removeLiter(){
			if(this.liters!==0){
				this.liters--;
			}			
		},
		schedule(){
			this.$firebaseRefs.schedules.child(this.qrCode).set({
	      		date:this.today,
	      		finished:false,
	      		liters:this.liters
      		});
		}
	},
	props:['qrCode'],
    mounted(){
		var ref = this;
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!

		var yyyy = today.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		} 
		this.today = dd+'/'+mm+'/'+yyyy;

		var schedulingDate = new Date();

		schedulingDate.setDate(today.getDate() + 3);
		var dd = schedulingDate.getDate();
		var mm = schedulingDate.getMonth()+1; //January is 0!

		var yyyy = schedulingDate.getFullYear();
		if(dd<10){
		    dd='0'+dd;
		} 
		if(mm<10){
		    mm='0'+mm;
		} 
		this.schedulingDate = dd+'/'+mm+'/'+yyyy;
	

		FBApp.ref('/scheduling/'+this.qrCode).on('value',function(snapshot){
			if(snapshot.val()==null){
				ref.scheduled=false;			
			}else if(snapshot.val().finished){
					ref.scheduled=false;										
			}else{
					ref.scheduled=true;	
					ref.requestDate=snapshot.val().date;									
			}
		});
		FBApp.ref('/qrcodes/'+this.qrCode).on('value',function(snapshot){
			if(snapshot.val().receivedKit==true){
				ref.receivedKit = true;
			}else{
				ref.receivedKit = false;
			}
		});
	},
	computed:{
		points: function(){
			return this.liters * 5;
		}
	}
}
	

</script>

<style lang="scss">
	.scheduling{
		-webkit-touch-callout: none;  /* iPhone OS, Safari */
	    -webkit-user-select: none;    /* Chrome, Safari 3 */
	    -khtml-user-select: none;     /* Safari 2 */
	    -moz-user-select: none;       /* Firefox */
	    -ms-user-select: none; 
	    color:#58541E;
		.vertical-align{
			display: flex;
			align-items:center;
		}
		
		.welcome-message{
			margin-top: 10px;
			text-align: center;
			p{
				font-size: 1.2em;
			}
		}
		&-info{
			span{
				font-size: 20px;	
			}
				
			
			p{
				margin-top: 25px;
			}
		}
		&-date{
			color:#90A93D;
		}
		
		&-text{
			font-size: 1em;
			text-align: center;
			line-height: 1.2em;
			@media screen and (min-width: 768px){
				font-size: 1.5em;
			}
		}
		&-liters{
			font-family: 'Helvetica-Medium';
			font-size: 3em;
			color:#D1AB2B;
			text-align: center;
			width: 100%;
			display:block;
		}
		.arrow{
			cursor:pointer;
			display: block;
			text-align: center;
			svg{
				fill:#90A93D;
			}
		}
		&-points{
			text-align: center;
			font-size: 1em;
			@media screen and (min-width: 768px){
				font-size: 1.5em;
			}
			p{
				font-size: 1em;
				margin:0;
			}
			.points{
				display: block;
				font-size: 1.5em;
				color:#90A93D;
				@media screen and (min-width: 768px){
    				margin-top: -14px;
    			}
			}
		}
		.btn-agendar{
			margin-top: 40px;
			width: 100%;
			padding:15px 0;
			background-color:#58541E;
	        border:#58541E;
	        cursor:pointer;
	        font-size: 21px;
	        &:hover{
	          background-color: #D1AB2B;
	          border:#D1AB2B;
	        }
		}
	}
</style>