import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import * as admin from "firebase-admin";

import { jsonBody } from "../lib/Http";
import { server as graphQLServer } from "../lib/GraphQL";
import serviceAccount from "../lib/service-account.json";

//Initialize the Firebase-SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://graphQLtester.firebaseio.com"
});

// New server instance
const app = express();

// Remove the powered by
app.disable("x-powered-by");

// Add CORS
app.use(cors());

// Add general json body parser and validation
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "500mb" }));
app.use(jsonBody());

// Add Authentication to graphql endpoint
app.use("/", graphQLServer);

// Catch all 404
app.all("*", (req, res) => res.status(404).end());

// Export server instance for testing and lambda
export default app;
