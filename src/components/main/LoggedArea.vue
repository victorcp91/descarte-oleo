<template>
	<b-row>
		<b-col cols="12" offset-md="2" md="8" offset-lg="2" lg="8">
		    <b-tabs pills card>
		        <b-tab class="tab" title="Agendamento" active>
		            <app-scheduling :qrCode='qrCode'></app-scheduling>
		        </b-tab>
		        <b-tab class="tab" title="Recompensas">
		           	<app-reward :qrCode='qrCode' :userPoints="userPoints"></app-reward>
		        </b-tab>
		        <b-tab class="tab"  title="Dados">
		           	<app-updateRegister :qrCode='qrCode'></app-updateRegister>
		        </b-tab>	        
		    </b-tabs>
		</b-col>
	</b-row>
</template>

<script>
	import Scheduling from './features/Scheduling.vue';
	import UpdateRegister from './features/UpdateRegister.vue';
	import Reward from './features/Reward.vue';


	export default { 
  		components:{
  			'app-scheduling' : Scheduling,
  			'app-updateRegister' : UpdateRegister,
  			'app-reward' : Reward
  		},
  		props:['qrCode','userPoints'],
  		created: function(){
  			document.getElementsByTagName("body")[0].style.backgroundColor = "white";
  		}
	}

</script>

<style lang="scss">
	.card-header{
		background-color: white;
		height: 65px;
		&-pills{
			position: relative;
    		float: right;
    		margin-left: -5px;
    		.nav-item a{
    			padding:10px;
    		}   
    		.nav-link{
    			color:#90A93D;
    		}
    		.nav-link.active{
    			background-color:#90A93D;
    			color:white;
    			padding: .5rem .7rem;
    		} 		
		}
	}
	.card-body{
		padding:0 0 15px 0;
	}
</style>