<template>
  <main class="main">
    <Header />
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent, } from 'vue'
import Header from '@/components/Header.vue'

export default defineComponent({
  components: {
    Header,
  },
},)
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .main {
    max-width: 1340px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.03);
    border-radius: 10px;
    margin: 0 auto;
    padding-bottom: 50px;
  }
}
</style>
