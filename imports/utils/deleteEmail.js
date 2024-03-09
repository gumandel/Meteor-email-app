import { EmailsCollection } from "../api/email";

export async function deleteEmail(_id) {
    await EmailsCollection.removeAsync(_id);
}