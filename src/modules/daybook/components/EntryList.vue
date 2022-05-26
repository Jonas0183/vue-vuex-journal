<template>        
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input 
            type="text"
            class="form-control"
            placeholder="Buscar entradas" 
            v-model="term"
            />
        </div>
        <div class="mt-2 d-flex flex-column">
            <button class="btn btn-primary mx-3 "
            @click="$router.push({ name: 'entry', params: { id: 'new' } })">
                <i class="fa fa-plus-circle mr-2"></i>
                Nueva entrada
            </button>
        </div>
        <div class="entry-scroll-area">
            <Entry
            v-for="entry in entriesByTerm"
            :key="entry.id"
            v-model="term"
            :entry="entry"
            />
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { defineAsyncComponent } from 'vue'

export default {
    components:{
        Entry: defineAsyncComponent(() => import('./Entry.vue'))
    },
    computed: {
        entriesByTerm() {
            return this.getEntriesByTerm( this.term )
        },
        ...mapGetters('journal',['getEntriesByTerm'])
    },
    data() {
        return {
            term:''
        }
    },

}
</script>
<style lang="scss" scoped>

.entry-list-container{
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);

}
.entry-scroll-area{
    height: calc( 100vh - 110px );
    overflow: scroll;

}
</style>