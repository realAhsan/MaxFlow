import AddNewTask from "@/components/add-new-task";
import CommonButton from "@/components/common-button";
import TaskItem from "@/components/task item";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskManagerContext } from "@/context";
import {
  addNewTaskApiCall,
  deleteTaskApiCall,
  getAllTasksApiCall,
  updateTaskApiCall,
} from "@/services";
import React, { useContext, useEffect, useState } from "react";

const TaskPage = () => {
  const [showDialog, setShowDialog] = useState(null);

  const {
    tasks,
    setTasks,
    loading,
    setLoading,
    user,
    taskFormData,
    currentEditedId,
    setCurrentEditedID,
  } = useContext(TaskManagerContext);
  async function fetchListofTasks(userId) {
    setLoading(true);
    if (user) {
      console.log("user:", user);
      const response = await getAllTasksApiCall(userId);
      if (response?.success) {
        const data = response.data;
        setTasks(data);
        setLoading(false);
      }
    }
  }
  async function handleSubmit(getData) {
    const formData = {
      ...getData,
      userId: user?._id,
    };
    const editFormData = {
      ...getData,
      userId: user?._id,
      _id: currentEditedId,
    };

    const response = currentEditedId
      ? await updateTaskApiCall(editFormData)
      : await addNewTaskApiCall(formData);
    if (response) {
      fetchListofTasks(user._id);
      setShowDialog(false);
      taskFormData.reset();
      setCurrentEditedID(null);
    }
  }

  useEffect(() => {
    fetchListofTasks(user?._id);
  }, [user]);

  async function handleDelete(getTaskId) {
    const response = await deleteTaskApiCall(getTaskId);
    if (response) {
      fetchListofTasks(user._id);
    }
  }
  console.log("Tasks", tasks);

  console.log(currentEditedId, "Current Edited ID");
  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center">
        <div className="mb-5 w-[150px]">
          <Skeleton className="h-11 w-full rounded bg-gray-200" />
        </div>
        <div className="flex gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-[300px] h-[200px] rounded-lg bg-gray-200 p-5"
            >
              <Skeleton className="w-3/4 h-6 mb-4 bg-gray-300" />
              <Skeleton className="w-1/2 h-4 mb-4 bg-gray-300" />
              <div className="flex gap-2">
                <Skeleton className="w-1/2 h-10 bg-gray-300 rounded" />
                <Skeleton className="w-1/2 h-10 bg-gray-300 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mb-5 w-[150px]">
          <CommonButton
            text={"Add New task"}
            type={"submit"}
            onClick={() => {
              setShowDialog(true);
            }}
          />
        </div>
        <div className="mt-5 flex flex-col">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tasks.length > 0 ? (
              tasks.map((task) => {
                return (
                  <TaskItem
                    item={task}
                    handleDelete={handleDelete}
                    setShowDialog={setShowDialog}
                    setCurrentEditedID={setCurrentEditedID}
                    taskFormData={taskFormData}
                  />
                );
              })
            ) : (
              <h1 className="text-center">No task added </h1>
            )}
          </div>
        </div>
        <AddNewTask
          setShowDialog={setShowDialog}
          showDialog={showDialog}
          handleSubmit={handleSubmit}
          currentEditedId={currentEditedId}
          setCurrentEditedID={setCurrentEditedID}
        />
      </div>
    </>
  );
};

export default TaskPage;
