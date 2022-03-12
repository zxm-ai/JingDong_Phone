<template>
<div class="wapper">
  <header class="cart">
    <span>我的全部购物车</span>
  </header>
  <div class="content">
    <template v-for="item in cartList" :key="item">
      <div class="shop" v-if="item.shopName != '' ">
      <div class="shop__title">{{item.shopName}}</div>
      <template  v-for="i in item.productList" :key="i">
        <div class="shop__list" v-if ="i.count > 0">
          <img
            class="shop__img"
            v-bind:src="i.imgUrl"
          />
          <div class="shop__content">
            <p class="shop__content__name">{{i.name}}</p>
            <p class="shop__content__count">{{i.price}} <span class="iconfont">&#xe601;</span> {{i.count}}</p>
          </div>
          <div class="shop__price">&yen;{{total(i.count, i.price)}}</div>
        </div>
      </template>
      </div>
    </template>
  </div>
  <Footer :index ='1'/>
</div>
</template>

<script>
import { useStore } from 'vuex'
import Footer from '../../components/FooterView.vue'
export default {
  name: 'CartList',
  components: { Footer },
  setup () {
    const store = useStore()
    const cartList = store.state.cartList
    console.log(cartList)
    const total = (count, price) => {
      const totalPrice = count * price
      return totalPrice.toFixed(2)
    }
    return { cartList, total }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriabels.scss";
@import "../../style/mixins.scss";
.cart{
  height: .44rem;
  text-align: center;
  line-height: .44rem;
  font-size: .16rem;
  color: #333333;
}
.content{
  position: absolute;
  top: .44rem;
  left: 0;
  right: 0;
  bottom: .5rem;
  background-color: #F8F8F8;
  overflow-y: scroll;
}
.shop{
  margin: .16rem;
  background: #FFF;
  box-sizing: border-box;
  padding: .16rem;
  &__title{
    font-size: .16rem;
    color: #333333;
    margin-bottom: .16rem;
  }
  &__list{
    display: flex;
    margin-bottom: .16rem;
    position: relative;
  }
  &__img{
    height: .46rem;
    width: .46rem;
    margin-right: .16rem;
  }
  &__content{
    &__name{
      font-size: .14rem;
      color: #333333;
      font-weight: bold;
      line-height: .2rem;
      margin-bottom: .06rem;
    }
    &__count{
      font-size: .14rem;
      color: #E93B3B;
      line-height: .2rem;
    }
  }
  &__price{
    position: absolute;
    right: .0;
    bottom: 0;
    font-size: .14rem;
    color: #000000;
    text-align: right;
    line-height: .2rem;
  }
}
</style>
