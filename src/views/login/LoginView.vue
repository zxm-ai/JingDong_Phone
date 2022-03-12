<template>
    <div class="wrapper">
        <div class="wrapper__icon">
            <img class="wrapper__icon__img" src="http://www.dell-lee.com/imgs/vue3/user.png">
        </div>
        <div class="wrapper__content">
            <input
              class="wrapper__content__phone"
              type="text" placeholder="请输入手机号"
              v-model="data.mobile"
              @blur="checkInputMobile"
            >
            <input
              class="wrapper__content__psw"
              type="password" placeholder="请输入密码"
              v-model="data.password"
              @blur="checkInputPwd"
            >
        </div>
        <div class="wrapper__login">
            <button @click="handleLogin">登录</button>
            <Toast v-if="toastData.isToast" :message="toastData.toastMessage" />
        </div>
        <div class="wrapper__register">
            <router-link :to="{name: 'Register'}">
                <button>立即注册</button>
            </router-link>
            |
            <button>忘记密码</button>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive } from '@vue/reactivity'
// import axios from 'axios'
import Toast, { useToastEffect } from '../../components/ToastView.vue'
import { myPost } from '../../utils/request'
// axios.defaults.headers.post['Content-Type'] = 'application/json'

const checkInputEffect = (showToast) => {
  const data = reactive({
    mobile: '',
    password: '',
    isLogin: -2
  })

  const checkInputMobile = () => {
    const reg = /^1[0-9]{10}$/
    // alert(data.mobile)
    // alert(reg.test(data.mobile))
    if (!reg.test(data.mobile)) {
      showToast('输入的手机号格式不对,请重新输入')
    } else {
      data.isLogin += 1
    }
  }
  const checkInputPwd = () => {
    const regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    if (!regPwd.test(data.password)) {
      showToast('密码中只能包含字母和数字,且密码长度为6-16位')
    } else {
      data.isLogin += 1
    }
  }
  return { checkInputMobile, checkInputPwd, data }
}

const handleLoginEffect = (showToast, data) => {
  const router = useRouter()
  // 脚手架支持的async
  const handleLogin = async () => {
    if (data.isLogin === 0) {
      try {
        const result = await myPost('/api/user/login', {
          username: data.mobile,
          password: data.password
        })
        console.log(result)
        if (result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          showToast('登录失败')
        }
      } catch (e) {
        showToast('请求失败')
      }
    }
  }
  return { handleLogin, data }
  // 另一种写法
  // const hanleClick = () => {
  //   axios.post('https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/user/login', {
  //     uesrname: data.mobile,
  //     password: data.password
  //   }).then(() => {
  //     localStorage.isLogin = true
  //     router.push({ name: 'Home' })
  //   }).catch(() => {
  //     alert('登录失败')
  //   })
  // }
}

export default {
  name: 'LoginView',
  components: { Toast },
  setup () {
    const { toastData, showToast } = useToastEffect()
    const { checkInputMobile, checkInputPwd, data } = checkInputEffect(showToast)
    // console.log(tureMobile.value, turePwd.value)
    const { handleLogin } = handleLoginEffect(showToast, data)
    return { handleLogin, data, showToast, toastData, checkInputMobile, checkInputPwd }
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
