<template>
    <div id="app">
        <img src="./assets/logo.png">
        <p>{{message}}</p>
    </div>
</template>

<script>
import ExampleClass from '../common/js/exampleClass';

const exampleClass = new ExampleClass('example main', 0);
export default {
    name: 'App',
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
