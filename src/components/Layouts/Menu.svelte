<script>
  import {onDestroy} from 'svelte'
  import { fly, scale } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import {Router,Link} from 'svelte-routing'
  import {LoginWithGoogle,logout} from '../../helpers/login'
  import {userId} from '../../store'

  let uid;

  const unsubscribe =  userId.subscribe(id => {
    uid = id
  })
  onDestroy(() => unsubscribe)

  export let open;
</script>

{#if open}
  <nav class="bg-primary-900" on:click={() => open = false}>
    <Router>
      <Link class="block mb-3" to="/">Home</Link>
      <Link class="block mb-3" to="about">日記の効果とは？</Link>
      {#if !uid}
        <Link class="block mb-3" to="#" on:click={LoginWithGoogle}>Login</Link>
      {:else }
        <Link class="block mb-3" to="create">日記を書く</Link>
        <Link class="block mb-3" to="#" on:click={logout}>Logout</Link>
      {/if}
    </Router>
    <hr transition:scale={{ duration: 750, easing: quadOut, opacity: 1 }} />
  </nav>

{/if}

<style>

  nav {
    text-align: center;
    font-size: 1.5em;
    letter-spacing: 0.15em;
    padding: 1em;
    padding-top: 0;
    color: #eef;
  }
  a {
    cursor: pointer;
    width: max-content;
    margin: 1rem auto;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
