<script setup lang="ts">
import router from '../router';
import type { IUser } from '@/types/types';
import { ref } from 'vue';

const userStorage = localStorage.getItem('userData');

if (!userStorage) {
    router.push({ name: "users" })
}

const user = ref<IUser>(JSON.parse(userStorage ?? ""))

console.log(user.value);

</script>


<template>
    <div class="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2
      w-[50%] h-[30vh] rounded-[10px] bg-indigo-400 text-white p-[15px]">
        <img :src="user.picture.large" class="rounded-[8px] mx-auto" alt="">
        <div>Name: {{ user.name.first }}</div>
        <div>Email: {{ user.email }}</div>
        <div>Location: {{ user.location.country }}, {{ user.location.city }}</div>
        <div>Phone: {{ user.phone }}</div>
        <div>Gender: {{ user.gender }}</div>
    </div>
</template>