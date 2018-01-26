<template>
  	<b-row class="cadastro">
  		<b-col cols="12" offset-md="2" md="8" offset-lg="3" lg="6">
  			<h4>Conte-nos apenas o básico!</h4>
		    <b-form @submit="onSubmit">
			    <b-form-group id="nameGroup" label-for="name">
			    	<b-form-input id="name" type="text" v-model="form.name" required		                      placeholder="Nome Completo"></b-form-input>
			    </b-form-group>
			    <b-form-group id="addressGroup"label-for="address">
			    	<b-form-input id="address" type="text" v-model="form.address" required		                      placeholder="Endereço"></b-form-input>
			    </b-form-group>
			    <b-row no-gutters>
				    <b-col cols="4" no-gutters>
					    <b-form-group id="addressNumberGroup" label-for="addressNumber">
					    	<b-form-input id="addressNumber" type="text" v-model="form.addressNumber" required		                      placeholder="Número"></b-form-input>
					    </b-form-group>
					</b-col>
					<b-col cols="7" offset="1" no-gutters>
					    <b-form-group id="addressComplementGroup"label-for="addressComplement">
					    	<b-form-input id="addressComplement" type="text" v-model="form.addressComplement"	 placeholder="Complemento"></b-form-input>
					    </b-form-group>
					</b-col>
				</b-row>
			     <b-form-group id="cepGroup" label-for="cep">
			    	<b-form-input id="cep" type="number" v-model="form.cep" required
			        placeholder="CEP"></b-form-input>
			    </b-form-group>
			    
				<b-form-group id="telGroup" label-for="tel" class="telForm">
			    	<b-form-input id="tel" type="number" v-model="form.tel" require
			    	placeholder="Telefone"></b-form-input>
			    </b-form-group>
			    <b-form-checkbox size="lg" id="sms" v-model="form.sms" value="true" unchecked-value="false">
			        Receber SMS
			     </b-form-checkbox>

		
			    <b-form-group id="cpfGroup" label-for="cpf"
			    description="O CPF cadastrado será sua senha de acesso.">
			    	<b-form-input id="cpf" type="number" v-model="form.cpf" required
			        placeholder="CPF"></b-form-input>
			    </b-form-group>
			    
			    <b-button class="btn-cadastrar" v-if="!success" type="submit">ME TORNAR UM COLABORADOR!</b-button>
			    <b-alert variant="success" v-if="success" show>Cadastro Efetuado com Sucesso!</b-alert>
			</b-form>
		</b-col>
	</b-row>
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
var FBApp = firebase.initializeApp(config,'cadastro');
FBApp = FBApp.database();

  export default {
    data: function(){
    	return{
    		form: {
    		  name: '',
    		  adress: '',
    		  addressNumber: '',
    		  addressComplement: '',
    		  tel: '',
    		  sms:true,
    		  cpf:'',
    		  cep:''
    		}
    		,success:false
    	}      
    },
    props:['qrCode'],
    firebase: function(){
    	return{
    		qrcodes: FBApp.ref('/qrcodes/')
    	}
    },
    methods: {
      onSubmit(evt) {
      	evt.preventDefault(); 

      	this.$firebaseRefs.qrcodes.child(this.qrCode).set({
      		address: this.form.address,
      		addressNumber: this.form.addressNumber,
      		addressComplement: this.form.addressComplement,
      		cpf: this.form.cpf,
      		name: this.form.name,
      		tel: this.form.tel,
      		points: 80,
      		sms:this.form.sms,
      		cep:this.form.cep,
      		receivedKit:false
      	});
      	this.success=true;
      	var ref=this;
      	setTimeout(function(){ 
      		ref.$emit('finish');
      	}, 3000);
      }
    }
  }
</script>

<style lang="scss">
	.cadastro{
		margin:25px 0;
		.btn-cadastrar{
			width: 100%;
			padding:15px 0;
		}
		.telForm{
			margin-bottom:0;
		}
		.custom-control-indicator{
			top: 0.55rem;
			width: 30px;
			height: 30px;
		}
		.custom-control-description{
			margin-left: 10px;
			font-size: .8em;
			line-height: 2em;
		}
	}
</style>