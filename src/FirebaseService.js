import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBXa94mtfrLMxzncM0opNJYljPHn_DTEaI',
  authDomain: 'carbon-sequester-84748.firebaseapp.com',
  projectId: 'carbon-sequester-84748',
  storageBucket: 'carbon-sequester-84748.appspot.com',
  messagingSenderId: '360472874725',
  appId: '1:360472874725:web:14bc5162de04bcb3cece0c',
  measurementId: 'G-TR87M8CHH0',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const storageRef = firebase.storage().ref();
const firestore = firebase.firestore();
const auth = firebase.auth();

const uploadFile = (file, fullFilePath, progressCallback) => {
  const uploadTask = storageRef.child(fullFilePath).put(file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      progressCallback(file.name, progress);
    },
    (error) => {
      throw error;
    }
  );

  return uploadTask.then(async () => {
    const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();

    return { name: file.name, downloadUrl };
  });
};

const createDocument = (collection, document) => {
  return firestore.collection(collection).add(document);
};

const updateDocument = (collection, docId, document) => {
  return firestore
    .collection(collection)
    .doc(docId)
    .set(document, { merge: true });
};

const subscribeToAuthChanges = (handleAuthChange) => {
  auth.onAuthStateChanged((user) => {
    handleAuthChange(user);
  });
};

export default {
  uploadFile,
  createDocument,
  updateDocument,
  firestore,
  subscribeToAuthChanges,
  auth,
};
