<template>
	<div class="login">  
		<app-header :logged="login"></app-header>
		<div class="user-info-container">
		<b-row class="user-info" v-if="login">
				<b-col cols="7" offset-md="2" md="6" offset-lg="3" lg="5" >
					<span class="user">{{userName}}</span>
				</b-col>
				<b-col cols="5" md="4" lg="3">
					<span class="points-text">Pontos:</span>
					<span class="points">{{userPoints}}</span>
				</b-col>
		</b-row>
		</div>
		<b-row>
			<b-col cols="12" offset-md="3" md="6" offset-lg="4" lg="4">
				<b-input-group class="default">
				    <b-form-input class="qr-input" size="lg" type="number" :disabled="cadastro||passField||login||loading" v-model="qrCode" placeholder="Código QR" />
				    <b-input-group-button>
				       <b-button v-on:click="verifyQr(qrCode)" v-if="!(passField||cadastro||login||loading)" size="lg" >OK!</b-button>
				    </b-input-group-button>
				</b-input-group>

			</b-col>	
		</b-row>
		
		<app-cadastro v-if="cadastro" :qrCode="qrCode" v-on:finish="finishCadastro"></app-cadastro>
		
		<b-row v-if="passField" class="passField">
			<b-col cols="12" offset-md="3" md="6" offset-lg="4" lg="4">
				<b-input-group class="default">
				    <b-form-input type="number" v-model="cpf" placeholder="CPF" />
				    <b-input-group-button>
				       <b-button v-on:click="verifyCpf(cpf)" size="lg">OK!</b-button>
				    </b-input-group-button>
				</b-input-group>

				<b-alert :show="dismissCountDown"
				            dismissible
				            variant="warning"	
				            @dismissed="dismissCountDown=0"
				            @dismiss-count-down="countDownChanged">
				   	<span v-show="!passField">Código QR inválido!</span>
				   	<span v-show="passField">Senha Inválida</span>
				</b-alert>
			</b-col>	
		</b-row>

		<app-logged-area v-if="login" :qrCode="qrCode" :userPoints="userPoints"></app-logged-area>


	</div>
</template>

<script>
	import Cadastro from './Cadastro.vue';
	import LoggedArea from './LoggedArea.vue';
	import Header from '../Header.vue';
	import firebase from 'firebase';



	var config = {
		apiKey: "AIzaSyDdBcbCkoy19iwJr1ATMJLMsq8gf_4GQHI",
		authDomain: "descarte-oleo.firebaseapp.com",
		databaseURL: "https://descarte-oleo.firebaseio.com",
		projectId: "descarte-oleo",
		storageBucket: "descarte-oleo.appspot.com",
		messagingSenderId: "428516539350"
	};
	var FBApp = firebase.initializeApp(config,'login');
	FBApp = FBApp.database();

	export default { 
		
		components:{
			'app-cadastro' : Cadastro,
			'app-logged-area' : LoggedArea,
			'app-header' : Header,
		},
		data : function(){
			return {
				qrCode: '',
				cpf:'',
				dismissSecs: 2,
    			dismissCountDown: 0,
    			showDismissibleAlert: false,
				cadastro:false,
				passField:false,
				login:false,
				userName:'',
				userPoints:'',
				loading:false
			}
		},
		firebase: function(){
			return{
				qrcodes: FBApp.ref('/qrcodes/'),
			}			
		},
		mounted(){
			var qr=this.getParameter('qr');
			var ref = this;
			if(qr){
				this.qrCode=qr;
				this.loading=true;
				FBApp.ref('/qrcodes/'+this.qrCode).on('value',function(snapshot){
					if(snapshot.val()){
						ref.passField=true;						
					}else{
						ref.cadastro=true;						
					}
				});
			}
		},
		methods:{
			verifyQr(qr){
				if(qr.length>=8){
					for(let i=0;i<this.qrcodes.length;i++){
						if(qr==this.qrcodes[i]['.key']){
							this.passField=true;
							break;
						}						
					}
					if(!this.passField){
						this.cadastro=true;
					}	
				}else{
					this.dismissCountDown = this.dismissSecs;
				}
			},
			verifyCpf(cpf){
				var ref = this;
				FBApp.ref('/qrcodes/'+this.qrCode).on('value',function(snapshot){
					if(ref.cpf==snapshot.val().cpf){
						ref.login=true;
						ref.passField=false;
						ref.loadUserInfo();
					}else{
						ref.dismissCountDown = ref.dismissSecs;
					}
				});
			},
			finishCadastro(){
				this.login=true;
				this.passField=false;
				this.cadastro=false;
				this.loadUserInfo();
			},
			countDownChanged(dismissCountDown) {
		      this.dismissCountDown = dismissCountDown;
		    },
		    loadUserInfo(){
		    	var userInfo = this;
	    		FBApp.ref('/qrcodes/'+this.qrCode).on('value',function(snapshot){
	    	  		userInfo.userName = snapshot.val().name;
	    	  		userInfo.userPoints = snapshot.val().points;
	    	  	});
		    },
		    getParameter(name, url) {
		        if (!url) url = window.location.href;
		        name = name.replace(/[\[\]]/g, "\\$&");
		        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		            results = regex.exec(url);
		        if (!results) return null;
		        if (!results[2]) return '';
		        return decodeURIComponent(results[2].replace(/\+/g, " "));
		    }
		},
	}

</script>

<style lang="scss">
	.qr-input{
		text-align: center;
	}
	.passField{
		padding:25px 0;
	}
	.user-info-container{
		padding: 15px 0;
    	height: 50px;
    	font-size: 1.4em;
    	font-weight: bold;
    	color:#58541E;
    	.user,.points{
    		font-weight: normal;
    		font-size: .8em;
    	}
    	.points-text{
			font-weight: normal;
    	}
	}
	
</style>