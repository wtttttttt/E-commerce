<template>
    <div>
        <TypeNav></TypeNav>
    </div>
</template>
<script>
export default{
    created(){
        console.log(this.$route.params);
        console.log(this.$route.query);
    },
}
</script>
<style>
</style>