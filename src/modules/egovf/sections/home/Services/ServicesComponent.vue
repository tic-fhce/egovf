<script setup>
	
</script>

<template>
	<section class="services container">
		<div class="services-title">
			<h2>Once Only</h2>
		</div>
		<ul class="services-list">
			<li>
				<svg width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" /><path d="M18 14v4h4" /><path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M15 3v4" /><path d="M7 3v4" /><path d="M3 11h16" /></svg>
				<div>
					<h3>Optimizacion</h3>
					<p>
					Optimizando los servicios de la Facultad.
				</p>
				</div>
			</li>
			<li>
				<svg  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19l18 0" /><path d="M5 6m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" /></svg>
				<div>
					<h3>Modulos</h3>
					<p>Modulos Interoperables e-GOVF.</p>
				</div>
			</li>
			<li>
				<svg  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
				<div>
					<h3>Conectividad</h3>
					<p>Protegiendo a los usuarios J-EYES</p>
				</div>
			</li>
			<li>
				<svg  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 11h.009" /><path d="M14 15h.009" /><path d="M12 6h.009" /><path d="M8 10h.009" /><path d="M3 21l17 -17" /><path d="M3 3v18h18" /></svg>
				<div>
					<h3>Estadisticas</h3>
					<p>Mejorando los Servicios con Información Solida.</p>
				</div>
			</li>
		</ul>
	</section>

</template>

<style scoped>

	@keyframes entry-back {
		from {
			opacity: 0;			
		}

		to {
			opacity: 1;
		}
	}

	.services {
		display: flex;
		width: 100%;
		margin-block: 5rem;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		flex-wrap: wrap;
		animation: entry-back linear both;
		animation-timeline: view();
		animation-range: entry 20% cover 40%;
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	li {
		display: flex;
		gap: 1rem;
		border-left: 3px solid var(--color-black);
		padding-left: 1rem;
		position: relative;
		align-items: center;
		padding-bottom: 1rem;
	}

	li:first-child {
		padding-top: 1rem;
	}	

	li::before {
		content: "";
		width: 1rem;
		height: 1rem;
		background: var(--color-third);
		position: absolute;
		left: -.5rem;
		top: .5rem;
		border-radius: 100%;
	}

	li:first-child::before {
		top: 1rem;
	}


	li h3, li p {
		line-height: .9;
	}

	li h3 {
		font-size: 1.5rem;
	}

	li div {
		display: inline-block;
		place-content: center;
	}

	h2 {
		font-size: 3rem;
		font-weight: bold;
		position: relative;
	}

	h2::before {
		content: "";
		position: absolute;
		width: 50%;
		height: 5px;
		background-color: var(--color-third);
		bottom: -.5rem;
		left: 0;
		right: 0;
		margin-inline: auto;
	}

</style>





















