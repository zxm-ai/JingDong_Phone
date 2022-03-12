<template>
<div class="wrapper">
  <header class="header">
    <div class="order">
      <span
        class="order__back iconfont"
        @click="hanleBackClick"
      >&#xe679;</span>
      <span class="order__check">确认订单</span>
    </div>
    <div class="receiver">
      <div class="receiver__info">
        <div class="receiver__info__title">收货地址</div>
        <div class="receiver__info__address">北京理工大学国防科技园2号楼10层</div>
        <span class="receiver__info__name">瑶妹（先生）</span>
        <span class="receiver__info__phone">18911024266</span>
      </div>
      <div class="receiver__enter iconfont">&#xe62b;</div>
    </div>
  </header>
  <div class="content">
    <div class="shop" v-if=" count !== 0 ">
    <div class="shop__title">{{shopName}}</div>
    <template  v-for="i in cartList.productList" :key="i">
      <div class="shop__list" v-if ="i.count > 0">
        <img
          class="shop__img"
          v-bind:src="i.imgUrl"
        />
        <div class="shop__content">
          <p class="shop__content__name">{{i.name}}</p>
          <p class="shop__content__count">{{i.price}} <span class="iconfont">&#xe601;</span> {{i.count}}</p>
        </div>
        <div class="shop__price">&yen;{{oneTotal(i.count, i.price)}}</div>
      </div>
    </template>
    </div>
  </div>
  <div class="check">
    <div class="check__content">
      <span class="check__content__info">实付金额 </span>
      <span class="check__content__price"> &yen;{{price}}</span>
    </div>
    <router-link :to="{path: `/order/${shopId}`}">
      <button class="check__total" @click="handleSubmit(true)">提交订单</button>
    </router-link>
  </div>
  <div class="mask" v-show="isMask" @click="handleSubmit(false)" @click.stop>
    <div class="mask__info">
      <p class="mask__checked">确认要离开收银台？</p>
      <p class="mask__warn">请尽快完成支付，否则将被取消</p>
      <!-- <div class="mask__btns"> -->
        <button class="mask__btn mask__cancel" @click="handleConfirmOrder(true)">
          取消订单
        </button>
        <button class="mask__btn mask__confirm" @click="handleConfirmOrder(false)">确认支付</button>
      <!-- </div> -->
    </div>
  </div>
</div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useBackRouterEffect } from '../../utils/comeBack'
import { useCartEffect } from '../shop/CartView.vue'
import { myPost } from '../../utils/request'
export default {
  name: 'OrderView',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const shopId = route.params.id
    const isMask = ref(false)

    const cartList = computed(() => {
      return store.state.cartList?.[shopId] || {}
    })
    const shopName = computed(() => {
      return store.state.cartList?.[shopId]?.shopName || ''
    })
    const oneTotal = (count, price) => {
      return (count * price).toFixed(2)
    }
    const { hanleBackClick } = useBackRouterEffect()
    const { price, count } = useCartEffect(shopId)

    const handleConfirmOrder = async (isCanceled) => {
      const products = []
      const productList = cartList.value.productList
      console.log(productList)
      for (const i in productList) {
        const product = productList[i]
        products.push({ id: parseInt(product._id, 10), num: product.count })
      }
      try {
        const result = await myPost('/api/order', {
          addressId: 1,
          shopId,
          shopName: shopName.value,
          isCanceled,
          products
        })
        console.log(result)
        if (result?.errno === 0) {
          store.commit('cleanCartProducts', { shopId })
          router.push({ name: 'OrderList' })
        }
      } catch (e) {
        // 提示下单失败
      }
    }

    const handleSubmit = (state) => {
      isMask.value = state
    }
    return { hanleBackClick, cartList, oneTotal, price, count, shopName, handleConfirmOrder, handleSubmit, isMask }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #F8F8F8;
}
.header{
  // height: 1.96rem;
  // background-size: 100% 1.59rem;
  height: 1.59rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;
}
.order{
  margin: 0 .18rem;
  height: .60rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  &__back{
    font-size: .2rem;
    color: #FFF;
  }
  &__check{
    flex: 1;
    font-size: .16rem;
    color: #FFFFFF;
    text-align: center;
  }
}
.receiver{
  height: 1.11rem;
  margin: 0 .18rem ;
  background-color: #FFF;
  border-radius: .04rem;
  z-index: 2;
  color: #333333;
  display: flex;
  &__info{
    box-sizing: border-box;
    padding: .16rem;
    &__title{
      margin-bottom: .14rem;
      font-size: .16rem;
    }
    &__address{
      font-size: .14rem;
      line-height: .2rem;
      margin-bottom: .06rem;
    }
    &__phone, &__name{
      font-size: .12rem;
      color: #666666;
      line-height: .18rem;
    }
  }
  &__enter{
    flex: 1;
    padding-right: .16rem;
    line-height: 1.11rem;
    text-align: right;
  }
}
.content{
  position: absolute;
  top: 1.74rem;
  bottom: .6rem;
  width: 100%;
  background-color: #F8F8F8;
  overflow-y: scroll;
  margin-top: .16rem;
}
.shop{
  margin: 0 .16rem;
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

.check{
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: .5rem;
  box-shadow: 0 -0.01rem .01rem 0 #F1F1F1;
  background-color: #FFF;
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
  &__content{
    margin-left: .24rem;
    &__info{
      font-size: .14rem;
      color: #333333;
      text-align: right;
      line-height: .22rem;
    }
    &__price{
      font-size: .16rem;
      color: #333333;
      text-align: right;
      line-height: .22rem;
      font-weight: bold;
    }
  }
}
.mask{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:rgba(0,0,0,0.50);
  &__info{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 3.01rem;
    height: 1.57rem;
    background: #FFFFFF;
    border-radius: .04rem;
    text-align: center;
  }
  &__checked{
    margin: .24rem 0 .08rem 0;
    font-size: .18rem;
    line-height: .25rem;
    color: #333333;
    font-weight: bold;
  }
  &__warn{
    font-size: .14rem;
    color: #666666;
    line-height: .2rem;
    margin-bottom: .24rem;
  }
  &__btn{
    width: .8rem;
    height: .32rem;
    border-radius: .16rem;
    border: .01rem solid #4FB0F9;
    outline: none;
    background-color: transparent;
    font-size: .14rem;
    color: #0091FF;
  }
  &__cancel{
    margin-right: .24rem;
  }
  &__confirm{
    color: #FFFFFF;
    background-color: #4FB0F9;
  }
}

</style>
