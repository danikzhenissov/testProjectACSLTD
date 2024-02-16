<script setup lang="ts">
import type { IUser } from '@/types/types';


const props = defineProps<{
    user?: IUser
}>()

</script>

<template>
    <div class="text-center">
        <img class=" mx-auto" :src="user?.picture.large" alt="">
    </div>
</template>