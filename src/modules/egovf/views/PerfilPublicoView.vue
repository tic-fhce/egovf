<template>
	<div class="about">
		<div class="wrapper">
			<div class="image">
				<picture>
					<img :src="this.empleado.foto" alt="Imagen de la facultad">
				</picture>
			</div>
			<div class="content">
				<img src="/logoumsa.png" alt="Logo de la umsa">
				<hr>
				<ul>
					<li><label>CIF : </label> {{ this.empleado.cif }}</li>
					<li>{{ this.empleado.empleado }} <label>| {{ this.empleado.unidad }}</label></li>
					<li><label>Cargo : </label> {{ this.empleado.cargo }}</li>
				</ul>
				<h3>Valido Hasta : {{ this.empleado.salida }}</h3>
				<p>Para tener mas informacion : </p>
				<a href="https://svfhce.umsa.bo/sesion">Inicia Sesion</a>
			</div>
		</div>
	</div>
	<FooterComponent />
</template>

<script>
import FooterComponent from '@/modules/egovf/sections/home/Footer/FooterComponent.vue';
import EmpleadoService from '@/modules/egovf-emp/services/empleadoService';
export default {
	name: 'ListaCiudadanoView',
	components: {
		FooterComponent
	},
	data() {
		return {
			empleadoService: null,
			cif: 0,
			empleado: {
				id: 0,
				cif: 0,
				empleado: '',
				foto: '',
				cargo: '',
				unidad: '',
				salida: ''
			}

		}
	},
	beforeCreate() {

	},
	created() {
		this.empleadoService = new EmpleadoService();
	},
	mounted() {
		this.cif = this.$route.params.cif;
		this.getEmpleado(); // Llamamos los datos del Usuario
	},
	methods: {
		async getEmpleado() {//Funcion que debuelve los datos del ciudadano 
			var emp = {
				id: 0,
				cif: 0,
				empleado: '',
				foto: '',
				cargo: '',
				unidad: '',
				salida: ''
			};
			await this.empleadoService.getEmpleado(this.cif).then((response) => {
				emp = response.data;
			});
			this.empleado.id = emp.id;
			this.empleado.cif = emp.cif;
			this.empleado.empleado = emp.empleado;
			this.empleado.cargo = emp.contratos[0].cargo;
			this.empleado.unidad = emp.contratos[0].unidad;
			this.empleado.foto = "https://fhcevirtual.umsa.bo/egovf-img/imagenes/800/" + emp.foto;
			this.empleado.salida = emp.salida;
		}

	}
}
</script>

<style scoped>
label {
	font-size: 1rem;
	font-weight: 700;
	color: var(--color-white);
	text-transform: uppercase;
}

@keyframes entry-left {
	from {
		opacity: 0;
		transform: translateX(-100%);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes entry-right {
	from {
		opacity: 0;
		transform: translateX(100%);
	}

	to {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes entry-bottom {
	from {
		opacity: 0;
		transform: translateY(100%);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.about {
	width: 100%;
	min-height: 100dvh;
	background-color: var(--color-black);
	display: flex;
	justify-content: center;
	align-items: center;
	padding-inline: 1rem;
	position: relative;
	max-width: 100vw;
}

.wrapper {
	width: 100%;
	max-width: 1200px;
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: repeat(7, 1fr);
}

.image {
	min-width: 100px;
	min-height: 100px;
	width: 100%;
	height: 100%;
	grid-column: 1 / 6;
	grid-row: 2 / 8;

	animation: entry-left linear both;
	animation-timeline: view();
	animation-range: entry 20% cover 30%;

	& img {
		display: inline-block;
		min-width: 300px;
		max-width: 700px;
		width: 100%;
		height: 100%;
		border-radius: 1.5rem;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		object-position: top;
	}
}

.content {
	width: 100%;
	height: 100%;
	grid-column: 4 / 8;
	grid-row: 2 / 6;
	border-radius: 1.5rem;
	border: 3px solid var(--color-third);
	background-color: var(--color-primary);
	color: var(--color-white);
	padding: 2rem;

	animation: entry-right linear both;
	animation-timeline: view();
	animation-range: entry 20% cover 40%;
}

@media (max-width: 768px) {

	.content,
	.image {
		animation: entry-bottom linear both;
		animation-timeline: view();
		animation-range: entry 10% cover 30%;
	}
}

.content img {
	width: 100%;
}

a {
	text-decoration: none;
	display: inline-block;
	padding-inline: 1rem;
	padding-block: .5rem;
	border-radius: 1rem;
	border: 0;
	background-color: var(--color-third);
	color: var(--color-white);
	font-weight: 700;
	transition: background .5s ease, color .5s ease;
	text-transform: uppercase;

	&:hover {
		background-color: var(--color-primary);
		outline: 1px solid var(--color-third);
	}
}

@media (max-width: 768px) {

	.content,
	.image {
		animation: entry-bottom linear both;
	}

	.about {
		margin-top: 50px;
	}

	.wrapper {
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-between;
	}

	.content {
		z-index: 20;
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}

	.image {
		margin-top: -.5rem;
		text-align: center;

		& img {
			border-top-right-radius: 0;
			border-top-left-radius: 0;
			aspect-ratio: 9 / 9;
		}
	}

	a {
		text-align: center;
		display: block;
	}
}
</style>