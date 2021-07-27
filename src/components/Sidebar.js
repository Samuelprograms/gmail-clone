import React, { useState } from "react";
import "./../css/Sidebar.css";
import SidebarOption from "./SidebarOption";
import InboxIcon from "@material-ui/icons/Inbox";
import StarIcon from "@material-ui/icons/Star";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import NearMeIcon from "@material-ui/icons/NearMe";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import ChatIcon from "@material-ui/icons/Chat";
import CancelScheduleSendIcon from "@material-ui/icons/CancelScheduleSend";
import MailIcon from "@material-ui/icons/Mail";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { openSendNewMail, selectShowSidebar } from "../features/mailSlice";
const Sidebar = () => {
  const [pressed, setPressed] = useState("Inbox");
  const dispatch = useDispatch();
  const showSidebar = useSelector(selectShowSidebar);
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {showSidebar && (
        <div className="sidebar">
          <button
            className="sidebar__compose"
            onClick={() => dispatch(openSendNewMail())}
          >
            <img
              style={{ width: "50px", borderRadius: "50%" }}
              src="https://wellesleyps.org/technology/wp-content/uploads/sites/21/2018/05/Screen-Shot-2018-05-21-at-9.30.30-AM-300x298.png"
              alt="icono"
            />
            Compose
          </button>
          <div className="sidebar__buttons">
            <SidebarOption
              Icon={InboxIcon}
              name="Inbox"
              pressed={pressed}
              setPressed={setPressed}
            />
            <SidebarOption
              Icon={StarIcon}
              name="Starred"
              pressed={pressed}
              setPressed={setPressed}
            />
            <SidebarOption
              Icon={WatchLaterIcon}
              name="Snoozed"
              pressed={pressed}
              setPressed={setPressed}
            />
            <SidebarOption
              Icon={NearMeIcon}
              name="Sent"
              pressed={pressed}
              setPressed={setPressed}
            />
            <SidebarOption
              Icon={InsertDriveFileIcon}
              name="Drafts"
              pressed={pressed}
              setPressed={setPressed}
            />
            <SidebarOption
              Icon={showMore ? ExpandLessIcon : ExpandMoreIcon }
              name={showMore ? "Show Less" : "Show More"}
              toggle={showMore}
              setToggle={setShowMore}
            />
            {showMore && (
              <>
                <SidebarOption
                  Icon={LabelImportantIcon}
                  name="Important"
                  pressed={pressed}
                  setPressed={setPressed}
                />
                <SidebarOption
                  Icon={ChatIcon}
                  name="Chat"
                  pressed={pressed}
                  setPressed={setPressed}
                />
                <SidebarOption
                  Icon={CancelScheduleSendIcon}
                  name="Schedule"
                  pressed={pressed}
                  setPressed={setPressed}
                />
                <SidebarOption
                  Icon={MailIcon}
                  name="All Mail"
                  pressed={pressed}
                  setPressed={setPressed}
                />
                <SidebarOption
                  Icon={ErrorIcon}
                  name="Spam"
                  pressed={pressed}
                  setPressed={setPressed}
                />
                <SidebarOption
                  Icon={DeleteIcon}
                  name="Trash"
                  pressed={pressed}
                  setPressed={setPressed}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Sidebar;
