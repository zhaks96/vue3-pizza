<template>
  <div class="header">
    <div class="header-logo">
      <img src="../assets/logo.png" width="38" height="38" />
      <div class="header-logo-inner">
        <h1>Vue PIZZA</h1>
        <p>самая вкусная пицца во вселенной</p>
      </div>
    </div>
    <el-button class="el-button--yellow" size="large" round @click="$router.push({ name: 'Basket' })">
      <div class="basket-block">
        <span class="price">{{ pizzaBasketItems.totalPrice }} ₸</span>
        <span class="border-vertical"></span>
        <div class="basket-block__inner">
          <basket />
          <span>{{ pizzaBasketItems.totalCount }}</span>
        </div>
      </div>
    </el-button>
  </div>
</template>

<script lang="ts">
import basket from '@/icons/basket.vue'
import { computed, defineComponent, } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: { basket, },
  setup() {
    const store = useStore()

    const pizzaBasketItems = computed(() => store.state)

    return {
      pizzaBasketItems
    }
  },
},)
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 40px 38px 40px 77px;
  border: 1px solid var(--v-gray-400);
  align-items: center;
  &-logo {
    display: flex;
    align-items: center;
    img {
      margin-right: 17px;
    }
    &-inner {
      display: flex;
      flex-direction: column;
      & > h1 {
        font-style: normal;
        font-weight: 800;
        font-size: 24px;
        line-height: 29px;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: var(--v-black-800);
      }
      & > p {
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: var(--v-gray-800);
        margin-bottom: 0;
      }
    }
  }
  .basket-block {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: var(--v-white);
    .border-vertical {
      width: 1px;
      height: 25px;
      background: rgba(255, 255, 255, 0.25);
      margin: 0 13px;
    }
    &__inner {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        margin-right: 8px;
      }
    }
  }
}
</style>
