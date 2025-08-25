<template>
	<section class="services">
		<div class="services-title">
			<h2>Como Funciono ?</h2>
		</div>
		<ul class="services-list">
			<li>
				<svg width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" /><path d="M18 14v4h4" /><path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M15 3v4" /><path d="M7 3v4" /><path d="M3 11h16" /></svg>
				<div>
					<h3>Verifica</h3>
					<p>Verifica la disponibilidad de la fecha de tu evento en el calendario.
                    </p>
				</div>
			</li>
			<li>
				<svg  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19l18 0" /><path d="M5 6m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" /></svg>
				<div>
					<h3>Registrar Evento</h3>
					<p>Para registrar tu evento y reservar los ambientes, debes presentarte personalmente.</p>
                    <p><strong>Acude a la Dirección de tu Carrera o a la Unidad a la que perteneces.</strong></p>
                    <p>Si no formas parte de la Facultad de Humanidades y Ciencias de la Educación,</p>
                    <p>por favor, dirígete a la Administración Facultativa.</p>
				</div>
			</li>
			<li>
				<svg  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
				<div>
					<h3>Solocitud de Reserva</h3>
					<p>Una vez registrado tu evento, se genera la solicitud de reserva.</p>
                    <p>Esta deberá estar firmada y contar con el Visto Bueno (Vo.Bo.).</p>
                    <p>del Director de Carrera, Responsable de Unidad, u otra autoridad correspondiente.</p>
                    <p>Preséntate en Ventanilla Única de la Facultad y entrega tu solicitud.</p>
				</div>
			</li>
			<li>
				<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M7 22V11a2 2 0 0 1 2-2h4l1-5a2 2 0 0 1 4 0v7h3a2 2 0 0 1 2 2l-1 7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" /> <path d="M2 11h5v11H2z" /></svg>
				<div>
					<h3>Evento Confirmado</h3>
					<p>Verifica en la página principal si tu evento ha sido confirmado.</p>
                    <p>El personal correspondiente se pondrá en contacto contigo para ultimar los detalles de tu evento.</p>

				</div>
			</li>
		</ul>
	</section>

</template>

<script>
	
</script>

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
        color: black;
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
        color: black;
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




