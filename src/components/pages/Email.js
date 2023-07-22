import { formatDate } from "../utils/date";
const Email = ({ email, handleDrawer }) => {
  const backgroundToggle = {
    backgroundColor: email?.type.includes("read") ? "#f2f2f2" : "white"
  };
  return (
    <div
      style={backgroundToggle}
      className="mail_list"
      onClick={() => handleDrawer(email)}
    >
      <div className="mail_avatar">{email?.from?.name[0].toUpperCase()}</div>
      <div className="mail_data">
        <div className="user_email">
          <span> From: </span>
          <p>
            {" "}
            {email?.from?.name}: {email?.from?.email}{" "}
          </p>
        </div>
        <div className="user_email">
          <span> Subject: </span>
          <p> {"Lorem Ipsum"} </p>
        </div>
        <div className="mail_content">
          <p>{email?.short_description}</p>
        </div>
        <div className="mail_time">
          <span> {formatDate(email?.date)} </span>
          {email?.type.includes("favorites") && (
            <span className="favouite-btn"> Favourite </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Email;
