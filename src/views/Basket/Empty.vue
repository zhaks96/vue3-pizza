<template>
  <div class="container-empty">
    <h1>Корзина пустая 😕</h1>
    <span class="empty-gray">Вероятней всего, вы не заказывали ещё пиццу.</span>
    <span class="empty-gray">Для того, чтобы заказать пиццу, перейди на главную страницу.</span>
    <basketEmpty class="empty-icon" />
    <el-button type="info" round size="large" @click="$router.push({ name: 'Home' })">Вернуться назад</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, } from 'vue'
import basketEmpty from '@/icons/basketEmpty.vue'

export default defineComponent({
  components: {
    basketEmpty,
  },
  setup() {
    const title = 'Корзина пустая 😕'

    return {
      title,
    }
  },
},)
</script>

<style lang="scss" scoped>
.container-empty{
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1{
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 39px;
    letter-spacing: 0.01em;
    color: var(--v-black);
    margin-bottom: 10px;
  }
  .empty-gray{
    font-family: 'Proxima Nova';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 145.4%;
    text-align: center;
    letter-spacing: 0.01em;
    color: #777777;
  }
  .empty-icon{
    margin: 47px 0 74px 0;
  }
}
</style>
