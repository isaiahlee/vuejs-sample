<template>
  <div id="app">
    <img src="../assets/logo.png">
    <HelloVueJS />
    <p>{{message}}</p>
  </div>
</template>

<script>
import HelloVueJS from '../../common/vue/exampleVue';
import ExampleClass from '../../common/js/exampleClass';

const exampleClass = new ExampleClass('example main', 0, 'Example Sub', [1, 2, 3, 4]);
export default {
    name: 'App',
    components: {
        HelloVueJS
    },
    data: function() {
        return {
            message: exampleClass.getMessage()
        };
    }
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
