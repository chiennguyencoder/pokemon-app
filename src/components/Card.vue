<template>
    <div class="card col w-full py-[15px] px-[5px] mx-[5px] rounded-2xl flex flex-col text-center mb-[10px]">
        <p class="poke-id ">#{{ props.data.id }}</p>
        <div class="poke-img pt-[100%] bg-contain" :style="{backgroundImage : `url(${props.data.sprites.front_default})`}"></div>
        <h3 class="text-xl font-bold">{{ props.data.name }}</h3>
        <div class="flex justify-center">
            <div 
                class="mx-1 font-semibold text-[13px] px-[4px] py-[3px] rounded capitalize" 
                v-for="item in props.data.types" 
                :key="item.type.name"
                :class="item.type.name" >
                    {{ item.type.name }}
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(['data'])
    // console.log(props.data);
</script>