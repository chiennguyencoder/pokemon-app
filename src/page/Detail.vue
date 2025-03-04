<script setup>
    import { onMounted, reactive, ref } from 'vue';
    import { useRoute } from 'vue-router';
    const route = useRoute()
    
    // Variable
    const id = route.params.id
    const pokemon = ref("Text")
    const pokemonSpecies = reactive({
        desc : "",
        evolution : []
    })

    // Get a Pokemon's description
    async function getSpeciesOfPokemon(url){
        const response = await fetch(url)
        const data = await response.json()

        pokemonSpecies["desc"] = data.flavor_text_entries[0].flavor_text

        // Get the evolution of the Pokemon
        const EvolutionResponsive = await fetch(data.evolution_chain.url)
        let EvolutionData = await EvolutionResponsive.json()
        
        const TempArray = []
        TempArray.push(EvolutionData.chain.species)
        EvolutionData = EvolutionData.chain.evolves_to

        while (Array.isArray(EvolutionData) && EvolutionData.length > 0){
            TempArray.push(EvolutionData[0].species)
            EvolutionData = EvolutionData[0].evolves_to || []
        }

        const evol = await Promise.all(TempArray.map(async item => {
            const obj = {}
            obj["name"] = item.name

            const response = await fetch(item.url)
            const data = await response.json()

            const response2 = await fetch(data.varieties[0].pokemon.url)
            const data2 = await response2.json()

            obj['img'] = data2.sprites.front_default
            return obj
        }))

        pokemonSpecies.evolution.push(...evol) 
        console.log("Pokemon's species data: ", pokemonSpecies)

    }

    // Get a Pokémon's data
    async function getPokemon(){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        const data = await response.json()
        pokemon.value = data;
        await getSpeciesOfPokemon(data.species.url)
        // console.log("Pokemon's data : ", data);
    }

   

    onMounted(() => getPokemon())

</script>

<template>
    <div class="container my-[30px] mx-auto">

        <!-- Back Button -->
        <router-link to="/">
            <button class="p-[8px] rounded-full shadow-md absolute"> &lt; Back</button>
        </router-link>

        <!-- Main -->
        <div class="max-w-[550px] mx-auto pt-[50px] text-center">
            <div class="w-[200px] h-[200px] bg-cover  mx-auto" :style="{backgroundImage : `url(${pokemon?.sprites?.front_default || 'https://liquipedia.net/commons/images/7/74/Pokemon_allmode.png'})`}"></div>
            <!-- Types -->
            <div class="flex justify-center ">
                <div 
                    class="mx-1 font-semibold text-[13px] px-[4px] py-[3px] rounded capitalize" 
                    v-for="item in pokemon.types" 
                    :key="item.type.name"
                    :class="item.type.name" >
                        {{ item.type.name }}
                </div>
            </div>
            <!-- Info -->
            <h3 class="text-xl font-bold capitalize mt-2">{{ pokemon.name }}</h3>
            <p> {{ pokemonSpecies.desc }}</p>

            <!-- Height & Weight -->
            <div class="flex justify-evenly mt-3">
                <div class="">
                    <h3 class="font-semibold text-[18px]">Height</h3>
                    <p class="w-[100px] p-[2px] bg-[#f6f8fc] text-center rounded-2xl">{{ pokemon.height }}</p>
                </div>
                <div>
                    <h3 class="font-semibold text-[18px]">Weight</h3>
                    <p class="w-[100px] p-[2px] bg-[#f6f8fc] text-center rounded-2xl">{{ pokemon.weight }}</p>
                </div>
            </div>

            <!-- Abilities -->
            <h3 class="font-semibold text-[18px]">Abilities</h3>
            <div class="flex justify-evenly mt-3 capitalize">
                <p 
                    class="w-[100px] p-[2px] bg-[#f6f8fc] text-center rounded-2xl"
                    v-for = "item in pokemon.abilities" 
                    :key = "item"
                    >{{ item.ability.name }}
                </p>
            </div>

            <!-- Stats -->
            <h3 class="font-semibold text-[18px]">Stats</h3>
            <div class="flex justify-evenly uppercase mt-3">
                <div class="rounded-full shadow-md p-[5px] bg-[#f6f8fc] ">
                    <p class="rounded-full text-white w-[25px] h-[25px] bg-[#df2140] text-[10px] leading-6 font-semibold ">HP</p>
                    <p class="">{{pokemon.stats?.[0]?.base_stat}}</p>
                </div>
                <div class="rounded-full shadow-md p-[5px] bg-[#f6f8fc]">
                    <p class="rounded-full text-white w-[25px] h-[25px] bg-[#ff994d] text-[10px] leading-6 font-semibold ">ATK</p>
                    <p class="">{{pokemon.stats?.[1]?.base_stat}}</p>
                </div><div class="rounded-full shadow-md p-[5px] bg-[#f6f8fc]">
                    <p class="rounded-full text-white w-[25px] h-[25px] bg-[#eecd3d] text-[10px] leading-6 font-semibold ">DEF</p>
                    <p class="">{{pokemon.stats?.[2]?.base_stat}}</p>
                </div><div class="rounded-full shadow-md p-[5px] bg-[#f6f8fc]">
                    <p class="rounded-full text-white w-[25px] h-[25px] bg-[#85ddff] text-[10px] leading-6 font-semibold ">SPA</p>
                    <p class="">{{pokemon.stats?.[3]?.base_stat}}</p>
                </div><div class="rounded-full shadow-md p-[5px] bg-[#f6f8fc]">
                    <p class="rounded-full text-white w-[25px] h-[25px] bg-[#96da83] text-[10px] leading-6 font-semibold ">SPD</p>
                    <p class="">{{pokemon.stats?.[4]?.base_stat}}</p>
                </div><div class="rounded-full shadow-md p-[5px] bg-[#f6f8fc]">
                    <p class="rounded-full text-white w-[25px] h-[25px] bg-[#fb94a8] text-[10px] leading-6 font-semibold ">SPD</p>
                    <p class="">{{pokemon.stats?.[5]?.base_stat}}</p>
                </div>
                
                
            </div>
            <!-- Evolution -->
            <h3 class="font-semibold text-[18px] mt-3">Evolution</h3>
            <div class="flex justify-center">
                <div class="flex items-center" v-for = "(item, index) in pokemonSpecies.evolution" :key = "item.name">
                    <p class="font-medium capitalize">{{ item.name }}</p>
                    <img :src="item.img" alt="">
                    <p class="font-bold mr-4" v-if = "index < pokemonSpecies.evolution.length - 1">&gt;</p>
                </div>
            </div>
            
        </div>
        
    </div>
</template>


<style>
    
</style>