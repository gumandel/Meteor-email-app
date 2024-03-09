import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { EmailsCollection } from "../imports/api/email";
import { LinksCollection } from "/imports/api/links";
import { insertLink } from "../imports/utils/insertLink";
import { insertEmail } from "../imports/utils/insertEmail";

Meteor.startup(async () => {
  if ((await LinksCollection.find().countAsync()) === 0) {
    await insertLink({
      title: "Do the Tutorial",
      url: "https://react-tutorial.meteor.com/simple-todos/01-creating-app.html",
    });
  }

  if ((await EmailsCollection.find().countAsync()) === 0) {
    await insertEmail({
      sender: "meteorite",
      body: "Hello, this is a test email",
      subject: "Test",
      tag: "regular",
      createdAt: new Date(),
    });
  }

  const SEED_USERNAME = "meteorite";
  const SEED_PASSWORD = "password";

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    // Testar o find user by email
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  Meteor.publish("links", function () {
    return LinksCollection.find();
  });

  Meteor.publish("emails", function () {
    return EmailsCollection.find();
  });
});
