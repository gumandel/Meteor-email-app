import { EmailsCollection } from "../api/email";

export async function insertEmail({ sender, body, subject, tag }) {
  await EmailsCollection.insertAsync({
    sender,
    body,
    subject,
    tag,
    createdAt: new Date(),
  });
}

// sender: String (userId)
// body: String
// subject: String
// tag: "regular" | "spam" | "important"
