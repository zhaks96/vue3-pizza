<template>
  <div class="container-sort">
    <div class="container-sort__block1">
      <el-button v-for="sortByPizza in sortByPizzas" 
        :key="`sortByPizza-${sortByPizza.id}`"
        size="large" plain round class="el-button--gray" 
        :class="{'active-btn-gray': checkedSortByPizza === sortByPizza.type}"
        @click="checkedSortByPizza = sortByPizza.type">{{sortByPizza.name}}</el-button>
    </div>
    {{checkedSortByPizza}}
    <div class="container-sort__block2">
      <el-icon style="margin-right: 7px;"><caret-bottom /></el-icon>
      <span class="sort-text">Сортировка по:</span>
      <el-dropdown>
        <span class="el-dropdown-link" style="min-width: 95px">
          {{typeText.name}}
        </span>
        <template #dropdown>
          <el-dropdown-menu v-model="type">
            <el-dropdown-item 
              v-for="sortType in sortTypes" 
              :key="`sort-type-${sortType.id}`" 
              class="dropdown-item"
              :class="{'active-item': sortType.type === type}"
              @click="changeSortType(sortType.type)">
              {{sortType.name}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, } from 'vue'
import SortType from '@/types/SortType'
import OrderTerm from '@/types/OrderTerm'

export default defineComponent({
  setup() {
    const sortTypes = ref<SortType[]>([
      {id:1, name: 'популярности', type: 'byPopular'},
      {id:2, name: 'по цене', type: 'byPrice'},
      {id:3, name: 'по алфавиту', type: 'byAlphabet'},
    ])

    const sortByPizzas = ref<SortType[]>([
      {id:1, name: 'Все', type: 'all'},
      {id:2, name: 'Мясные', type: 'byMeat'},
      {id:3, name: 'Вегетарианская', type: 'byVegetarian'},
      {id:4, name: 'Гриль', type: 'byGrill'},
      {id:5, name: 'Острые', type: 'bySpicy'},
      {id:6, name: 'Закрытые', type: 'byClosed'},
    ])

    let type = ref<OrderTerm>('byPopular')
    let checkedSortByPizza = ref('all')

    const changeSortType = (typeNew: OrderTerm) => {
      console.log(typeNew)
      type.value = typeNew
    }
    const typeText = computed(() => {
      return sortTypes.value.filter((v) => v.type === type.value)[0]
    })

    const pizzaList = computed(() => {
      return []
    })
    

    return {
      sortTypes,
      type,
      changeSortType,
      typeText,
      sortByPizzas,
      checkedSortByPizza,
      pizzaList
    }
  },
})
</script>

<style lang="scss" scoped>
.container-sort{
  display: flex;
  justify-content: space-between;
  margin: 40px 0 32px;
  &__block1{
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
  &__block2{
    display: flex;
    align-items: center;
    min-width: 227px;
    .sort-text{
      font-family: 'Proxima Nova';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.015em;
      color: var(--v-black-700);
      margin-right: 8px;
    }
    .el-dropdown-link{
      font-family: 'Proxima Nova';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.015em;
      color: var(--v-yellow-900);  
      border-bottom: 1px dashed #FE5F1E;
      cursor: pointer;
    }
  }
}
</style>