<template>
    <div class="card w-full py-[15px] px-[5px] rounded-2xl flex flex-col text-center">
        <p class="poke-id ">#{{ props.data.id }}</p>
        <div class="poke-img pt-[100%] bg-contain" :style="{backgroundImage : `url(${props.data.sprites.front_default})`}"></div>
        <h3 class="text-xl font-bold capitalize">{{ props.data.name }}</h3>
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
</script>

<style>
    .grass {
        background-color: #78cd54;
    }

    .poison {
        background-color: #a33ea1;
    }

    .fire {
        background-color: #ff421c;
    }

    .flying {
        background-color: #a98ff3;
    }

    .water {
        background-color: #6390f0;
    }

    .bug {
        background-color: #6390f0;
    }

    .normal {
        background-color: #a8a77a;
    }

    .electric {
        background-color: #f7d02c;
    }

    .ground {
        background-color: #e2bf65;
    }

    .fairy {
        background-color: #d685ad;
    }

    .fighting {
        background-color: #c22e28;
    }

    .psychic {
        background-color: #f95587;
    }

    .rock {
        background-color: #b6a136;
    }

    .steel {
        background-color: #b7b7ce;
    }

    .ice {
        background-color: #96d9d6;
    }

    .ghost {
        background-color: #735797;
    }

    .dark {
        background-color: #705746;
    }

    .dragon {
        background-color: #6f35fc;
    }
</style>