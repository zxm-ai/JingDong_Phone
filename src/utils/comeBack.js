import { useRouter } from 'vue-router'
export const useBackRouterEffect = () => {
  const router = useRouter()
  const hanleBackClick = () => {
    router.back()
  }
  return { hanleBackClick }
}
