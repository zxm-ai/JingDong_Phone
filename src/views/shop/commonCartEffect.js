import { useStore } from 'vuex'
// 获取购物车数据
export const useCommonCartEffect = () => {
  const store = useStore()
  const cartList = store.state.cartList
  // 购物车增加
  const addItemToCart = (shopId, productId, product, shopName) => {
    store.commit('addItemToCart', { shopId, productId, product, shopName })
  }
  // 购物车减少
  const minusItemFromCart = (shopId, productId, shopName) => {
    store.commit('minusItemFromCart', { shopId, productId, shopName })
  }
  return { cartList, addItemToCart, minusItemFromCart }
}
