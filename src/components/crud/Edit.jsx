import React from "react";
import EditForm from "./edit/EditForm";

const Edit = ({ setIsViewEdit, userId, id }) => {
  return (
    <div className="pagination__add">
      <div className="pagination__add--user">
        <EditForm setIsViewEdit={setIsViewEdit} userId={userId} id={id} />
      </div>
    </div>
  );
};

export default Edit;
