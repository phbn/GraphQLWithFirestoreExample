import * as admin from "firebase-admin";

export default async function(root, args, req) {
  const hello = await admin
    .firestore()
    .collection("hello")
    .get();
  return hello.docs.map(hello => hello.data());
}
