import { initializeApp } from "firebase/app";
import { getDownloadURL, ref, getStorage } from "firebase/storage";
import { data } from '../json/data'
import { addDoc, collection, getFirestore, getDocs, query, where } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA8BsvukiiNr0i_rimaidqO23xh4B6a2-4",
  authDomain: "ficsit-db.firebaseapp.com",
  projectId: "ficsit-db",
  storageBucket: "ficsit-db.appspot.com",
  messagingSenderId: "835387452812",
  appId: "1:835387452812:web:ab206f027c72771faabaa9",
  measurementId: "G-JSTXP7VT57"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app)
const db = getFirestore(app)

export const uploadItemsData = async () => {
  Object.values(data.items).forEach(async (item) => {
    const imageUrl_256 = await getDownloadURL(ref(storage, `images/items/${item.slug}_256.png`))
    const imageUrl_64 = await getDownloadURL(ref(storage, `images/items/${item.slug}_64.png`))

    setTimeout(async () => {
      await addDoc(collection(db, "items"), {
        ...item,
        imageUrl256: imageUrl_256,
        imageUrl64: imageUrl_64
      })
    }, 500)

  })
}

export const uploadRecipesData = () => {
  let recipes = Object.values(data.productionRecipes)

  recipes.forEach(async (recipe) => {
    recipe.ingredients.forEach(async (ingredient) => {
      const imageUrl_64 = await getDownloadURL(ref(storage, `images/items/${ingredient.itemClass}_64.png`))

      ingredient.imageUrl64 = imageUrl_64
    })

    recipe.products.forEach(async (product) => {
      const imageUrl_64 = await getDownloadURL(ref(storage, `images/items/${product.itemClass}_64.png`))

      product.imageUrl64 = imageUrl_64
    })

    if(recipe.ingredients[0].imageUrl64) {
      // console.log('Request sent')
      // setTimeout(async () => {
      //   await addDoc(collection(db, 'productionRecipes'), {
      //     ...recipe
      //   })
      // }, 500)
    }
  })
}

export const getAllItems = async () => {
  const querySnapshot = await getDocs(collection(db, "items"))

  let items = []

  querySnapshot.forEach((doc) => {
    items.push(doc.data())
  })

  return items
}

export const getItemByName = async (name) => {
  const q = query(collection(db, 'items'), where('slug', '==', name))

  const querySnapshot = await getDocs(q)

  let item = {}

  querySnapshot.forEach(doc => {
    item = doc.data()
  })

  return item
}

export const getAllProductionRecipes = async () => {
  const querySnapshot = await getDocs(collection(db, "productionRecipes"))

  let recipes = []

  querySnapshot.forEach((doc) => {
    recipes.push(doc.data())
  })

  console.log(recipes)
  return recipes
}