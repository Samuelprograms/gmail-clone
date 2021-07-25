import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import RemoveIcon from "@material-ui/icons/Remove";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { minimized } from "./../features/mailSlice";
import "./../css/NewEmail.css";
import { closeSendNewMail, minimizedWindow } from "../features/mailSlice";
import { db } from "./../firebase";
import firebase from "firebase";

const NewMail = () => {
  const [mail, setMail] = useState({ to: "", subject: "", message: "" });
  const dispatch = useDispatch();
  const isMinimized = useSelector(minimized);
  const handleSendEmail = (e) => {
    e.preventDefault();
    db.collection("emails").add({
      to: mail.to,
      subject: mail.subject,
      message: mail.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(closeSendNewMail());
    alert("Email sent!");
  };
  const handleOnChange = (e) => {
    setMail({ ...mail, [e.target.name]: e.target.value });
  };
  return (
    <div className="email">
      <div className="email__header">
        New Message
        <div className="header__icons">
          <IconButton onClick={() => dispatch(minimizedWindow())}>
            <RemoveIcon />
          </IconButton>
          <IconButton>
            <AspectRatioIcon />
          </IconButton>
          <IconButton onClick={() => dispatch(closeSendNewMail())}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      {isMinimized && (
        <form className="email__body" onSubmit={(e) => handleSendEmail(e)}>
          <input
            value={mail.to}
            name="to"
            placeholder="To"
            type="email"
            onChange={(e) => handleOnChange(e)}
          />
          <input
            value={mail.subject}
            name="subject"
            placeholder="Subject"
            type="text"
            onChange={(e) => handleOnChange(e)}
          />
          <textarea
            value={mail.message}
            name="message"
            className="email__body__message"
            placeholder="Message"
            type="text"
            onChange={(e) => handleOnChange(e)}
          />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
};

export default NewMail;
