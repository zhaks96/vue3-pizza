<template>
  <div class="container-basket-list">
    <div class="header">
      <div class="header-flex">
        <el-icon style="margin-right: 18px;" :size="28"><ShoppingCart /></el-icon>
        <h1>Корзина</h1>
      </div>
      <div class="header-flex">
        <el-button class="btn-remove" text @click="clearCart">
          <el-icon style="margin-right: 11px;" :size="20" color="#B6B6B6">
            <Delete />
          </el-icon>
          <span style="margin: 3px 0 0">Очистить корзину</span>
        </el-button>
      </div>
    </div>
    <div class="basket-list" v-for="basket in basketList" :key="`basket-list-${basket.items[0].id}`">
      <div class="basket-list-info">
        <el-image class="pizza-img" :src="basket.items[0].imageUrl" fit="contain" />
        <div class="pizza-info">
          <span>{{ basket.items[0].name }}</span>
          <p>{{ selectedType[basket.items[0].selectedType] }} тесто, {{ basket.items[0].selectedSize }} см.</p>
        </div>
      </div>
      <div class="basket-total">
        <el-button circle @click.prevent="handleChange(basket, 'minus')" color="#FE5F1E" plain
        :disabled="basket.totalCount === 1">
          <el-icon><Minus /></el-icon>
        </el-button>
        <span class="basket-total-count">{{ basket.totalCount }}</span>
        <el-button circle @click.prevent="handleChange(basket, 'plus')" color="#FE5F1E" plain>
          <el-icon><Plus /></el-icon>
        </el-button>
      </div>
      <span class="price">{{ basket.items[0].price * basket.totalCount }} ₸</span>
      <el-button circle @click="removeItem(basket.items[0])">
        <el-icon><Close /></el-icon>
      </el-button>
    </div>
    <div class="footer">
      <el-button class="btn-back" plain round size="large" @click="$router.push({ name: 'Home' })">
        <el-icon style="margin-right: 11px;" :size="14"><ArrowLeft /></el-icon>Вернуться назад
      </el-button>
      <el-button class="el-button--yellow" size="large" round>
        Оплатить сейчас
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, } from 'vue'
import { useStore, } from 'vuex'
import Pizzas from '@/types/Pizzas'

export default defineComponent({
  setup() {
    const store = useStore()
    const basketList = computed(() => {
      const { items, } = store.state
      const newBaketList = Object.keys(items,).map((key,) => {
        return items[key]
      },)
      return newBaketList.flat()
    },)

    const selectedType = {
      0: 'тонкое',
      1: 'традиционное',
    }

    const removeItem = (item: Pizzas,) => {
      store.commit('REMOVE_CART_ITEM', { itemId: item.id, },)
    }
    const clearCart = () => {
      store.commit('CLEAR_CART',)
    }
    const handleChange = (basket: any, type: string,) => {
      if (type === 'plus') {
        basket.totalCount++
        store.commit('PLUS_CART_ITEM', { itemId: basket.items[0].id, },)
      } else if (basket.totalCount > 1) {
        basket.totalCount--
        store.commit('MINUS_CART_ITEM', { itemId: basket.items[0].id, },)
      }
    }

    return {
      basketList,
      selectedType,
      removeItem,
      clearCart,
      handleChange,
    }
  },
},)
</script>

<style lang="scss" scoped>
.container-basket-list{
  display: flex;
  flex-direction: column;
  width: 820px;
  .header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    width: 100%;
    &-flex{
      display: flex;
      align-items: center;
      h1{
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 39px;
        letter-spacing: 0.01em;
        color: var(--v-black);
      }
      .btn-remove{
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #B6B6B6;
      }
    }
  }
  .basket-list{
    display: flex;
    // justify-content: space-between;
    align-items: center;
    padding: 30px 0;
    border-top: 1px solid #F4F4F4;
    &-info{
      width: 375px;
      display: flex;
      align-items: center;
      .pizza-img{
        width: 80px;
        height: 80px;
        margin-right: 15px;
      }
      .pizza-info{
        display: flex;
        flex-direction: column;
        & > span{
          font-family: 'Proxima Nova';
          font-style: normal;
          font-weight: 700;
          font-size: 22px;
          line-height: 27px;
          letter-spacing: 0.01em;
          color: var(--v-black);
          margin: 0;
        }
        & > p{
          font-family: 'Proxima Nova';
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 22px;
          letter-spacing: 0.01em;
          color: #8D8D8D;
          margin: 0;
        }
      }
    }
    .pizza-input-number{
      margin: 0 22px;
    }
    .price{
      font-family: 'Proxima Nova';
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 27px;
      letter-spacing: 0.01em;
      color: #000000;
      margin: 0 auto;
    }

    .basket-total{
      display: flex;
      align-items: center;
      &-count{
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 700;
        font-size: 22px;
        line-height: 27px;
        letter-spacing: 0.01em;
        color: var(--v-black);
        margin: 0 12px;

      }
    }
  }
  .footer{
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    .btn-back{
      font-family: 'Proxima Nova';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      color: #CACACA;
    }
  }
}
</style>
