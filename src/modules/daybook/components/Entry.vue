<template>
    <div
        class="mb-3 entry-container  pointer p-2"
        @click="$router.push( { name: 'entry', params: { id:10 } } )">
        <!-- titulo -->
        <div
            class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">15 </span>
            <span class="mx-1 fs-5">Julio </span>
            <span class="mx-2 fw-light">2021, Jueves</span>
        </div>
        <div class="entry-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum rem iusto dolore minus accusamus et reprehenderit laboriosam itaque numquam labore? Quisquam ipsum reprehenderit esse, voluptate dolorum modi ab unde consectetur?
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.entry-container{
    border-bottom:1px solid #2c3e50;
    transition: 0.2 ease-in;
    &:hover{
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2 ease-in;

    }
.entry-description{
    font-size: 12px;
}
}
</style>