import React, { useContext } from "react";
import CommonDialog from "../common-dialog";
import { addNewTaskFormControls } from "@/config";
import { TaskManagerContext } from "@/context";
import { addNewTaskApiCall } from "@/services";

const AddNewTask = ({
  showDialog,
  setShowDialog,
  handleSubmit,
  currentEditedId,
  setCurrentEditedID,
}) => {
  const { taskFormData } = useContext(TaskManagerContext);

  return (
    <CommonDialog
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      title={currentEditedId ? "Edit Task" : "Add New Task"}
      formControls={addNewTaskFormControls}
      form={taskFormData}
      btnText={"Add"}
      handleSubmit={handleSubmit}
      onOpenChange={() => {
        setShowDialog(false);
        currentEditedId ? taskFormData.reset() : null;
        setCurrentEditedID(null);
      }}
    />
  );
};

export default AddNewTask;
