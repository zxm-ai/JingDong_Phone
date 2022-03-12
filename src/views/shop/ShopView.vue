<template>
<div class="wrapper">
  <div class="search">
    <div
     class="search__back iconfont"
     @click="hanleBackClick"
    >&#xe679;
    </div>
    <div class="search__content">
        <span class="iconfont search__content__icon">&#xe603;</span>
        <input
          type="text"
          class="search__content__input"
          placeholder="请输入商品名称搜索"
        />
    </div>
  </div>
  <ShopInfo :item = "data.item" :hideBorder="true" v-show="data.item.imgUrl"/>
  <Content :shop-name="data.item.name"/>
  <Cart />
</div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import ShopInfo from '../../components/ShopInfo'
import Content from './ContentView'
import Cart from './CartView.vue'
import { useRoute } from 'vue-router'
import { myGet } from '../../utils/request'
import { useBackRouterEffect } from '../../utils/comeBack'

const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getShopItem = async () => {
    const result = await myGet(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
      // console.log(data.item)
    }
  }
  return { data, getShopItem }
}

// const useBackRouterEffect = () => {
//   const router = useRouter()
//   const hanleBackClick = () => {
//     router.back()
//   }
//   return { hanleBackClick }
// }

export default {
  name: 'ShopView',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { data, getShopItem } = useShopInfoEffect()
    const { hanleBackClick } = useBackRouterEffect()
    getShopItem()
    return { data, hanleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  margin: 0 .18rem;
}
.search{
  display: flex;
  margin: .16rem 0;
  align-items: center;
  justify-content: center;
  &__back{
    color: #B6B6B6;
    font-size: .2rem;
    margin-right: .12rem;
  }
  &__content{
    width: 100%;
    height: .32rem;
    box-sizing: border-box;
    display: flex;
    background-color: #f5f5f5;
    border-radius: 0.16rem;
    padding-left: 0.16rem;
    align-items: center;
    justify-content: center;
    &__input {
      width: 100%;
      border: none;
      outline: none;
      background-color: transparent;
      line-height: 0.16rem;
      color: #b7b7b7;
      font-size: .14rem;
      padding-left: 0.1rem;
    }
    &__icon {
      font-size: 0.18rem;
      color: #b7b7b7;
    }
  }
}
</style>
