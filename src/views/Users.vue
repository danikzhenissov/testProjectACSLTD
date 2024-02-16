<script setup lang="ts">
import User from "../components/User.vue"
import type { IUser, IZone } from '../types/types';
import { axiosReq } from '../AxiosClient';
import { ref, watch } from "vue";
import { oneUser } from "@/helpers/defaultOneUserData";
import { useRouter } from "vue-router";

const router = useRouter()
const users = ref<IUser[]>(JSON.parse(localStorage.getItem('users') ?? '[]'))
const zoneIdTemp = ref(-1)
const zones = ref<IZone[]>([
    {
        zoneId: 1,
        zoneName: 'x'
    },
    {
        zoneId: 2,
        zoneName: 'y'
    },
    {
        zoneId: 3,
        zoneName: 'z'
    },
])

const onDragStart = (event: DragEvent, user: IUser) => {
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer?.setData('userId', user.id.value)
        zoneIdTemp.value = user.zoneId
    }
}

const onDrop = (event: DragEvent, zoneId: number) => {
    if (event.dataTransfer) {
        const userId = event.dataTransfer.getData('userId')
        users.value = users.value.map(i => {
            if (i.id.value === userId && zoneId !== 1) {
                i.zoneId = zoneId
                if (zoneIdTemp.value === 1) {
                    getUserData()
                }
            }
            return i
        })
    }
}



const getUserData = () => {
    axiosReq.get(`/api`).then((res: { data: { results: IUser[]; }; }) => {

        const user = res.data.results[0]
        user.zoneId = 1;
        users.value.push(user)
        console.log(users.value);
    })
}

const openProfle = (userData: IUser) => {
    localStorage.setItem("userData", JSON.stringify(userData))
    router.push('profile')
}

getUserData()

// router.beforeEach((to, from, next) => {
//     if (to.name === 'users') {
//         localStorage.removeItem('userData')
//     }
//     next();
// });
watch(users, () => {
    const filteredUsers = users.value.filter(user => user.zoneId !== 1)
    localStorage.setItem('users', JSON.stringify(filteredUsers))
}, { deep: true })

</script>

<template>
    <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 flex items-center gap-[20px] h-[30vh]">
        <div @drop="onDrop($event, zone.zoneId)" v-for="(zone) in zones" :key="zone.zoneId" @dragenter.prevent
            @dragover.prevent class="userCard text-center">
            <div class=" text-white font-bold text-xl">{{ zone.zoneName }}</div>
            <keep-alive v-for="user in users.filter(i => i.zoneId === zone.zoneId)" @dragstart="onDragStart($event, user)"
                @click="openProfle(user)" draggable="true">
                <img class="mx-auto rounded-[7px]" :src="user.picture.large">
            </keep-alive>
        </div>
    </div>
</template>