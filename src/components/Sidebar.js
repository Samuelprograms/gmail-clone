import React, { useState } from "react";
import "./../css/Sidebar.css";
import AddIcon from "@material-ui/icons/Add";
import SidebarOption from "./SidebarOption";
import InboxIcon from "@material-ui/icons/Inbox";
import StarIcon from "@material-ui/icons/Star";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import NearMeIcon from "@material-ui/icons/NearMe";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { openSendNewMail, selectShowSidebar } from "../features/mailSlice";
const Sidebar = () => {
  const [pressed, setPressed] = useState("Inbox");
  const dispatch = useDispatch();
  const showSidebar = useSelector(selectShowSidebar);

  return (
    <>
      {showSidebar && (
        <div className="sidebar">
          <button
            className="sidebar__compose"
            onClick={() => dispatch(openSendNewMail())}
          >
            <AddIcon />
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
            <SidebarOption Icon={ExpandMoreIcon} name="More" />
          </div>
        </div>
      )}
    </>
  );
};
export default Sidebar;
