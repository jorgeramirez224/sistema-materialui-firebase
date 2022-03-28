// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { async } from "@firebase/util";
import { collection, getDocs, setDoc, deleteDoc, getFirestore, doc } from 'firebase/firestore';
import { uuid } from 'uuidv4';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export function firebaseConfig() {

  const config = {
    apiKey: "AIzaSyD7V9goKtx4cUGD9tFSarK920ufKj2HSfA",
    authDomain: "sistema-18aef.firebaseapp.com",
    projectId: "sistema-18aef",
    storageBucket: "sistema-18aef.appspot.com",
    messagingSenderId: "616833234165",
    appId: "1:616833234165:web:a8589bedd1fece0da0c1bc",
    measurementId: "G-WDHJCDMCVX"
  };

  // Initialize Firebase
  const app = initializeApp(config);
  const analytics = getAnalytics(app);
}

export function firebaseRegistrarUsuario(email, password) {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(credenciales => {
      //credenciales.user
    });

}

export async function firebaseIniciarSesion(email, password) {
  try {
    let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
    //credenciales.user
  }
  catch(e) {
    return false;
  } 
  return true;
}

export async function firebaseBuscar(coleccionABuscar) {
  let listado = [];
  let consulta = collection(getFirestore(), coleccionABuscar);
  let resultado = await getDocs(consulta);
  resultado.forEach((documento) => {
    let objeto = documento.data();
    objeto.id = documento.id;
    listado.push(objeto);
  });
  return listado;
}

export function firebaseCrear(coleccion, objeto) {
  objeto.id = uuid();
  let referencia = doc(getFirestore(), coleccion, objeto.id);
  setDoc(referencia, objeto)
}

export async function firebaseEliminar(coleccion, id) {
  await deleteDoc(doc(getFirestore(), coleccion, id));
}
