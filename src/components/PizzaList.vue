<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import pizzas from '@/assets/pizzas'
import Pizzas from '@/types/Pizzas'

export default defineComponent({
  setup() {
    const pizzaList: Array<Pizzas> = pizzas
    console.log(pizzaList)
    return {
      pizzaList
    }
  },
})
</script>
