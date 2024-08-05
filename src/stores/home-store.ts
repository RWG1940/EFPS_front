import { defineStore } from 'pinia';
import { getTokenClaims } from "@/utils/jwtUtil";
import { ref } from 'vue';
import type { DropdownProps } from 'tdesign-vue-next';

interface Claims {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

export const useHomeStore = defineStore('home', () => {
  /*
   *状态
   */
  // home页暂存的用户数据
  const id = ref<number | null>(null);
  const name = ref<string | null>(null);
  const username = ref<string | null>(null);
  const avatar = ref<string | null>(null);
  const myInfoVisible = ref(false)

  const options: DropdownProps['options'] = [
    {
      content: '个人中心',
      value: 1,
    },
    {
      content: '退出登录',
      value: 2,
      theme: 'error',
    },
  ];



  // 获取个人信息By token
  const getMyInfo = (): Claims | null => {
    const claims = getTokenClaims();
    if (claims != null) {
      id.value = claims.id;
      name.value = claims.name;
      username.value = claims.username;
      avatar.value = claims.avatar;
    }
    return null;
  }


  return {
    id,
    name,
    username,
    avatar,
    getMyInfo,
    options,
    myInfoVisible,
  };
});
