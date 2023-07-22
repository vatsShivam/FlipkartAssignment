import React from "react";
import { formatDate } from "../utils/date";
const EmailDrawer = ({ email, handleDrawer }) => {
  return (
    <aside className="details_container">
      <div className="mail_avatar">{email?.from?.name[0].toUpperCase()}</div>
      <div className="mail_content">
        <header className="mail_content_nav">
          <div className="user_details">
            <p className="user_name">{email?.from?.name}</p>
            <p className="user_date"> {formatDate(email?.date)} </p>
          </div>
          <div>
            <button
              className="mark_as_favourite_btn"
              onClick={() => handleDrawer(email, "favorites")}
            >
              Mark as favorte
            </button>
          </div>
        </header>
        <div className="user_email_content">
          {email?.body && (
            <div dangerouslySetInnerHTML={{ __html: email?.body }}></div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default EmailDrawer;
