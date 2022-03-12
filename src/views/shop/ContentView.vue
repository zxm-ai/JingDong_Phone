<template>
  <div class="content">
    <ul class="list">
      <li
        :class="{'list__item':true, 'list__item--active': currentTab === item.tab }"
        v-for="item in CATEGORIES"
        :key="item.name"
        @click="()=>hanldCategories(item.tab)"
      >{{item.name}}
      </li>
    </ul>
    <div class="product">
      <div class="product__item" v-for="item in productList.item" :key="item._id">
        <img :src="item.imgUrl" class="product__item__img">
        <div class="product__item__desc">
          <div class="product__item__title">{{item.name}}</div>
          <div class="product__item__sale">月售{{item.sales}}件</div>
          <div class="product__item__cart">
            <div class="product__item__price">
              <span class="product__item__curprice">&yen;{{item.price}}</span>
              <del class="product__item__preprice">&yen;{{item.oldPrice}}</del>
            </div>
            <div class="product__item__account">
              <div
                class="product__item__minus iconfont"
                @click=" () => { minusItemFromCart(shopId, item._id, shopName)}"
              >&#xe617;</div>
              <span class="product__item__value">{{cartList?.[shopId]?.productList?.[item._id]?.count || 0}}</span>
              <div
                class="product__item__add iconfont"
                @click="() => { addItemToCart(shopId, item._id, item, shopName)}"
              >&#xe606;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watchEffect } from 'vue'
import { myGet } from '../../utils/request'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from './commonCartEffect'

const CATEGORIES = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }]

// 和tab相关的操作
const useTabEffect = () => {
  const currentTab = ref(CATEGORIES[0].tab)
  const hanldCategories = (tab) => {
    currentTab.value = tab
  }
  return { hanldCategories, currentTab }
}

// 请求数据
const useContentListEffect = (currentTab, shopId) => {
  const productList = reactive({ item: {} })
  const getContentData = async () => {
    const result = await myGet(`/api/shop/${shopId}/products`, { tab: currentTab.value })
    if (result?.errno === 0 && result?.data?.length) {
      productList.item = result.data
    }
  }
  // 根据数据的变化 来返回新的数据
  watchEffect(() => { getContentData() })
  return { getContentData, productList }
}

export default {
  name: 'ContentView',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { hanldCategories, currentTab } = useTabEffect()
    const { getContentData, productList } = useContentListEffect(currentTab, shopId)
    const { cartList, addItemToCart, minusItemFromCart } = useCommonCartEffect()
    return {
      getContentData,
      productList,
      CATEGORIES,
      hanldCategories,
      currentTab,
      cartList,
      shopId,
      addItemToCart,
      minusItemFromCart
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.content{
  position: absolute;
  display: flex;
  top: 1.52rem;
  left: 0;
  right: 0;
  bottom: .5rem;
}
.list{
  overflow-y: scroll;
  width: .76rem;
  background-color: #F5F5F5;
  font-size: .14rem;
  color: #333333;
  line-height: .16rem;
  margin-right: .16rem;
  &__item{
    height: .4rem;
    text-align: center;
    line-height: .4rem;
    &--active{
      background-color: #FFF;
    }
  }
}
.product{
  margin-right: .18rem;
  flex: 1;
  color: #333333;
  overflow-y: scroll;
  &__item{
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: .12rem 0;
    border-bottom: .01rem solid #F1F1F1;
    overflow: hidden;
    &__img{
      height: .68rem;
      width: .68rem;
      margin-right: .16rem;
    }
    &__desc{
      width: 1.81rem;
    }
    &__title{
      font-size: .14rem;
      font-weight: bold;
      margin-bottom: .06rem;
      line-height: .2rem;
      @include ellipse;
    }
    &__cart{
      display: flex;
      align-items: center;
      position: relative;
    }
    &__sale{
      font-size: .12rem;
      margin-bottom: .06rem;
      line-height: .16rem;
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
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
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
