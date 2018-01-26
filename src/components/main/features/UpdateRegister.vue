<template>
  	<b-row class="updateRegister" no-gutters>
  		<b-col>
		    <b-form @submit="onSubmit">
			    <b-form-group id="nameGroup" label-for="name">
			    	<b-form-input :disabled="!update" id="name" type="text" v-model="form.name" required		                      placeholder="Nome Completo"></b-form-input>
			    </b-form-group>
			    <b-form-group id="addressGroup"label-for="address">
			    	<b-form-input :disabled="!update" id="address" type="text" v-model="form.address" required		                      placeholder="Endereço"></b-form-input>
			    </b-form-group>
			    <b-row no-gutters>
				    <b-col cols="4" no-gutters>
					    <b-form-group id="addressNumberGroup" label-for="addressNumber">
					    	<b-form-input :disabled="!update" id="addressNumber" type="text" v-model="form.addressNumber" required		                      placeholder="Número"></b-form-input>
					    </b-form-group>
					</b-col>
					<b-col cols="7" offset="1" no-gutters>
					    <b-form-group id="addressComplementGroup"label-for="addressComplement">
					    	<b-form-input :disabled="!update" id="addressComplement" type="text" v-model="form.addressComplement"	 placeholder="Complemento"></b-form-input>
					    </b-form-group>
					</b-col>
				</b-row>
				
 				<b-form-group id="cepGroup" label-for="cep">
			    	<b-form-input id="cep" :disabled="!update" type="number" v-model="form.cep" required
			        placeholder="CEP"></b-form-input>
			    </b-form-group>
			    
				<b-form-group id="telGroup" label-for="tel" class="telForm">
			    	<b-form-input :disabled="!update" id="tel" type="number" v-model="form.tel" require
			    	placeholder="Telefone"></b-form-input>
			    </b-form-group>
			    <b-form-checkbox :disabled="!update" size="lg" id="sms" v-model="form.sms" value="true" unchecked-value="false">
			        Receber SMS
			     </b-form-checkbox>

			    <b-form-group id="cpfGroup" label-for="cpf"
			    description="O CPF cadastrado será sua senha de acesso.">
			    	<b-form-input :disabled="!update" id="cpf" type="number" v-model="form.cpf" required
			        placeholder="CPF"></b-form-input>
			    </b-form-group>
			    
			    <b-button class="btn-update" v-if="!update" v-on:click="startUpdate">Editar</b-button>
			    <b-row v-if="update">
				    <b-col cols='6' >
				    	<b-button class="btn-update" v-on:click="cancelUpdate" variant="danger">Cancelar</b-button>
				    </b-col>
				    <b-col cols='6'>
				    	<b-button class="btn-update"  v-on:click="confirmUpdate">Atualizar Dados!</b-button>
				    </b-col >
			    </b-row>
			</b-form>
		</b-col>
	</b-row>
</template>

<script>

import firebase from 'firebase';

let config = {
	apiKey: "AIzaSyDdBcbCkoy19iwJr1ATMJLMsq8gf_4GQHI",
	authDomain: "descarte-oleo.firebaseapp.com",
	databaseURL: "https://descarte-oleo.firebaseio.com",
	projectId: "descarte-oleo",
	storageBucket: "descarte-oleo.appspot.com",
	messagingSenderId: "428516539350"
};
let FBApp = firebase.initializeApp(config,'updateRegister');
FBApp = FBApp.database();

  export default {
    props:['qrCode'],

    firebase: function(){
    	return{
    		qrcode: FBApp.ref('/qrcodes/'+this.qrCode)
    	}
    },
    data: function(){
    	return{
    		form: {
    		  name: '',
    		  address: '',
    		  addressNumber: '',
    		  addressComplement: '',
    		  tel: '',
    		  sms:'',
    		  cpf:'',
    		  cep:''
    		}
    		,update:false
    	}      
    },
    mounted(){
    	var user = this;
    	FBApp.ref('/qrcodes/'+this.qrCode).on('value',function(snapshot){
      		user.form.name = snapshot.val().name;
      		user.form.address = snapshot.val().address;
      		user.form.addressNumber = snapshot.val().addressNumber;
      		user.form.addressComplement = snapshot.val().addressComplement;
      		user.form.tel = snapshot.val().tel;
      		user.form.cep = snapshot.val().cep;
      		user.form.cpf = snapshot.val().cpf;
      		user.form.sms = snapshot.val().sms;

      	});
    }
    ,
    methods: {
      onSubmit(evt) {
      	evt.preventDefault();
      },
      startUpdate(){
      	this.update=true;
      },
      confirmUpdate(){
      	this.update=false;
      	this.$firebaseRefs.qrcode.update({
      		address: this.form.address,
      		addressNumber: this.form.addressNumber,
      		addressComplement: this.form.addressComplement,
      		cpf: this.form.cpf,
      		cep: this.form.cep,
      		name: this.form.name,
      		tel: this.form.tel,
      		sms: this.form.sms
      	});
      },
      cancelUpdate(){
      	this.update=false;
  		var user = this;
  		FBApp.ref('/qrcodes/'+this.qrCode).on('value',function(snapshot){
  	  		user.form.name = snapshot.val().name;
  	  		user.form.address = snapshot.val().address;
  	  		user.form.addressNumber = snapshot.val().addressNumber;
  	  		user.form.addressComplement = snapshot.val().addressComplement;
  	  		user.form.tel = snapshot.val().tel;
  	  		user.form.cep = snapshot.val().cep;
  	  		user.form.cpf = snapshot.val().cpf;
  	  		user.form.sms = snapshot.val().sms;
  	  	});
      }
    }
  }
</script>

<style lang="scss">
	.updateRegister{
		.btn-update{
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