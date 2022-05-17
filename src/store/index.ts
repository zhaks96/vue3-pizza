import { createStore } from 'vuex'

const getTotalPrice = (arr: Array<[]>) => arr.reduce((sum, obj: any) => sum + obj.price, 0)

const getTotalSum = (obj: any, path: string) => {
  return Object.values(obj).reduce((sum, reduceObj: any) => {
    return sum + reduceObj[path];
  }, 0);
};

interface LooseObject {
  [key: string]: any
}

export interface State {
  items: LooseObject,
  totalPrice: number,
  totalCount: number,
  sortCategory: string | number,
  sortType: LooseObject
}

export default createStore<State>({
  state: {
    items: JSON.parse(sessionStorage.getItem('itemsPizza') || '{}'),
    totalPrice: sessionStorage.getItem('totalPrice') ? Number(sessionStorage.getItem('totalPrice')) : 0,
    totalCount: sessionStorage.getItem('totalCount') ? Number(sessionStorage.getItem('totalCount')) : 0,
    sortCategory: 'all',
    sortType: { id:1, name: 'популярности', type: 'byPopular', sortOrder: false }
  },
  mutations: {
    ADD_PIZZA_CART: (state, action) => {
      const currentPizzaItems = !state.items[action.payload.id]
      ? [action.payload]
      : [...state.items[action.payload.id].items, action.payload]

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
          totalCount: currentPizzaItems.length
        },
      }

      const totalCount: any = getTotalSum(newItems, 'totalCount');
      const totalPrice: any = getTotalSum(newItems, 'totalPrice');

      state.totalCount = totalCount
      state.totalPrice = totalPrice

      sessionStorage.setItem('itemsPizza', JSON.stringify(newItems))
      sessionStorage.setItem('totalCount', totalCount)
      sessionStorage.setItem('totalPrice', totalPrice)

      state.items = newItems
    },
    SORT_CATEGORY: (state, action) => {
      state.sortCategory = action.category
    },
    SORT_BY_TYPE: (state, action) => {
      state.sortType = action.sortType
    }
  },
  modules: {
  }
})
