import { collection,query,where,getDoc,getDocs,orderBy,doc,Timestamp,setDoc,updateDoc } from "firebase/firestore";
import {db} from './firebase'
import dayjs from "dayjs";

export const postDiary = async (uid='',body='',rate=1) => {
  const id = doc(collection(db,'diaries')).id //idを作成
  const diariesRef = doc(db,'diaries',id)
  const docRef = await setDoc(diariesRef, {
    uid: uid,
    body: body,
    rate:rate,
    id:id,
    created_at:dayjs().format('YYYY-MM-DD HH:mm:ss')
    //created_at:Timestamp.now() firebase timestampを使う場合
  }).then(() => {
    return true
  }).catch((error) => {
    console.error (error)
    return false
  })
}

export const updateDiary = async (id,rate,body) => {
  const diariesRef = doc(db,'diaries',id)
  const docRef = await setDoc(diariesRef,{
    id:id,
    body: body,
    rate:rate,
    updated_at:dayjs().format('YYYY-MM-DD HH:mm:ss')
  },{merge:true})
    .then(() => {
      return true
    })
    .catch((error) => {
      console.error (error)
      return false
    })
}

//上記と同等
export const updateDiaryV2 = async (id,rate,body) => {
  const diariesRef = doc(db,'diaries',id)
  const docRef = await updateDoc(diariesRef,{
    id:id,
    body: body,
    rate:rate,
    updated_at:dayjs().format('YYYY-MM-DD HH:mm:ss')
  })
    .then(() => {
      return true
    })
    .catch((error) => {
      console.error (error)
      return false
    })
}

export const fetchDiaries = async (uid="") => {
  const diaries = query(
    collection(db,'diaries'),
    where('uid','==',uid),
    orderBy('created_at','desc'))
  const querySnapshot = await getDocs(diaries)
  const diaryData = []
  querySnapshot.forEach(doc => {
    diaryData.push({
      id:doc.id,
      body:doc.data().body,
      rate:doc.data().rate,
      created_at : doc.data().created_at
    })
  })
  return diaryData
}

export const getDiary = async (id='') => {
  const docRef = doc(db,'diaries',id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    return false
  }
}