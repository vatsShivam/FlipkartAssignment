import React, { useState, useEffect, useCallback } from "react";
import EmailList from "./components/pages/EmailList";
import EmailDrawer from "./components/pages/EmailDrawer";
import Filter from "./components/pages/Filter";
import instance from "./components/api/service";
import "./styles.css";

// caching variable
let caching_obj = {};
const App = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [emailList, setEmailList] = useState([]);
  const [tab, setTab] = useState("unread");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const drawerStyle = {
    display: "grid",
    gridTemplateColumns: showDrawer ? "40% 60%" : "100%",
    gridColumnGap: "20px"
  };

  useEffect(() => {
    const fetchEmailData = () => {
      instance({
        url: "/",
        method: "GET"
      })
        .then((res) => {
          let listData = res.data.list.map((item) => {
            return { ...item, type: ["unread"] };
          });
          setEmailList([...listData]);
          // save the data in local storage
          window.localStorage.setItem("flip-gmail", JSON.stringify(listData));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (
      !window.localStorage.getItem("flip-gmail") ||
      JSON.parse(window.localStorage.getItem("flip-gmail")).length === 0
    ) {
      fetchEmailData();
    }
  }, []);

  const getEmailDetails = (email) => {
    if (email?.id in caching_obj) {
      setSelectedEmail(caching_obj[email?.id]);
      setShowDrawer(true);
      return;
    } else {
      instance({
        url: `/?id=${email?.id}`,
        method: "GET"
      })
        .then((res) => {
          const emailContent = {
            ...email,
            body: res.data?.body
          };
          // caching
          caching_obj = { ...caching_obj, [email?.id]: emailContent };
          setSelectedEmail(emailContent);
          setShowDrawer(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleDrawer = (email, favourite = "read") => {
    const { id } = email;
    let tempList = [...JSON.parse(window.localStorage.getItem("flip-gmail"))];
    tempList?.forEach((item) => {
      if (item?.id === id) {
        item.type = [...item.type, favourite];
        return;
      }
    });
    setEmailList(tempList);
    getEmailDetails(email);

    // save the data in local storage
    window.localStorage.setItem("flip-gmail", JSON.stringify(tempList));
  };

  const handleTab = useCallback((value) => {
    setShowDrawer(false);
    setTab(value);
  }, []);

  return (
    <div className="email_body">
      <Filter tab={tab} handleTab={handleTab} />
      <div style={drawerStyle}>
        <EmailList handleDrawer={handleDrawer} tab={tab} />
        {showDrawer && (
          <EmailDrawer email={selectedEmail} handleDrawer={handleDrawer} />
        )}
      </div>
    </div>
  );
};

export default App;
