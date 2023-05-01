<script>
	import {onMount} from "svelte";

	let container;

	onMount(async () => {
		// works in typescript as well, tested
		await import('$lib/default-web-component.js');
		container.appendChild(document.createElement('default-web-component'));

		await import('$lib/remote-angular.js');
		const remoteElementAngular = document.createElement('wc-example');
		remoteElementAngular.input = 'test';
		remoteElementAngular.arrayInput = [1, 2, 3];
		remoteElementAngular.output = e => console.log('output angular', e);
		container.appendChild(remoteElementAngular);

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
