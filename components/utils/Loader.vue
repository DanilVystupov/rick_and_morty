<template>
    <div class="loader">
      <div class="loader-circle"></div>
    </div>
</template>
  
<style scoped>
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
  
.loader-circle {
    width: 70px;
    height: 70px;
    border: 4px solid #3498db;
    border-top: 4px solid transparent;
    border-radius: 50%; 
    animation: spin 1s infinite linear;
}
  
@keyframes spin {
    from {
        transform: rotate(0deg) scale(1);
    }

    to {
        transform: rotate(360deg) scale(1.4);
    }
}

</style>