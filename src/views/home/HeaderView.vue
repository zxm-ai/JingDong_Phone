<template>
    <!-- <div class="info"></div> -->
    <header class="header">
      <div class="position">
        <span class="iconfont position__icon">&#xe64c;</span>
        北京理工大学国防科技园2号楼10层
        <span class="iconfont position__notice">&#xe628;</span>
      </div>
      <div class="search">
        <span class="iconfont search__find">&#xe603;</span>
        <input
          type="text"
          class="search__box"
          placeholder="山姆会员商店优惠商品"
        />
      </div>
      <div class="banner">
        <img
          class="banner__img"
          src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
          alt=""
        />
      </div>
      <div class="menu">
        <div v-for="item in menuList" :key="item.id" class="menu__item">
          <img
            :src="item.imgUrl"
            class="menu__item__icon"
          />
          <p class="menu__item__desc">{{item.desc}}</p>
        </div>
      </div>
    </header>
    <div class="gap"></div>
</template>

<script>
export default {
  name: 'HeaderView',
  setup () {
    const menuList = [
      { id: 1, imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png', desc: '超市便利' },
      { id: 2, imgUrl: 'http://www.dell-lee.com/imgs/vue3/菜市场.png', desc: '菜市场' },
      { id: 3, imgUrl: 'http://www.dell-lee.com/imgs/vue3/水果店.png', desc: '水果店' },
      { id: 4, imgUrl: 'http://www.dell-lee.com/imgs/vue3/鲜花.png', desc: '鲜花绿植' },
      { id: 5, imgUrl: 'http://www.dell-lee.com/imgs/vue3/医药健康.png', desc: '医药健康' },
      { id: 6, imgUrl: 'http://www.dell-lee.com/imgs/vue3/家居.png', desc: '家居' },
      { id: 7, imgUrl: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png', desc: '蛋糕' },
      { id: 8, imgUrl: 'http://www.dell-lee.com/imgs/vue3/签到.png', desc: '签到' },
      { id: 9, imgUrl: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png', desc: '大牌免运' },
      { id: 10, imgUrl: 'http://www.dell-lee.com/imgs/vue3/红包.png', desc: '红包套餐' }
    ]
    return { menuList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriabels.scss";
@import "../../style/mixins.scss";
.info {
  height: 0.2rem;
  width: 100%;
  background-color: red;
}
.header {
  margin: 0 0.18rem;
  position: relative;
  .position {
    height: 0.22rem;
    position: relative;
    margin: 0.16rem 0;
    padding-right: 0.2rem;
    font-size: 0.16rem;
    line-height: 0.22rem;
    color: $content-fontcolot;
    @include ellipse;
    &__notice {
      position: absolute;
      right: 0;
    }
  }
  .search {
    display: flex;
    background-color: #f5f5f5;
    border-radius: 0.16rem;
    box-sizing: border-box;
    padding-left: 0.16rem;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.12rem;
    &__box {
      border: none;
      width: 100%;
      background-color: transparent;
      line-height: 0.16rem;
      color: #b7b7b7;
      font-size: .14rem;
      padding-left: 0.1rem;
      outline: none;
    }
    &__find {
      font-size: 0.18rem;
      color: #b7b7b7;
    }
  }
  .banner {
    // 解决图片抖动的问题
    overflow: hidden;
    height: 0;
    padding-bottom: 25.4%;
    margin-bottom: 0.16rem;
    &__img {
      width: 100%;
    }
  }
  .menu {
    display: flex;
    flex-wrap: wrap;
    margin: 0 0.09rem;
    &__item {
      width: 20%;
      height: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.16rem;
      &__icon {
        width: 0.4rem;
        height: 0.4rem;
        margin-bottom: .06rem;
      }
      &_desc {
        width: 0.48rem;
        height: 0.17rem;
        font-size: .12rem;
        color: $content-fontcolot;
      }
    }
  }
}

.gap {
  width: 100%;
  height: 0.1rem;
  background-color: $content-bgColor;
}
</style>
