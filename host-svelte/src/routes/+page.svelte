<script>
	import {onMount} from "svelte";

	let container;

	onMount(async () => {
		// works in typescript as well, tested
		await import('$lib/default-web-component.js');
		container.appendChild(document.createElement('default-web-component'));

		await import('$lib/remote-angular.js');
		container.appendChild(document.createElement('wc-example'));

		await import('$lib/remote-vue.js');
		container.appendChild(document.createElement('vue-web-component'));
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section bind:this={container}>
</section>

<style>
</style>
