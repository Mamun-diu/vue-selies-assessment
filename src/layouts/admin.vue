<template>
    <div class="flex">
        <Sidebar />
        <div class="bg-gray-100 p-3 w-full">
            <slot />
        </div>
    </div>
    
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
export default {
    name: 'AdminLayout',
    components: {
        Sidebar
    }
}
</script>