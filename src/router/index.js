import { createWebHistory,  createRouter } from "vue-router";

import Home from '../page/Home.vue'
import Detail from '../page/Detail.vue'

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {
            path : '/',
            name : 'Home',
            component : Home
        },
        {
            path : "/:pokemon/:id",
            name : "Detail",
            component : Detail
        }
    ]
})

export default router


