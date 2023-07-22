import React from "react";
import Email from "./Email";

const EmailList = ({ handleDrawer, tab }) => {
  let list = JSON.parse(window.localStorage.getItem("flip-gmail"));

  if (tab === "unread") {
    return (
      <section className="mails_section">
        {list?.map((email, ind) => (
          <Email key={ind} email={email} handleDrawer={handleDrawer} />
        ))}
      </section>
    );
  }
  if (tab === "favorites") {
    list = list.filter((email) => email?.type.includes(tab));
  }
  if (tab === "read") {
    list = list.filter((email) => email?.type.includes(tab));
  }

  return (
    <section className="mails_section">
      {list?.map((email, ind) => (
        <Email key={ind} email={email} handleDrawer={handleDrawer} />
      ))}
    </section>
  );
};

export default EmailList;
