<script setup>
import FormLogin from '../components/Session/FormLogin.vue'

</script>

<template>
  <section class="hero">
    <picture>
      <source srcset="/egovf.webp" type="image/webp">
      <img src="/egovf.jpg" alt="hero-image">
    </picture>
    <div class="brand">
      <div class="container">
        <div class="wrapper">
          <div class="logo">
            <img src="/logotic.png" alt="Logo tic umsa">
          </div>
          <div class="credentials">
            <FormLogin/>
          </div>
        </div>
      </div>
    </div>
    
  </section>

  
</template>

<style scoped>

.hero {
  width: 100%;
  height: 100dvh;
  background-color: var(--color-black);
  position: relative;
}
img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: .5;
}
.brand {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: var(--color-white);
  padding-inline: 1rem;
}
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: var(--color-white);
  width: clamp(300px, 100%, 500px);
  flex-wrap: wrap;
  height: auto;
  position: relative;
  border-radius: .5rem;
  overflow: hidden;
}

.wrapper .logo {
  max-width: 40px;
  height: auto;
  width: 100%;
  text-align: center;
  position: absolute;
  top: .5rem;
  left: 0;
  right: 0;
  z-index: 1;
  margin-inline: auto;  
  overflow: hidden;
}

@media (min-width: 720px) {
  .wrapper {
    width: clamp(300px, 100%, 700px);
    box-shadow: 0px 20px 30px rgba(0, 0, 0, .7);
  }
  
  .wrapper .logo {
    position: static;
    border-radius: 0;
    max-width: 250px;
    height: 100%;
    padding: 1.5rem;
  }
}

.wrapper img {
  height: auto;
  width: 100%;
  flex-basis: 100%;
  height: auto;  
  object-fit: cover;
  padding-top: .5rem;
}

.wrapper .credentials {
  background-color: var(--color-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-basis: 300px;
  flex-grow: 1;
  height: 100%;
  min-height: 400px;
  position: relative;
}

.wrapper .signup {}

</style>