<script>
  import {onDestroy} from 'svelte'
  import {userId} from '../../store'
  import {postDiary} from '../../helpers/api'
  import { Slider, TextField, Button } from "smelte";

  let rate = 5
  let body = ''
  let image,preview = ''
  let uid = null
  const unsubscribe = userId.subscribe( id => uid = id)

  const submit = async () => {
    if(body.length < 10) {
      alert('10文字以内では投稿出来ません')
      return false
    }
   const result = await postDiary(uid,body,rate,image)
    if (result === false) {
      alert('失敗です')
    } else {
      alert('投稿が完了しました')
      document.location.href = '/'
    }
  }

  onDestroy(() => {
    unsubscribe
  })

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

<h3>日記を書く</h3>
<form on:submit|preventDefault={submit} class="p-5">
  <p class="mb-4">今日の気分は{rate}点です</p>
  <Slider min="1" max="10" bind:value={rate} />
  <TextField label="日記の本文" class="bg-white-900" bind:value={body} textarea rows="5" outlined />
  {#if preview}
    <img src={preview} alt="preview" class=" m-auto mb-6"/>
  {/if}
  <label for="file-input" class="cursor-pointer bg-primary-600 text-white-900 px-4 py-3 rounded mb-6 block m-auto w-4/12">画像を選択</label>
  <input type="file" id="file-input" accept="image/*" class="hidden" bind:this={image} on:change={(e) => onSelectPreview(e)}/>
  <Button type="submit" class="text-white-900">Button</Button>
</form>