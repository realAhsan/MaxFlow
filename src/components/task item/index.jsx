import React from "react";
import CommonCard from "../common-card";
import CommonButton from "../common-button";

const TaskItem = ({
  item,
  handleDelete,
  setShowDialog,
  setCurrentEditedID,
  taskFormData,
}) => {
  return (
    <CommonCard
      title={item?.title}
      description={item?.status}
      extraStyles={""}
      footerContent={
        <div className="flex w-full gap-2 justify-between items-center ">
          <CommonButton
            text={"Edit"}
            onClick={() => {
              setShowDialog(true);
              setCurrentEditedID(item?._id);

              taskFormData.setValue("title", item?.title);
              taskFormData.setValue("description", item?.description);
              taskFormData.setValue("status", item?.status);
              taskFormData.setValue("priority", item?.priority);
            }}
          />
          <CommonButton
            text={"Delete"}
            onClick={() => handleDelete(item?._id)}
          />
        </div>
      }
      content={""}
      headerRightContent={""}
    />
  );
};

export default TaskItem;
