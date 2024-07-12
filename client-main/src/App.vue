<template>
  <!-- O RouterView é um componente do Vue Router que renderiza o componente correspondente à rota atual -->
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
#app {
  margin-top: 60px; /* Adiciona uma margem superior de 60 pixels ao elemento com ID app */
}
</style>
