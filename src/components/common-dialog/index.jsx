import React from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import CommonForm from "../common-form";

const CommonDialog = ({
  showDialog,
  onOpenChange,
  title,
  formControls,
  form,
  btnText,
  handleSubmit,
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-screen h-[450px] overflow-auto">
        <DialogTitle>{title}</DialogTitle>
        <div>
          <CommonForm
            formControls={formControls}
            form={form}
            handleSubmit={handleSubmit}
            btnText={btnText}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
