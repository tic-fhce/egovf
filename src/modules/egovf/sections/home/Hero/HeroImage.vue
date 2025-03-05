<script setup>

</script>

<template>
  <section class="hero">
    <picture>
      <source srcset="/egovf.webp" type="image/webp">
      <img src="/egovf.jpg" alt="hero-image">
    </picture>

    <div class="brand">
      <h1>
        Facultad de Humanidades y Ciencias de la Educación
      </h1>
      <span>
        <br>
        e-GOVF
        <br>
      </span>
      <button>
        Unidad - TIC
      </button>
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
  aspect-ratio: 16 / 9;
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

h1 {
  font-size: clamp(2.5rem, 3.5vw, 4rem);
  max-width: 900px;
  text-align: center;
  font-weight: 700;
}

span {
  color: var(--color-white);
  font-weight: normal;
  font-size: 1.2rem;
  padding-block: .5rem;
  border-top: 3px solid var(--color-third);
}

button {
  padding-inline: 2rem;
  padding-block: 1rem;
  border-radius: 1.5rem;
  border: 0;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-weight: 700;
  transition: background .5s ease, color .5s ease;
  text-transform: uppercase;

  &:hover {
    background-color: var(--color-third);
  }
}
</style>
