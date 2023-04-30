<script>
	import {onMount} from "svelte";

	let container;

	onMount(async () => {
		// works in typescript as well, tested
		await import('$lib/default-web-component.js');
		const element = document.createElement('default-web-component');
		container.appendChild(element);

		await import('$lib/remote-angular.js');
		const element1 = document.createElement('wc-example');
		container.appendChild(element1);
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
