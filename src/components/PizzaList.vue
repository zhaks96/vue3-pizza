<template>
  <div>
    <div v-if="load" class="pizza-list-container">
      <Skeleton v-for="index in [...new Array(sortedPizzas.length)]" :key="`skeleton-${index}`"  />
    </div>
    <div v-else class="pizza-list-container">
      <div v-for="item in sortedPizzas" :key="`pizza-${item.id}`" class="pizza-list-wrap">
        <div class="pizza-list-wrap-inner">
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
            <el-button round plain size="large" type="warning" @click="addPizzaBasket(item)">
              <el-icon style="margin-right: 8px"><Plus /></el-icon> Добавить
              <span class="basket-count" v-if="pizzaBasketItems && pizzaBasketItems[item.id]">
                {{ pizzaBasketItems[item.id].totalCount }}
              </span>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, } from 'vue'
import { useStore, } from 'vuex'
import axios from 'axios'
import pizzas from '@/assets/pizzas'
import Pizzas from '@/types/Pizzas'
import Skeleton from '@/components/Skeleton.vue'

export default defineComponent({
  components: {
    Skeleton,
  },
  setup() {
    const store = useStore()
    const load = ref(true,)

    const pizzaNew = pizzas.map((m,) => {
      return {
        ...m,
        selectedType: m.types[0],
        selectedSize: m.sizes[0],
      }
    },)
    const category = reactive(store.state,)
    const pizzaList = reactive<Pizzas[]>(pizzaNew,)
    const pizzaBasketItems = computed(() => store.state.items,)
    const sortedPizzas = computed(() => pizzaList.filter((p,) => {
      if (store.state.sortCategory === 'all') return p
      return p.category === store.state.sortCategory
    },),)
    
    const addPizzaBasket = (pizzaToAdd: Pizzas,)=> {
      store.commit('ADD_PIZZA_CART', { payload: pizzaToAdd, },)
    }
    setTimeout(() => {
      load.value = false
    }, 1000,)

    onMounted(() => {
      testServer()
    },)

    const testServer = async function() {
      await axios.get('/api/get',).then((response,) => {
        console.log(response,)
      },).catch((error,) => {
        console.error(error,)
      },)
    }
    
    return {
      addPizzaBasket,
      pizzaBasketItems,
      sortedPizzas,
      category,
      load,
    }
  },
},)
</script>

<style lang="scss" scoped>
.pizza-list-container{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 18px;
  column-gap: 18px;
  .pizza-list-wrap{
    display: flex;
    justify-content: center;
    .pizza-list-wrap-inner{
      width: 280px;
      display: flex;
      flex-direction: column;
      transition: all 0.2s ease-in-out;
      &:hover{
        transform: scale(1.03);
      }
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
}

@media screen and (max-width: 1372px) {
  .pizza-list-container{
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 1072px) {
  .pizza-list-container{
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 767px) {
  .pizza-list-container{
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
