<template>
  <form>
    <h2>Crear cuenta Administrativo</h2>
    <label for="name">
      <input type="text" id="name" name="name" required placeholder=" ">
      <span>Nombre</span>
    </label>
    <label for="position">
      <input type="text" id="position" name="position" required placeholder=" ">
      <span>Cargo</span>
    </label>
    <label for="email">
      <input type="email" id="email" name="email" required placeholder=" ">
      <span>Correo electronico</span>
    </label>
    <label for="password">
      <input type="password" id="password" name="password" required placeholder=" ">
      <span>Contraseña</span>
    </label>
    <label for="password2">
      <input type="password" id="password2" name="password2" required placeholder=" ">
      <span>Repetir Contraseña</span>
    </label>
    <button type="submit">Crear Cuenta</button>
  </form>
</template>

<style scoped>
.credentials {
  width: 100%;
  height: auto;
}

.credentials form{
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.credentials form h2 {
  padding-bottom: .25rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 500;
  position: relative;
  width: fit-content;
}

.credentials form h2::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 5px;
  background-color: var(--color-third);
  bottom: -.5rem;
  left: 0;
  right: 0;
}

.credentials form label {
  width: 100%;
  border-bottom: 1px solid var(--color-gray-dark);
  position:relative;
  padding-block: .5rem;
  cursor: text;
}
.credentials form input {
  width: 100%;
  border: 0;
  outline: 0;
}
.credentials form label span {
  position: absolute;
  display: inline-block;
  height: fit-content;
  left: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: start;
  transition: all .3s ease;
  transform-origin: left top;
}

.credentials form input:focus ~ span,
.credentials form input:valid ~ span,
.credentials form input:not(:placeholder-shown) ~ span{
  align-items: flex-start;
  top: -40%;
  transform: scale(0.8);
  left: 0%;
}


.credentials form button {
  width: 100%;
  padding: .5rem;
  border: 0;
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: .5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color .5s ease;
}

.credentials form button:hover {
  background-color: var(--color-secondary);
}
</style>