<template>
  <div class="container-basket">
    <BasketEmpty v-if="!isEmpty" />
    <BasketList v-else />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, } from 'vue'
import { useStore, } from 'vuex'
import BasketEmpty from './Basket/Empty.vue'
import BasketList from './Basket/List.vue'

export default defineComponent({
  components: {
    BasketEmpty,
    BasketList,
  },
  setup() {
    const store = useStore()
    const isEmpty = computed(() => Object.keys(store.state.items,).length > 0,)
    return {
      isEmpty,
    }
  },
},)
</script>

<style lang="scss" scoped>
.container-basket{
  padding: 50px 0;
  display: flex;
  justify-content: center;
}
</style>
