<script setup>
	
</script>

<template>
	<div class="about">
		<div class="wrapper">
			<div class="image">
				<img src="/about.jpg" alt="Imagen de la facultad">
			</div>
			<div class="content">
				<img src="/logoumsa.png" alt="Logo de la umsa">
				<p>
					Avanzando a la Tecnología con Sistemas Interoperables de Recursos Extendidos y desarrollados para satisfacer las necesidades <strong>Administrativas, Académicas y Humanitarias dentro de las Normativas ISO</strong>, con el fin de mejorar los Servicios de recursos de información.
				</p>
				<a href="https://fhce.umsa.bo/" target="_blank">Conoce la Facultad</a>
			</div>
		</div>
	</div>
</template>

<style scoped>
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

	.about{
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
			object-position: bottom center;
		}
	}

	.content {
		width: 100%;
		height: 100%;		
		grid-column: 4 / 8;
		grid-row: 1 / 6;
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
		.content, .image {
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
		.wrapper {
			display: flex;
			flex-direction: column-reverse;
			justify-content: space-between;
		}

		.content{
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
			}
		}
	}

</style>