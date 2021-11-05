<script>
  import {onMount,onDestroy} from 'svelte'
  import {Button,ProgressCircular} from 'smelte'
  import {Router,Link} from 'svelte-routing'
  import {userId} from "../../store";
  import {fetchDiaries} from "../../helpers/api";
  import StarRating from 'svelte-star-rating';
  import dayjs from "dayjs";
  import {LoginWithGoogle} from '../../helpers/login'

  let uid
  const unsubscribe = userId.subscribe(id => uid = id)

  let promise = fetchDiaries()
  onMount(async () => {
    promise = await fetchDiaries(uid)
  })
  onDestroy(() => {unsubscribe})
</script>
{#if !uid}
<Button on:click={LoginWithGoogle} class="text-white-900 mt-10">ログイン</Button>
{:else}
  {#await promise}
    <p class="flex justify-center mt-10"><ProgressCircular/></p>
  {:then diaries}
    <Router>
      {#each diaries as diary}
        <Link to={`/diary/${diary.id}`} class="flex items-center mb-6">
          <aside class="diary-aside">
            <p class="text-left">{dayjs(diary.created_at).format('YYYY年MM月DD日')}</p>
            <img alt="image" class="diary-image" src={diary.image ? diary.image : '/dummy.jpeg'}/>
            <StarRating rating={diary.rate / 2} />
          </aside>
          <p>{diary.body}</p>
        </Link>
      {/each}
    </Router>
  {/await}
{/if}
<style>
  .diary-aside {
    width: 40%;
    margin-right: 1rem;
  }

  .diary-image {
    width: 100%;
  }
</style>