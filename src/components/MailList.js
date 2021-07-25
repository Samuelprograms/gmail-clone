import React, { useState, useEffect } from "react";
import MailRow from "./MailRow";
import ReplayIcon from "@material-ui/icons/Replay";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Checkbox, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { handleCheckedAllMails, selectSearchMail } from "../features/mailSlice";
import { db } from "./../firebase";
import {useHistory} from "react-router-dom";
import "./../css/MailSettings.css";

const MailList = () => {
  const [mails, setMails] = useState([]);
  const dispatch = useDispatch();
  const filterData = useSelector(selectSearchMail);
  const history = useHistory();
  

  useEffect(() => {
    db.collection("emails")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);
  return (
    <div>
      <div className="mail__settings">
        <div className="mail__settings__left">
          <Checkbox
            onChange={() => dispatch(handleCheckedAllMails())}
            color="default"
            inputProps={{ "aria-label": "checkbox with default color" }}
          />
          <IconButton onClick={() => history.go()}>
            <ReplayIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="mail__settings__right">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>

      <div className="maillist">
        {mails
          .filter((mail) => JSON.stringify(mail).includes(filterData))
          .map(({ id, data: { to, subject, message, timestamp}}) => (
            <MailRow
              key={id}
              id={id}
              sender={to}
              subject={subject}
              message={message}
              date={new Date(timestamp?.seconds * 1000).toUTCString()}
            />
          ))}
      </div>
    </div>
  );
};

export default MailList;
