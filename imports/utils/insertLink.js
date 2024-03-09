export async function insertLink({ title, url }) {
    await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
  }