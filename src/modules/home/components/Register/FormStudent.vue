<template>
  <form>
    <h2>Crea una cuenta de Estudiante</h2>
    <label for="ci">
      <input type="text" id="ci" name="ci" required placeholder="">
      <span>Cedula de Identidad</span>
    </label>
    <label for="mat">
      <input type="text" id="mat" name="mat" required placeholder=" ">
      <span>Matricula</span>
    </label>
    <div class="credentials__password">
      <label for="password">
        <input type="password" id="password" name="password" required placeholder=" ">
        <span>Contraseña</span>
      </label>
      <label for="password2">
        <input type="password" id="password2" name="password2" required placeholder=" ">
        <span>Repetir Contraseña</span>
      </label>
    </div>
    <button type="submit">Crear Cuenta</button>
  </form>
</template>

<style scoped>
.credentials {
  width: 100%;
  height: auto;
}

.credentials form {
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
  position: relative;
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
  left: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: start;
  transition: all .3s ease;
  transform-origin: left top;
}

.credentials form input:focus~span,
.credentials form input:valid~span,
.credentials form input:not(:placeholder-shown)~span {
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

.credentials__password {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.credentials__password label {
  flex-basis: 220px;
  flex-grow: 1;
}
</style>