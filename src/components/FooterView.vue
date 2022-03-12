<template>
  <footer class="docker center-warp">
    <div
      v-for="item in dockerList"
      class="docker__item"
      :class="{'docker__item': true, 'docker__item--active' :item._id === index}"
      :key="item._id"
    >
    <router-link :to="item.to">
      <div class="iconfont" v-html="item.icon"></div>
      <div class="docker__title">{{item.text}}</div>
    </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterView',
  props: ['index'],
  setup () {
    const dockerList = [
      { _id: 0, icon: '&#xe639;', text: '首页', to: { name: 'Home' } },
      { _id: 1, icon: '&#xe834;', text: '购物车', to: { name: 'CartList' } },
      { _id: 2, icon: '&#xe645;', text: '订单', to: { name: 'OrderList' } },
      { _id: 3, icon: '&#xe604;', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/viriabels.scss";
@import "../style/mixins.scss";

.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  padding: 0 0.18rem;
  box-shadow: 0 -0.01rem .01rem 0 $content-bgColor;
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin-top: 0.07rem;
      margin-bottom: 0.02rem;
      font-size: 0.2rem;
    }
    a{
      color: #333333;
    }
    &--active {
      a {color: #1fa4fc;}
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>
