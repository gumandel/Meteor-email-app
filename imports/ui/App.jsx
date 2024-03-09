import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Dashboard } from "./Dashboard";

export const App = () => {
  let authenticatedUser = useTracker(() => Meteor.user());

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;

    Meteor.loginWithPassword(username, password, function (error) {
      if (error) {
        console.log(error);
      }

      authenticatedUser = Meteor.user();
    });
  };

  if (authenticatedUser) {
    return (
      <Dashboard />
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col space-y-4 items-center"
      >
        <input
          id="username"
          type="text"
          placeholder="username"
          className="bg-black text-white rounded-lg"
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className="bg-black text-white rounded-lg"
        />

        <button
          type="submit"
          className="bg-black text-white rounded-lg py-2 px-4"
        >
          send
        </button>
      </form>
    </div>
  );
};
