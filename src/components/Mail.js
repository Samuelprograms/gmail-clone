import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArchiveIcon from "@material-ui/icons/Archive";
import { IconButton } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteIcon from "@material-ui/icons/Delete";
import PrintIcon from "@material-ui/icons/Print";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedMail } from "../features/mailSlice";
import { db } from "./../firebase";
import "./../css/MailSettings.css";

const Mail = () => {
  const history = useHistory();
  const { subject, sender, message, date, id } = useSelector(selectedMail);
  const handleDeleteMail = () => {
    db.collection("emails")
      .doc(id)
      .delete()
      .then(() => {
        alert("Document successfully deleted!");
      })
      .catch((error) => {
        alert("Error removing document: ", error);
      });
    history.push("/");
  };
  return (
    <div>
      <div className="mail__settings">
        <div className="mail__settings__left">
          <IconButton onClick={() => history.push("/")}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton>
            <ArchiveIcon />
          </IconButton>
          <IconButton>
            <ErrorIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteMail()}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className="mail__settings__right">
          <IconButton>
            <PrintIcon />
          </IconButton>
        </div>
      </div>
      <div className="mail__body">
        <h2>{sender}</h2>
        <h3>{subject}</h3>
        <p>{message}</p>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default Mail;
