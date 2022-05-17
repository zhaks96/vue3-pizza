<template>
  <div class="container-sort">
    <div class="container-sort__block1">
      <el-button v-for="category in categories" 
        :key="`category-${category.id}`"
        size="large" plain round class="el-button--gray" 
        :class="{'active-btn-gray': checkedSortByPizza === category.type}"
        @click="changeCategory(category.type)">{{category.name}}</el-button>
    </div>
    <div class="container-sort__block2">
      <el-icon style="margin-right: 7px;"><caret-bottom /></el-icon>
      <span class="sort-text">Сортировка по:</span>
      <el-dropdown>
        <span class="el-dropdown-link" style="min-width: 95px">
          {{sortTypeStore.name}}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item 
              v-for="sortType in sortTypes" 
              :key="`sort-type-${sortType.id}`" 
              class="dropdown-item"
              :class="{'active-item': sortType.type === sortTypeStore.type}"
              @click="changeSortType(sortType)">
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
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const sortTypes = ref([
      {id:1, name: 'популярности', type: 'byPopular', sortOrder: false },
      {id:2, name: 'по цене', type: 'byPrice', sortOrder: false },
      {id:3, name: 'по алфавиту', type: 'byAlphabet', sortOrder: false },
    ])

    const categories = ref([
      {id:1, name: 'Все', type: 'all',},
      {id:2, name: 'Мясные', type: 0},
      {id:3, name: 'Вегетарианская', type: 1},
      {id:4, name: 'Гриль', type: 2},
      {id:5, name: 'Острые', type: 3},
      {id:6, name: 'Закрытые', type: 4},
    ])

    const sortTypeStore = computed(() => store.state.sortType)
    // computed
    const checkedSortByPizza = computed(() => store.state.sortCategory)
    // * end computed

    // methods
    const changeSortType = (sortType: any) => {
      store.commit('SORT_BY_TYPE', { sortType })
    }
    const changeCategory = (category: string | number) => {
      store.commit('SORT_CATEGORY', { category })
    }
    // *end methods

    return {
      sortTypes,
      sortTypeStore,
      changeSortType,
      changeCategory,
      categories,
      checkedSortByPizza,
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