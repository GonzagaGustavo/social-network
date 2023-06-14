import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../secret/social-network-firebase-adminsdk.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  storageBucket: "gs://social-network-a1fc5.appspot.com",
});
