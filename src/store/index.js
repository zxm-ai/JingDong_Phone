import { createStore } from 'vuex'

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  try {
    return JSON.parse(localStorage.cartList)
  } catch (error) {
    return {}
  }
}
// 保存全局的数据 故各个页面都可以访问到
export default createStore({
  state: {
    // 每个商铺需要有不同的计算方式
    cartList: getLocalCartList()
    /**
     * 第一层是商铺的id
     * shopId：{
     *   shopName:'沃尔玛'
     *   produceList{
     *     productId：{
     *       _id: 1
     *       name: '番茄250/份'
     *       imageUrl:
     *       sales:
     *       price:
     *       oldPrice:
     *       count:
     *     }
     *   }
     * }
     */
  },
  getters: {
  },
  mutations: {
    // 往购物车中增加减少商品可以合并为一个函数 多传递一个参数 来代指+1 还是-1
    addItemToCart (state, payload) {
      const { shopId, productId, product, shopName } = payload
      // 判断当商铺的购物车是否存在
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) {
        shopInfo = { shopName: '', productList: {} }
        shopInfo.shopName = shopName
        console.log(shopName)
      }
      if (shopInfo && shopInfo.shopName === '') {
        shopInfo.shopName = shopName
      }
      let productInfo = shopInfo.productList[productId]
      if (!productInfo) {
        productInfo = product
        productInfo.count = 0
      }
      productInfo.count += 1
      if (productInfo.count > 0) { productInfo.checked = true }
      shopInfo.productList[productId] = productInfo
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    minusItemFromCart (state, payload, shopName) {
      const { shopId, productId } = payload
      if (state?.cartList?.[shopId]?.productList?.[productId]?.count && state?.cartList?.[shopId]?.productList?.[productId].count > 0) {
        state.cartList[shopId].productList[productId].count -= 1
      }
      setLocalCartList(state)
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId] = { shopName: '', productList: {} }
      setLocalCartList(state)
    },
    checkedAllProducts (state, payload) {
      const { shopId } = payload
      const productList = state.cartList[shopId].productList
      if (productList) {
        for (const i in productList) {
          if (productList[i].count > 0) {
            productList[i].checked = true
          }
        }
      }
      setLocalCartList(state)
    },
    handleChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.checked = !product.checked
      setLocalCartList(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
