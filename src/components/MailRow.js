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
      style={{ zIndex: "10" }}
      className="mail"
      onMouseOver={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
      onClick={() => handleOpenMail()}
    >
      <Checkbox
        checked={checkedAllMails ? checkedAllMails : checked}
        onChange={() => setChecked(checkedAllMails ? checked : !checked)}
      />
      <Checkbox icon={<StarBorderIcon />} checkedIcon={<StarIcon />} />
      <h3>{sender}</h3>
      <h3>
        {subject}
        <span>{message}</span>
      </h3>
      {!showIcons && (
        <strong style={{ justifySelf: "end", marginRight: "10px" }}>
          {date.split(",")[1].split(" ").slice(1, 3).join(" ")}
        </strong>
      )}
      {showIcons && (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default MailRow;
