<template>
    <div class="wrapper">
        <div class="wrapper__icon">
            <img class="wrapper__icon__img" src="http://www.dell-lee.com/imgs/vue3/user.png">
        </div>
        <div class="wrapper__content">
            <input class="wrapper__content__phone" type="text" placeholder="请输入手机号" :v-model="data.mobile">
            <input class="wrapper__content__psw" type="password" placeholder="请输入密码" :v-model="data.password">
            <input class="wrapper__content__confirm" type="password" placeholder="确认密码" :v-model="data.checkPsd">
        </div>
        <div class="wrapper__login">
            <button @click="handleRegister">注册</button>
            <Toast v-if="toastData.isToast" :message="toastData.toastMessage"/>
        </div>
        <div class="wrapper__register">
            <router-link :to="{name: 'Login'}">
                <button>已有账号去登录</button>
            </router-link>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from '@vue/reactivity'
import axios from 'axios'
import Toast, { useToastEffect } from '../../components/ToastView.vue'

const handleRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    mobile: '',
    password: '',
    checkPsd: ''
  })
  // 脚手架支持的async
  const handleRegister = async () => {
    try {
      const result = await axios.post('https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/register', {
        username: data.mobile,
        password: data.password
      })
      if (result?.data?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  return { handleRegister, data }
}
export default {
  name: 'RegisterView',
  components: { Toast },
  setup () {
    const { toastData, showToast } = useToastEffect()
    const { handleRegister, data } = handleRegisterEffect(showToast)
    return { handleRegister, data, toastData }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__icon{
        &__img{
            width: .66rem;
            height: .66rem;
            display: block;
            margin: 0 auto .4rem auto;
        }
    }
    &__content{
        margin: 0 .4rem;
        input{
            width: 100%;
            height: .48rem;
            font-size: .16rem;
            color: rgba(0,0,0,0.50);
            letter-spacing: 0;
            line-height: .24rem;
            display: block;
            background: #F9F9F9;
            border: .01rem solid rgba(0,0,0,0.10);
            border-radius: .06rem;
            margin-bottom: .16rem;
            box-sizing: border-box;
            padding-left: .16rem;
            outline: none;
        }
    }
    &__login{
        margin: .32rem .4rem .16rem .4rem;
        font-size: .16rem;
        button{
            width: 100%;
            height: .48rem;
            background: #0091FF;
            box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
            border-radius: .04rem;
            border: none;
            outline: none;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            line-height: .24rem;
        }
    }
    &__register{
        text-align: center;
        font-size: .14rem;
        color: rgba(0,0,0,0.50);
        button{
            font-size: .14rem;
            color: rgba(0,0,0,0.50);
            border: none;
            background-color: transparent;
        }
    }
}
</style>
