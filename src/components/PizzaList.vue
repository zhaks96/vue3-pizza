<template>
  <div class="pizza-list-container">
    <div v-for="item in pizzaList" :key="`pizza-${item.id}`" class="pizza-list-wrap">
      <el-image class="pizza-img" :src="item.imageUrl" fit="contain" />
      <h4>{{ item.name }}</h4>
      <div class="pizza-types-size">
        <div style="margin-bottom: 7px">
          <el-radio-group v-model="item.selectedType" text-color="#2C2C2C" fill="#FFFFFF">
            <el-radio-button :label="0" :disabled="!item.types.includes(0)">тонкое</el-radio-button>
            <el-radio-button :label="1" :disabled="!item.types.includes(1)">традиционное</el-radio-button>
          </el-radio-group>
        </div>
        <el-radio-group v-model="item.selectedSize" text-color="#2C2C2C" fill="#FFFFFF">
          <el-radio-button :label="26" :disabled="!item.sizes.includes(26)">26 см.</el-radio-button>
          <el-radio-button :label="30" :disabled="!item.sizes.includes(30)">30 см.</el-radio-button>
          <el-radio-button :label="40" :disabled="!item.sizes.includes(40)">40 см.</el-radio-button>
        </el-radio-group>
      </div>
      <div class="pizza-footer">
        <span class="price">от {{item.price}} ₸</span>
        <el-button round plain size="large" type="yellow-outline" @click="addPizzaBasket(item)">
          <el-icon style="margin-right: 8px"><Plus /></el-icon> Добавить
          <span class="basket-count" v-if="pizzaBasketItems && pizzaBasketItems[item.id]">
            {{ pizzaBasketItems[item.id].totalCount }}
          </span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import pizzas from '@/assets/pizzas'
import Pizzas from '@/types/Pizzas'

export default defineComponent({
  setup() {
    const store = useStore()

    const pizzaNew = pizzas.map((m) => {
      return {
        ...m,
        selectedType: 0,
        selectedSize: 26
      }
    })
    const pizzaList = ref<Pizzas[]>(pizzaNew)
    const pizzaBasketItems = computed(() => store.state.items)
    
    const addPizzaBasket = (pizzaToAdd: Pizzas)=> {
      store.commit('ADD_PIZZA_CART', { payload: pizzaToAdd })
    }
    
    return {
      pizzaList, 
      addPizzaBasket,
      pizzaBasketItems
    }
  },
})
</script>

<style lang="scss" scoped>
.pizza-list-container{
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 36px);
  margin-left: -18px;
  .pizza-list-wrap{
    width: 280px;
    display: flex;
    flex-direction: column;
    margin: 18px;
    .pizza-img{
      width: 100%;
      height: 260px;
      margin-bottom: 11px;
    }
    & > h4{
      font-family: 'Proxima Nova';
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.01em;
      color: var(--v-black);
      margin: 0;
    }
    .pizza-types-size{
      background: var(--v-gray-500);
      border-radius: 10px;
      padding: 7px 6px;
      display: flex;
      flex-direction: column;
      margin: 22px 0 17px;
    }
    
    .pizza-footer{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .price{
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 700;
        font-size: 22px;
        line-height: 27px;
        letter-spacing: 0.015em;
        color: var(--v-black);
      }
      .basket-count{
        background: var(--v-yellow-800);
        padding: 3px 7px;
        font-family: 'Proxima Nova';
        font-style: normal;
        font-weight: 700;
        font-size: 13px;
        line-height: 16px;
        color: var(--v-white);
        border-radius: 50%;
      }
      .el-button--yellow-outline:hover{
        .basket-count{
          background: var(--v-white);
          color: var(--v-yellow-800);
        }
      }
    }

    ::v-deep .el-radio-group{
      width: 100%;
      flex-wrap: nowrap;
      .el-radio-button{
        width: 100%;
        &.is-disabled{
          opacity: 0.2;
        }
        .el-radio-button__inner{
          width: 100%;
          background: transparent;
          border: none;
          border-radius: 5px;
          font-family: 'Proxima Nova';
          font-style: normal;
          font-weight: 700;
          font-size: 14px;
          line-height: 17px;
          text-align: center;
          letter-spacing: 0.015em;
          color: var(--v-black-700);
          &:hover{
            background-color: rgb(255, 255, 255);
            border-color: rgb(255, 255, 255);
            color: rgb(44, 44, 44);
          }
        }
      }
    }
  }
}
</style>
