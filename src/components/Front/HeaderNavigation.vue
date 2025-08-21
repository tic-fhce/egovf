<template>
  <header>
    <nav class="container">
      <a href="/home" class="image">
        <img alt="Vue logo" class="logo" src="/logobtic.png" />
      </a>

      <ul class="">
        <li class="">          
          <RouterLink to="/" >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
            </svg>
            Home
          </RouterLink>
        </li>
        <li class="">          
          <RouterLink to="/actividad" >
            <svg  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M11 15h1" /><path d="M12 15v3" /></svg>
            Actividades
          </RouterLink>
        </li>
        <li class="">          
          <RouterLink to="/sesion">
            <svg  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M3 12h13l-3 -3" /><path d="M13 15l3 -3" /></svg>
            Ingresar
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
  header{
    background-color: var(--color-primary);  
    padding-block: 10px;
    padding-inline: 15px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  header nav {
    width: 100%;
    max-width: var(--size-page);
    display: flex; 
    justify-content: space-between;
    align-items: center;
  }

  header img {
    width: 80px;
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: contain;
    object-position: left center;
    /*mix-blend-mode: multiply;*/
  }

  header ul {
    display: flex;
    list-style: none;
    margin-bottom: 0;
    gap: 8px;
  }

  header ul li {
    color: white;    
  }

  header ul li a {
    color: var(--color-white);
    text-decoration: none;
    font-weight: 700;
    font-size: .7rem;    
    display: inline-flex;
    align-items: center;    
    text-transform: uppercase;
    transition: color .5s ease-out;

    &:hover {
      color: var(--color-third);
    }
  }
</style>