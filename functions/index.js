const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
require("dotenv").config();
const functions = require("firebase-functions");
const axios = require("axios")
const streamBuffers = require('stream-buffers');
// Gui is https://app.pinata.cloud/pinmanager

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.submit_proof = functions.firestore
  .document('proofs/{docId}')
  .onCreate(async (snap, context) => {
    const proof = snap.data();
    await submit_to_pinata(proof)

  });

async function submit_to_pinata(proof) {
  const pinata_api_secret = process.env.PINATA_API_SECRET
  const pinata_api_key = process.env.PINATA_API_KEY
  const pinata_jwt = process.env.PINATA_JWT
  console.log(pinata_api_secret, pinata_api_key, pinata_jwt)
  const pinata = pinataSDK(pinata_api_key, pinata_api_secret);
  const imageUrls = []
  proof.beforePhotos.forEach((photo) => {
    imageUrls.push(photo.url)
  })
  proof.duringPhotos.forEach((photo) => {
    imageUrls.push(photo.url)
  })
  proof.afterPhotos.forEach((photo) => {
    imageUrls.push(photo.url)
  })
  for (const photoUrl of imageUrls) {
    try {
      const response = await axios.get(photoUrl, {
        responseType: 'arraybuffer'
      });
      const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
        frequency: 10,      // in milliseconds.
        chunkSize: 2048     // in bytes.
      });
      myReadableStreamBuffer.put(response.data);

      const pinataResponse = await pinata.pinFileToIPFS(myReadableStreamBuffer);
      debugger
    } catch (error) {
      console.log(error.message)
    }
  }

}

// dev only
const proof = {
  beforePhotos: [{
    url: "https://firebasestorage.googleapis.com/v0/b/carbon-sequester-84748.appspot.com/o/303600d1-9fc4-411c-ac32-716b20ab4193%2F219028685_1698372143686262_8216940176393150111_n.jpg?alt=media&token=c98d5249-775e-4dcc-b60b-bf3b5013dc36"
  }],
  duringPhotos: [],
  afterPhotos: []
};

(async () => {
  if (process.argv[2] === 'dev') {
    console.log("running dev")
    await submit_to_pinata(proof)
  }

})();

// const readableStreamForFile = fs.createReadStream('./images/charcoal.jpg');
// const options = {
//   pinataMetadata: {
//     name: "MyCustomName",
//     keyvalues: {
//         customKey: 'customValue',
//         customKey2: 'customValue2'
//     }
// },
//     pinataOptions: {
//         cidVersion: 1
//     }
// };

// console.log("pinning file")
// pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
//     //handle results here
//     console.log(result);
// }).catch((err) => {
//     //handle error here
//     console.log(err);
// });

// body = {
//   "before_images": ["cid1"],
//   "during_images": ["cid2"],
//   "after_images": ["cid3", "cid4"]
// }


// pinata.pinJSONToIPFS(body, options).then((result) => {
//   //handle results here
//   console.log(result);
// }).catch((err) => {
//   //handle error here
//   console.log(err);
// });