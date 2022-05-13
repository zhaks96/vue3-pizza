<template>
  <div class="home">
    <SortView/>
  </div>
</template>

<script lang="ts">
import { defineComponent, } from 'vue';
import SortView from '@/components/SortView.vue'

export default defineComponent({
  name: 'Home',
  components: {SortView},
},);
</script>

<style lang="scss" scoped>
.home{
  display: flex;
  flex-direction: column;
  padding: 0 48px;
}
</style>
