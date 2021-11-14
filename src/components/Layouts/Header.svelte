<script>
  import {onMount} from "svelte";
  import Hamburger from 'svelte-hamburgers';
  import Menu from "./Menu.svelte";
  import BrightnessContrast32 from "carbon-icons-svelte/lib/BrightnessContrast32/BrightnessContrast32.svelte";
  let open;

  const toggleDark = () => {
    if(localStorage.isDark === 'true') {
      document.getElementById('body').classList.remove('mode-dark')
      localStorage.isDark = 'false'
    } else {
      document.getElementById('body').classList.add('mode-dark')
      localStorage.isDark = 'true'
    }
  }

  onMount(() => {
    if(localStorage.isDark === 'true') {
      document.getElementById('body').classList.add('mode-dark')
      localStorage.isDark = 'true'
    } else {
      document.getElementById('body').classList.remove('mode-dark')
      localStorage.isDark = 'false'
    }
  })
</script>

<header class="bg-primary-900 flex justify-between items-center">
  <Hamburger bind:open --color="white" />
  <img class="cursor-pointer" src="/logo-udemy.png" alt="logo" on:click={() => location.href='/'}/>
  <BrightnessContrast32 class="mr-6" on:click={toggleDark}/>
</header>
<Menu bind:open/>

<style>
  header {
    height: 60px;
    color: #FFFFFF;
  }
  img {
    max-height: 100%;
  }
</style>

<svelte:head>
  <!-- Import base css -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/base.css" />
  <!-- Import spin css (spin is default type) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/types/spin.css" />
</svelte:head>