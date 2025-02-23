<script setup>
    import { computed, onMounted, ref } from 'vue'
    import Card from './components/Card.vue'

    const url =  'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898'
    const allPokemon = ref([]);
    const searchResult = ref('')
    const temp = ref()
    const currentIndex = ref(36)

    async function fetchData(){
        console.log('Đang fetch api');
        
        const response = await fetch(url)
        const data = await response.json()
        const PromiseData = [];

        for (let pokemon of data.results){
            const responsePokemon = await fetch(pokemon.url)
            const dataPokemon = await responsePokemon.json()
            allPokemon.value.push(dataPokemon)
        }
        temp.value = allPokemon.value
    }

    const renderList = computed(() => {
        if(searchResult.value === ''){
            return allPokemon.value.slice(0, currentIndex.value)
        }
        else {
            return allPokemon.value.filter(pokemon => pokemon.name.toLowerCase().includes(searchResult.value.toLowerCase()))
        }
    })

    function loadMoreHandle(){
        console.log('Load more pokemon');
        
        currentIndex.value += currentIndex.value*2;
    }

    onMounted(() => {
        fetchData()
    })
</script>

<template>
    <div class="container mx-auto max-w-[1200px] pt-[50px] font-sans flex items-center flex-col">
        <div class="title  text-4xl">Pokemon API</div>
        <div class="search max-w-lg w-full mx-6 mt-16">
            <input 
                type="text"
                name="search"
                id="search"
                placeholder="Search some pokemon..." 
                class="w-full p-5 rounded-full border border-gray-500 shadow-lg"
                v-model="searchResult"
                @input = 'searchHandle'>
        </div>

        <div class="pokemon-wrapper w-full mx-5 mt-14 flex-wrap flex">
            <Card  v-for = "item in renderList" :key="item.name" :data = "item"/>
        </div>

        <button 
            class="bg-[#ff4d4f] text-white font-bold p-[15px] my-[30px] rounded-[8px] cursor-pointer"
            @click = 'loadMoreHandle'>
            Load More
        </button>
    </div>
</template>

<style scope>
    .col {
        width: calc(16.667% - 10px);
        box-shadow: #0000001a 0 4px 12px;
        cursor: pointer;
        transition: box-shadow .7s;

    }

    .col:hover {
        box-shadow: 0 5px 11px #0000002e, 0 4px 15px #00000026;
    }
    @media (max-width : 1200px) {
    .col {
        width: calc(25% - 10px);
    }
}

    @media (max-width : 960px) {
        .col {
            width: calc(33.333% - 10px);
        }
    }

    @media (max-width : 770px){
        .col {
            width: calc(50% - 10px);
        }
    }

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