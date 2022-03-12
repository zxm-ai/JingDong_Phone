<template>
    <div class="nearby">
      <h2 class="nearby__title">附近店铺</h2>
      <router-link
        v-for="item in nearbyList"
        :to="`/shop/${item._id}`"
        :key="item._id"
      >
        <ShopInfo :item="item" />
      </router-link>
    </div>
</template>

<script>
import { ref } from 'vue'
import { myGet } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await myGet('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { getNearbyList, nearbyList }
}

export default {
  name: 'NearbyView',
  components: { ShopInfo },
  setup () {
    const { getNearbyList, nearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriabels.scss";
@import "../../style/mixins.scss";
.nearby {
  margin: 0.16rem 0.18rem 0.05rem 0.18rem;
  &__title {
    font-size: .18rem;
    font-weight: bold;
    color: $content-fontcolot;
    margin-bottom: 0.14rem;
  }
}
</style>
