import { createStore } from 'vuex'

const getTotalPrice = (arr: Array<[]>) => arr.reduce((sum, obj: any) => sum + obj.price, 0)

const getTotalSum = (obj: any, path: string) => {
  return Object.values(obj).reduce((sum, reduceObj: any) => {
    return sum + reduceObj[path];
  }, 0);
};

const sessionStorageUpdate = (newItems: LooseObject, totalPrice: number, totalCount: number) => {
  sessionStorage.setItem('itemsPizza', JSON.stringify(newItems))
  sessionStorage.setItem('totalCount', String(totalCount))
  sessionStorage.setItem('totalPrice', String(totalPrice))
}

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

      const totalCount: any = getTotalSum(newItems, 'totalCount')
      const totalPrice: any = getTotalSum(newItems, 'totalPrice')

      state.totalCount = totalCount
      state.totalPrice = totalPrice

      sessionStorageUpdate(newItems, totalCount, totalPrice)

      state.items = newItems
    },
    SORT_CATEGORY: (state, action) => {
      state.sortCategory = action.category
    },
    SORT_BY_TYPE: (state, action) => {
      state.sortType = action.sortType
    },
    REMOVE_CART_ITEM: (state, action) => {
      const newItems = {
        ...state.items,
      }
      const totalCount: any = state.totalCount - newItems[action.itemId].totalCount
      const totalPrice: any = state.totalPrice - newItems[action.itemId].totalPrice
      delete newItems[action.itemId]
      state.items = newItems
      state.totalPrice = totalPrice
      state.totalCount = totalCount
      
      sessionStorageUpdate(newItems, totalCount, totalPrice)
    },
    PLUS_CART_ITEM: (state, action) => {
      const newPizzaItems = [
        ...state.items[action.itemId].items,
        state.items[action.itemId].items[0]
      ]
      const newItems = {
        ...state.items,
        [action.itemId]: {
          items: newPizzaItems,
          totalPrice: getTotalPrice(newPizzaItems),
          totalCount: newPizzaItems.length
        }
      }
      const totalCount: any = getTotalSum(newItems, 'totalCount')
      const totalPrice: any = getTotalSum(newItems, 'totalPrice')

      state.totalCount = getTotalSum(newItems, 'totalCount') as any
      state.totalPrice = getTotalSum(newItems, 'totalPrice') as any
      state.items = newItems

      sessionStorageUpdate(newItems, totalCount, totalPrice)
    },
    MINUS_CART_ITEM: (state, action) => {
      const oldItems = state.items[action.itemId].items
      const newPizzaItems = oldItems.length > 1 ? state.items[action.itemId].items.slice(1) : oldItems
      const newItems = {
        ...state.items,
        [action.itemId]: {
          items: newPizzaItems,
          totalPrice: getTotalPrice(newPizzaItems),
          totalCount: newPizzaItems.length
        }
      }
      const totalCount: any = getTotalSum(newItems, 'totalCount')
      const totalPrice: any = getTotalSum(newItems, 'totalPrice')

      state.totalCount = getTotalSum(newItems, 'totalCount') as any
      state.totalPrice = getTotalSum(newItems, 'totalPrice') as any
      state.items = newItems

      sessionStorageUpdate(newItems, totalCount, totalPrice)
    },
    CLEAR_CART:(state) => {
      state.items = {}
      state.totalPrice = 0
      state.totalCount = 0
      sessionStorageUpdate({}, 0, 0)
    }
  },
  modules: {
  }
})
