import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArchiveIcon from "@material-ui/icons/Archive";
import { IconButton } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteIcon from "@material-ui/icons/Delete";
import PrintIcon from "@material-ui/icons/Print";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectedMail, selectShowSidebar } from "../features/mailSlice";
import { selectUser } from "./../features/userSlice";
import { db } from "./../firebase";
import "./../css/MailSettings.css";

const Mail = () => {
  const history = useHistory();
  const { subject, sender, message, date, id } = useSelector(selectedMail);
  const user = useSelector(selectUser);
  const showSidebar = useSelector(selectShowSidebar);
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
    <>
      <div className="mail__settings">
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
        <IconButton>
          <PrintIcon />
        </IconButton>
      </div>
      <div style={{}} className="mail__body">
        <h1
          style={{
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {subject}
        </h1>
        <div className="mail__head">
          <div className="mail__head__left">
            <img src={user.photo} alt={user.name} />
            <div>
              <div style={{ display: "flex" }}>
                <strong style={{ marginRight: "8px" }}>{user.name}</strong>
                <p>
                  {"<"}
                  {user.email}
                  {">"}
                </p>
              </div>
              <p>to: {sender}</p>
            </div>
          </div>
          <p>{date}</p>
        </div>
        <p>{message}</p>
      </div>
    </>
  );
};

export default Mail;
