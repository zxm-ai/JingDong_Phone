<template>
  <div class="warpper">
    <Header />
    <Nearby />
  </div>
  <Footer :index="0"/>
</template>

<script>
import Header from './HeaderView.vue'
import Nearby from './NearbyView.vue'
import Footer from '../../components/FooterView.vue'
export default {
  name: 'HomeView',
  components: { Header, Nearby, Footer }
}
</script>
<style lang="scss">
.warpper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0.5rem;
}
</style>
