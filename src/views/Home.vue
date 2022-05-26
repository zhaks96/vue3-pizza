<template>
  <div class="home">
    <SortView/>
    <h1>Все пиццы</h1>
    <PizzaList />
  </div>
</template>

<script lang="ts">
import { defineComponent, } from 'vue'
import SortView from '@/components/SortView.vue'
import PizzaList from '@/components/PizzaList.vue'

export default defineComponent({
  name: 'Home',
  components: {
    SortView,
    PizzaList,
  },
},)
</script>

<style lang="scss" scoped>
.home{
  display: flex;
  flex-direction: column;
  padding: 0 48px;
  h1{
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    letter-spacing: 0.01em;
    color: var(--v-black);
  }
}
</style>
