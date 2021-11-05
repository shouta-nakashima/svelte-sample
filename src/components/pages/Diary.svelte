<script>
  import {onMount} from 'svelte'
  import { getDiary , updateDiary,updateDiaryV2 } from '../../helpers/api'
  import { Slider, TextField, Button,ProgressCircular } from "smelte";
  import dayjs from "dayjs";
  export let id

  let promise = getDiary()
  let rate,body
  onMount(async () => {
    promise = await getDiary(id)
    rate = promise.rate
    body = promise.body
  })

  const submit = async () => {
    const result = await updateDiaryV2(id,rate,body)
    console.log (result)
    if (result === false) {
      alert('失敗です')
    } else {
      alert('投稿が完了しました')
      document.location.href = '/'
    }
  }
</script>

{#await promise}
  <p class="flex justify-center mt-10"><ProgressCircular/></p>
{:then diary}
  <h1 class="h4">{dayjs(promise.created_at).format('YYYY年MM月DD日')}の日記</h1>
  <form on:submit|preventDefault={submit} class="p-5">
    <img alt="image" src={diary.image ? diary.image : '/dummy.jpeg'}/>
    <p class="mb-4">気分は{rate}点です</p>
    <Slider min="1" max="10" bind:value={rate} />
    <TextField label="日記の本文" class="bg-white-900" bind:value={body} textarea rows="5" outlined />
    <Button type="submit" class="text-white-900">Button</Button>
  </form>
{/await}