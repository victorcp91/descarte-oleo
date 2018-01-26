<template>
	<b-row class="reward">
		<b-modal ref="rewardFeedback" hide-footer title="Recompensa solicitada!">
		    <div class="d-block text-center">
		        <p>Parabens! Sua recompensa será depositada na sua caixa de armazenamento na próxima coleta.</p>
		    </div>
		    <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">FECHAR</b-btn>
		</b-modal>
		<p class="reward-message">Troque seus pontos por produtos fabricados a partir do óleo que você doa!</p>
		<table aria-busy="false" class="table b-table table-striped table-hover">
			<thead class="">
				<tr>
					<th class="">
						<div>Recompensa</div>
					</th>
					<th class="">
						<div>Pontos</div>
					</th>
					<th>
						<div></div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr class="">
					<td class="">5 sabonetes</td>
					<td class="">20</td>
					<td >
						<b-button class="btn-agendar" :disabled="items[0].Pontos>userPoints" v-on:click="takeReward(items[0].Pontos)">Trocar!</b-button>
					</td>
				</tr>
				<tr class="">
					<td class="">5 velas</td>
					<td class="">20</td>
					<td >
						<b-button class="btn-agendar" :disabled="items[1].Pontos>userPoints" v-on:click="takeReward(items[1].Pontos)">Trocar!</b-button>
					</td>
				</tr>
				<tr class="">
					<td class="">15 sabonetes e 15 velas</td>
					<td class="">80</td>
					<td >
						<b-button class="btn-agendar" :disabled="items[2].Pontos>userPoints" v-on:click="takeReward(items[2].Pontos)">Trocar!</b-button>
					</td>
				</tr>
				<tr class="">
					<td class="">20 sabonetes e 20 velas</td>
					<td class="">100</td>
					<td >
						<b-button class="btn-agendar" :disabled="items[3].Pontos>userPoints" v-on:click="takeReward(items[3].Pontos)" >Trocar!</b-button>
					</td>
				</tr>
			</tbody>
		</table>
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
var FBApp = firebase.initializeApp(config,'reward');
FBApp = FBApp.database();

export default{
	data: function(){
		return{
		    // Note 'isActive' is left out and will not appear in the rendered table
			fields: [
			    {
			    key: 'Recompensa'
			    },
			    {
			    key: 'Pontos'
			    },
			    {
			    key: 'Retirar',
			    label: ' ',
			    // Variant applies to the whole column, including the header and footer
			    variant: 'warning'
			    }
			],
		    items: [
		      {   Pontos: '20', Recompensa: '5 sabonetes' },
		      {   Pontos: '20', Recompensa: '5 velas' },
		      {   Pontos: '80', Recompensa: '15 sabonetes e 15 velas' },
		      {   Pontos: '100', Recompensa: '20 sabonetes e 20 velas' }
		    ]
			
		}
	},
	props:['userPoints','qrCode'],

	firebase: function(){
    	return{
    		qrcode: FBApp.ref('/qrcodes/'+this.qrCode)
    	}
    },
	methods:{
		takeReward(p){
	      	this.$firebaseRefs.qrcode.update({
	      		points: (this.userPoints - p),
	      	});
	      	this.showModal();
      	},
      	showModal() {
  	      this.$refs.rewardFeedback.show()
  	    },
  	    hideModal() {
  	      this.$refs.rewardFeedback.hide()
  	    }	
	}
}
	

</script>

<style lang="scss">
	.reward{
		color:#58541E;
		td,th{
		text-align:center;
		}
		td:first-child,th:first-child{
			text-align: left;
		}
		.btn-agendar{
			padding:13px;
			background-color: #58541E;
		}
		&-message{
			text-align:center;
			margin:0;
			width: 100%;	
		}
	}
	
	
</style>