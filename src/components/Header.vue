<template>
  <header v-bind:class="{logged: logged}">
  	<b-container>
	  	<b-row>
		  	<b-col cols="12" offset-md="3" md="6" offset-lg="4" lg="4" class="logo-container">
		  		<img v-show="!logged" class="logo" src="src/assets/logo_recoleo.png" alt="Recóleo">
		  		<img v-show="logged" class="logo" src="src/assets/logo_recoleo2.png" alt="Recóleo">
		  	</b-col>	  		
	  	</b-row>
	</b-container>
  </header>
  		
</template>

<script>
	export default { 
  		props: ['logged']
	}

</script>

<style lang="scss">
	header{
		
		padding:40px 0 0 0;

		.logo-container{
			text-align: center;
		}
		.logo{
			width: 70%; 	
			@media screen and (min-width: 768px){
				width: 100%;
			}
		}
		&.logged{
			background-color: white;
			width: 100%;
			max-width: 100%;
			padding:20px 0;
			.logo{
				width:50%;
			}
		}
		
		
	}
</style>
