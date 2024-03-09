import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { EmailsCollection } from "../api/email";
import { EmailTypeBadge } from "./EmailTypeBadge";
import { insertEmail } from "../utils/insertEmail";
import { deleteEmail } from "../utils/deleteEmail";

export const Dashboard = () => {
  
  const authenticatedUser = useTracker(() => Meteor.user());
  const users = useTracker(() => Meteor.users.find().fetch());
  const spamEmails = useTracker(() =>
    EmailsCollection.find({ tag: "spam" }).fetch()
  );

  const { emails, isLoading } = useTracker(() => {
    const noDataAvailable = { emails: [] };

    const handler = Meteor.subscribe("emails");
    const usersHandler = Meteor.subscribe("users");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const emails = EmailsCollection.find()
      .fetch()
      .map((email) => {
        return {
          ...email,
          user: users.find((user) => user.username === email.username),
        };
      });

    return { emails };
  });

  const handleEmailCreation = (e) => {
    e.preventDefault();

    const body = e.target[0].value;
    const subject = e.target[1].value;
    const sender = e.target[2].value;
    const tag = e.target[3].value;

    const emailPayload = {
      body: e.target[0].value,
      subject: e.target[1].value,
      sender: e.target[2].value,
      tag: e.target[3].value,
    };

    insertEmail(emailPayload).then((createdEmail) => {});
  };

  const sendSpamEmails = () => {
    for (let i = 5; i > 0; i--) {
      insertEmail({
        body: "Spam email",
        subject: "Spam",
        sender: Meteor.user().username || "admin",
        tag: "spam",
      });
    }   
  };

  const clearSpamEmails = () => {
    spamEmails.forEach((email) => {
      deleteEmail(email._id);
    });
  };

  return (
    <div>
      <div className="px-16 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Welcome to the Dashboard</h1>

        <button
          className="bg-black rounded-lg py-2 px-4 text-white text-xs"
          onClick={sendSpamEmails}
        >
          Send spam emails
        </button>

        <button
          className="bg-black rounded-lg py-2 px-4 text-white text-xs"
          onClick={clearSpamEmails}
        >
          Clear spam emails
        </button>

        <h1>{authenticatedUser?.username}</h1>
      </div>

      

      <div className="p-32">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 shadow-sm">
              {emails.map((email) => (
                <div
                  className="border-zinc-300 border-b p-4 flex justify-between items-center"
                  key={email._id}
                >
                  <div className="flex gap-x-8 items-center">
                    <EmailTypeBadge tag={email.tag} />

                    <h3 className="font-semibold">{email.sender}</h3>

                    <p>{email.subject}</p>
                  </div>

                  <p
                    className="text-red-500 cursor-pointer"
                    onClick={() => deleteEmail(email._id)}
                  >
                    Delete
                  </p>
                </div>
              ))}
            </div>

            <form className="mt-16" onSubmit={handleEmailCreation}>
              <div className="flex flex-col items-center space-y-8"></div>
              <input
                type="text"
                placeholder="Body"
                id="body"
                className="rounded-lg py-2 px-4 bg-zinc-200 border-zinc-500"
              />
              <input
                type="text"
                placeholder="Subject"
                id="subject"
                className="rounded-lg py-2 px-4 bg-zinc-200 border-zinc-500"
              />
              <select className="rounded-lg py-2 px-4 bg-zinc-200 border-zinc-500">
                {users.map((user) => (
                  <option value={user.username}>{user.username}</option>
                ))}
              </select>
              <select
                className="rounded-lg py-2 px-4 bg-zinc-200 border-zinc-500"
                id="tag"
              >
                <option value={"regular"}>Regular</option>
                <option value={"spam"}>Spam</option>
                <option value={"important"}>Important</option>
              </select>

              <button className="py-2 px-4 rounded-lg bg-zinc-200 border-zinc-500 font-semibold">
                Send email
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
