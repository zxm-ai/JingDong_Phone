<template>
  <div class="shop">
      <img
        class="shop__img"
        v-bind:src="item.imgUrl"
      />
      <div :class="{'shop__content':true, 'shop__content__border':hideBorder?false:true}">
        <div class="shop__content__title">{{item.name}}</div>
        <div class="shop__content__tags">
          <span>月售{{item.sales}}+</span>
          <span>起送¥{{item.expressLimit}}</span>
          <span>基础运费¥{{item.expressPrice}}</span>
        </div>
        <p class="shop__content__hightlight">
          {{item.slogan}}
        </p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scoped>
@import "../style/viriabels.scss";
@import "../style/mixins.scss";
.shop {
  display: flex;
  margin-bottom: 0.12rem;
  &__img {
    width: 0.56rem;
    height: 0.56rem;
  }
  &__content {
    flex: 1;
    color: $content-fontcolot;
    margin-left: 0.16rem;
    &__border{
      border-bottom: .01rem solid #f1f1f1;
    }
    &__title {
      line-height: 0.22rem;
      font-size: 0.16rem;
      margin-bottom: 0.08rem;
    }
    &__tags {
      line-height: 0.18rem;
      font-size: 0.13rem;
      margin-bottom: 0.08rem;
      span {
        margin-right: 0.16rem;
      }
    }
    &__hightlight {
      line-height: 0.18rem;
      font-size: .13rem;
      color: #e93b3b;
      padding-bottom: 0.12rem;
    }
  }
}
</style>
