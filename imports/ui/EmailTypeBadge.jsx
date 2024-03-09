import React from "react";

export const EmailTypeBadge = ({ tag }) => {
  switch (tag) {
    case "important":
      return (
        <div className="py-2 px-4 bg-yellow-300 text-yellow-700 rounded-lg text-sm">
          Important
        </div>
      );

    case "spam":
      return (
        <div className="py-2 px-4 bg-red-300 text-red-700 rounded-lg text-sm">
          Spam
        </div>
      );

    default:
      return (
        <div className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg text-sm">
          Regular
        </div>
      );
  }
};
