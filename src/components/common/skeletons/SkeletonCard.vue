<template>
	<div class="card">
		<div class="card-image">
					<figure class="image is-4by3">
						<img
							src="/src/assets/skeleton-image.svg"
							alt="Cargando ..."
							class="is-skeleton"
						/>
					</figure>
		</div>
		<div class="card-content">
			<p class="is-skeleton">Esto simula contenido cargando...</p>
		</div>
	</div>
</template>

<script setup>
// No props necesarios, es solo placeholder visual
</script>
<style lang="scss" scoped>
	@forward "bulma/sass/components/card";
	.card-image img.is-skeleton {
		min-height: 227.25px;
	}
</style>
