// 封装分类数据业务相关代码
import { onBeforeRouteUpdate } from 'vue-router'
import {useRoute} from 'vue-router'
import {getCategoryAPI} from '@/apis/category'
import {onMounted, ref} from 'vue'

export function useCategory() {
  // 获取数据
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }
  onMounted(() => {
    getCategory()
  })
  // 目标：路由参数变化的生活 可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}