<script>
  import {onMount,onDestroy} from 'svelte'
  import {Button,ProgressCircular,TextField} from 'smelte'
  import {Router,Link} from 'svelte-routing'
  import {userId} from "../../store";
  import {fetchDiaries} from "../../helpers/api";
  import StarRating from 'svelte-star-rating';
  import dayjs from "dayjs";
  import {LoginWithGoogle} from '../../helpers/login'

  let uid,filterMonth
  const unsubscribe = userId.subscribe(id => uid = id)

  let promise = fetchDiaries()
  onMount(async () => {
    promise = await fetchDiaries(uid)
  })
  onDestroy(() => {unsubscribe})

  const filterHandle = async () => {
    promise = await fetchDiaries(uid, filterMonth)
  }
</script>
{#if !uid}
<Button on:click={LoginWithGoogle} class="text-white-900 mt-10">ログイン</Button>
{:else}
  <section class="m-auto mb-10 w-6/12">
    <h5>日記を検索</h5>
    <TextField type="month" bind:value={filterMonth} on:change={filterHandle}/>
  </section>
  {#await promise}
    <p class="flex justify-center mt-10"><ProgressCircular/></p>
  {:then diaries}
    {#if  diaries.length > 0}
      <Router>
        {#each diaries as diary}
          <Link to={`/diary/${diary.id}`} class="flex items-center mb-6 border-b-2">
            <aside class="diary-aside">
              <p class="text-left">{dayjs(diary.created_at).format('YYYY年MM月DD日')}</p>
              <img alt="image" class="diary-image" src={diary.image ? diary.image : '/dummy.jpeg'}/>
              <StarRating rating={diary.rate / 2} />
            </aside>
            <p>{diary.body}</p>
          </Link>
        {/each}
      </Router>
      {:else }
      <p>日記が見つかりませんでした。。。</p>
      {/if}
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