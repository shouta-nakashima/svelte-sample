<script>
  import {onMount} from 'svelte'
  import { getDiary , updateDiary,updateDiaryV2 } from '../../helpers/api'
  import { Slider, TextField, Button,ProgressCircular } from "smelte";
  import dayjs from "dayjs";
  export let id

  let promise = getDiary()
  let rate,body,image,preview
  onMount(async () => {
    promise = await getDiary(id)
    rate = promise.rate
    body = promise.body
  })

  const submit = async () => {
    const result = await updateDiaryV2(id,rate,body,image)
    console.log (result)
    if (result === false) {
      alert('失敗です')
    } else {
      alert('投稿が完了しました')
      document.location.href = '/'
    }
  }

  const onSelectPreview = (e) => {
    let target = e.target.files[0]
    image = target
    let render = new FileReader()
    render.readAsDataURL(target)
    render.onload = e => {
      preview = e.target.result
    }

  }
</script>

{#await promise}
  <p class="flex justify-center mt-10"><ProgressCircular/></p>
{:then diary}
  <h1 class="h4">{dayjs(promise.created_at).format('YYYY年MM月DD日')}の日記</h1>
  <form on:submit|preventDefault={submit} class="p-5">
    {#if !preview}
      <img class="m-auto mb-6" alt="image" src={diary.image ? diary.image : '/dummy.jpeg'}/>
      {:else }
      <img class="m-auto mb-6" alt="image" src={preview}/>
    {/if}
    <label for="file-input" class="cursor-pointer bg-primary-600 text-white-900 px-4 py-3 rounded mb-6 block m-auto w-4/12">画像を選択</label>
    <input type="file" id="file-input" accept="image/*" class="hidden" bind:this={image} on:change={(e) => onSelectPreview(e)}/>
    <p class="mb-4">気分は{rate}点です</p>
    <Slider min="1" max="10" bind:value={rate} />
    <TextField label="日記の本文" class="bg-white-900" bind:value={body} textarea rows="5" outlined />
    <Button type="submit" class="text-white-900">Button</Button>
  </form>
{/await}