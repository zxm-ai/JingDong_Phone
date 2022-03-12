/* eslint-disable vue/no-useless-template-attributes */
<template>
<div class="mask" v-if="show" @click="isShow"></div>
  <footer class="cart">
    <div class="product" v-if="show">
      <!-- 通过v-if来控制组件的显示 -->
      <div class="product__clear" v-if="total > 0">
        <span :class="{'iconfont':true, 'product__clear__no':true, 'product__item__checked--active':allCheck}" @click="() => {checkedAllProducts(shopId)}">
          &#xe6c5;
        </span>
        <span class="product__clear__desc"> 全选</span>
        <span
          class="product__clear__all"
          @click="[cleanCartProducts(shopId), isShow()]"
        >清空购物车</span>
      </div>
      <!-- Ignore -->
      <template v-for="item in products" :key="item._id">
        <!-- 区别v-if和v-show 上面的div还显示 解决方案可以将下方的template和上面的div调换位置
        因为template本来就是占位符
        -->
        <div class="product__item" v-if="item.count>0" >
          <span
            :class="{'product__item__checked':true, 'product__item__checked--active': item.checked, 'iconfont':true}"
            @click="() => { handleChecked(shopId, item._id)}"
          >
            &#xe6c5;
          </span>
          <img :src="item.imgUrl" class="product__item__img">
          <div class="product__item__desc">
            <div>
              <div class="product__item__title">{{item.name}}</div>
              <div class="product__item__cart">
                <div class="product__item__price">
                  <span class="product__item__curprice">&yen;{{item.price}}</span>
                  <del class="product__item__preprice">&yen;{{item.oldPrice}}</del>
                </div>
              </div>
            </div>
            <div class="product__item__account">
              <div
                class="product__item__minus iconfont"
                @click="[minusItemFromCart(shopId, item._id), isCartShow()]"
              >&#xe617;</div>
              <span class="product__item__value">{{item.count || 0}}</span>
              <div
                class="product__item__add iconfont"
                @click="() => { addItemToCart(shopId, item._id, item) }"
              >&#xe606;</div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img" @click="isShow">
        <span class="check__icon__count" v-if="total>0">{{total}}</span>
      </div>
      <div class="check__account">
        <span class="check__account__total" v-if="total>0">总计:</span>
        <span class="check__account__total" v-else>购物车是空的</span>
        <span class="check__account__price" v-if="total>0"> &yen;{{price}}</span>
      </div>
      <router-link :to="{path: `/order/${shopId}`}">
        <button class="check__total" >去结算</button>
      </router-link>
    </div>
  </footer>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from './commonCartEffect'

// 获取购物车信息逻辑
export const useCartEffect = (shopId, show) => {
  const store = useStore()
  const cartList = store.state.cartList

  // 计算假如购物车的数量
  const total = computed(() => {
    const productList = cartList[shopId]?.productList
    let count = 0
    if (productList) {
      for (const i in productList) {
        count += productList[i].count
      }
    }
    return count
  })

  // 计算购物车中商品的总价格
  const price = computed(() => {
    const productList = cartList[shopId]?.productList
    let count = 0
    if (productList) {
      for (const i in productList) {
        if (productList[i].checked) {
          count += productList[i].count * productList[i].price
        }
      }
    }
    return count.toFixed(2)
  })

  // 设置默认全选
  const allCheck = computed(() => {
    const productList = cartList[shopId]?.productList
    let result = true
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.count > 0 && !product.checked) {
          result = false
        }
      }
    }
    return result
  })

  const products = computed(() => {
    const products = cartList[shopId]?.productList || []
    return products
  })

  // 当需要修改购物车的相关属性和值时，需要在store中进行修改
  // 取消购物车中某个商品的选中
  const handleChecked = (shopId, productId) => {
    store.commit('handleChecked', { shopId, productId })
  }

  // 全选
  const checkedAllProducts = (shopId) => {
    store.commit('checkedAllProducts', { shopId })
  }

  // 清空购物车
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  const isShow = () => {
    if (total.value === 0) {
      show.value = false
    } else {
      show.value = !show.value
    }
  }
  const isCartShow = () => {
    if (total.value === 0) {
      show.value = false
    }
  }

  return { total, price, products, cartList, handleChecked, checkedAllProducts, cleanCartProducts, allCheck, isShow, isCartShow }
}

export default {
  name: 'CartView',
  setup () {
    const route = useRoute()
    const show = ref(false)
    const shopId = route.params.id
    console.log(shopId)
    const { total, price, products, handleChecked, checkedAllProducts, cleanCartProducts, allCheck, isShow, isCartShow } = useCartEffect(shopId, show)
    const { cartList, addItemToCart, minusItemFromCart } = useCommonCartEffect()
    return {
      total,
      price,
      products,
      cartList,
      addItemToCart,
      minusItemFromCart,
      shopId,
      handleChecked,
      checkedAllProducts,
      cleanCartProducts,
      allCheck,
      show,
      isShow,
      isCartShow
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.mask{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.50);
  z-index: 1;
}
.cart{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}
.check{
  display: flex;
  align-items: center;
  width: 100%;
  height: .5rem;
  position: relative;
  box-shadow: 0 -0.01rem .01rem 0 #F1F1F1;
  background-color: #FFF;
  bottom: 0;
  &__icon{
    width: .28rem;
    height: .26rem;
    position: relative;
    margin: 0 .32rem 0 .24rem;
    &__img{
      width: .28rem;
      height: .26rem;
    }
    &__count{
      display: inline-block;
      position: absolute;
      top: -0.1rem;
      left: 0.2rem;
      min-width: .2rem;
      height: .2rem;
      text-align: center;
      border-radius: .1rem;
      background-color: #E93B3B;
      font-size: .16rem;
      color: #FFFFFF;
      line-height: .2rem;
      transform: scale(0.5);
      transform-origin: left center;
    }
  }
  a{
    display: inline-block;
    flex: 1;
    height: .5rem;
    position: relative;
    right: 0;
  }
  &__total{
      position: absolute;
      right: 0;
      border: none;
      outline: none;
      background-color: #4FB0F9;
      width: .98rem;
      height: .5rem;
      font-size: .14rem;
      color: #FFFFFF;
  }
  &__account{
    display: flex;
    align-items: center;
    &__total{
      font-size: .12rem;
      color: #333333;
      margin-right: .05rem;
    }
    &__price{
      font-weight: bold;
      font-size: .18rem;
      color: #E93B3B;
    }
  }
}
.product{
  background-color: #FFFFFF;
  color: #333333;
  overflow-y: scroll;
  padding: 0 .18rem;
  box-sizing: border-box;

  &__clear{
    // position: relative;
    width: 100%;
    height: .52rem;
    font-size: .14rem;
    color: #333333;
    line-height: .52rem;
    display: flex;
    align-items: center;
    border-bottom: .01rem solid #F1F1F1;
    margin-bottom: .16rem;
    &__no{
      // position: absolute;
      font-size: .2rem;
      margin-right: .08rem;
    }
    &__desc{
      font-size: .14rem;
    }
    &__all{
      position: absolute;
      right: .18rem;
    }
  }
  &__item{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: .16rem;
    overflow-y: scroll;
    &__img{
      height: .46rem;
      width: .46rem;
      margin: 0 .16rem;
    }
    &__checked{
      font-size: .2rem;
      &--active{
        color: #0091FF;
      }
    }
    &__desc{
      width: 1.81rem;
      display: flex;
      align-items: center;
    }
    &__title{
      font-size: .14rem;
      font-weight: bold;
      margin-bottom: .06rem;
      line-height: .2rem;
      @include ellipse;
    }
    &__curprice{
      font-size: .14rem;
      line-height: .2rem;
      font-weight: bold;
      margin-right: .06rem;
      color: #E93B3B;
    }
    &__preprice{
      font-size: .1rem;
      color: #999999;
      line-height: .2rem;
    }
    &__account{
      display: flex;
      position: absolute;
      right: .18rem;
      justify-content: center;
      align-items: center;
    }
    &__add{
      font-size: .2rem;
      color: #0091FF;
    }
    &__minus{
      font-size: .2rem;
      color: #666666;
    }
    &__value{
      font-size: .14rem;
      color: #333333;
      line-height: .16rem;
      margin: 0 .05rem;
    }
  }
}

</style>
