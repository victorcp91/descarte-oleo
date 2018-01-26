<template>
  <b-container class="main">    
    <app-login></app-login>
  </b-container>
</template>

<script>
  import Login from './components/main/Login.vue';

  export default { 
      components:{
        'app-login' : Login
      }
  }

</script>

<style lang="scss">
  
  @font-face {
    font-family: 'Giorgio-Thin';
    src: url('/fonts/Giorgio-Thin.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Giorgio';
    src: url('/fonts/Giorgio.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Helvetica-Bold';
    src: url('/fonts/Helvetica-Bold-Condensed-Plain.otf') format('opentype');
  }
  @font-face {
    font-family: 'Helvetica-Medium';
    src: url('/fonts/Helvetica-Medium-Condensed-Plain.otf') format('opentype');
  }

  body{
    font-family: 'Helvetica-Medium';
    position:relative;
    height: 100%;
    width: 100%;
    background-color: #90A93D;
    
    p{
      font-size: 18px;
    }

    input{
      font-size:18px !important;
      color:#58541E !important;
    }
    .custom-checkbox{
      .custom-control-input:checked~.custom-control-indicator{
        background-color:#58541E !important;
      }
      .custom-control-description{
        color:#58541E;
      }
    }
    .text-muted{
      color:#58541E !important;
      font-size:18px !important;
    }
  }
  
  h1,h2,h3,h4{
    
    color:#58541E;
  }

  .btn-secondary{
    background-color:#58541E;
    border:#58541E;
    cursor:pointer;
    font-size: 1.2em;
    &:hover{
      background-color: #D1AB2B;
      border:#D1AB2B;
    }
  }
  .btn-danger{
    font-size: 1.2em;
    cursor:pointer;
  }


  .default {  
    input{
      color:#58541E;
      font-size:22px !important;
    }
    button{
      font-family: 'Helvetica';
      font-size: 21px;
      background-color:#58541E;
      border:#58541E;
      cursor:pointer;
      &:hover{
        background-color: #D1AB2B;
        border:#D1AB2B;
      }
    }
  }
</style>
