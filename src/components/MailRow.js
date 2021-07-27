import React, { useState } from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ArchiveIcon from "@material-ui/icons/Archive";
import DeleteIcon from "@material-ui/icons/Delete";
import DraftsIcon from "@material-ui/icons/Drafts";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import { Checkbox, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { db } from "./../firebase";
import "./../css/MailRow.css";
import { useDispatch, useSelector } from "react-redux";
import { selectMail, selectCheckedAllMails } from "../features/mailSlice";
const MailRow = ({ sender, subject, message, date, id }) => {
  const [showIcons, setShowIcons] = useState(false);
  const checkedAllMails = useSelector(selectCheckedAllMails);
  const [checked, setChecked] = useState(checkedAllMails);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleOpenMail = () => {
    dispatch(
      selectMail({
        id,
        sender,
        subject,
        message,
        date,
      })
    );
    history.push("/mail");
  };
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
  };
  return (
    <div
      className="mail"
      onMouseOver={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={checkedAllMails ? checkedAllMails : checked}
          onChange={() => setChecked(checkedAllMails ? checked : !checked)}
        />
        <Checkbox icon={<StarBorderIcon />} checkedIcon={<StarIcon />} />
      </div>
      <div
      className="mail__main"
        onClick={() => handleOpenMail()}
      >
        <strong>{sender}</strong>
        <p onClick={() => handleOpenMail()}>
          <strong>{subject}</strong>
          {" - "}
          {message}
        </p>
      </div>

      <div style={{ textAlign: "end" }}>
        {showIcons ? (
          <>
            <IconButton>
              <ArchiveIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteMail(id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <DraftsIcon />
            </IconButton>
            <IconButton>
              <WatchLaterIcon />
            </IconButton>
          </>
        ) : (
          <strong>{date.substr(5, 6)}</strong>
        )}
      </div>
    </div>
  );
};

export default MailRow;
