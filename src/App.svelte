<script>
  import "smelte/src/tailwind.css" ;
  import { Router, Route } from "svelte-routing";
  import {Footer,Header} from './components/Layouts'
  import {Create,About,Diary,Home} from './components/pages'
  import './helpers/firebase'

	export let url = '';
</script>

<main class="bg-background-500">
  <Header/>
  <section class="content">
    <Router url="{url}">
      <div>
        <Route path="diary/:id" let:params><Diary id={params.id}/></Route>
        <Route path="create" component="{Create}" />
        <Route path="about" component="{About}" />
        <Route path="/"><Home /></Route>
      </div>
    </Router>
  </section>
  <Footer/>
</main>

<style>
	main {
		text-align: center;
		max-width: 640px;
		margin: 0 auto;
	}

  .content {
    min-height: calc(100vh - 60px - 60px);
  }

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>