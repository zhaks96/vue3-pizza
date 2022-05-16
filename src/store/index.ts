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
  totalCount: number
}

export default createStore<State>({
  state: {
    items: {},
    totalPrice: 0,
    totalCount: 0,
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

      state.items = newItems
    }
  },
  modules: {
  }
})
