// import CommonCard from "@/components/common-card";
// import { scrumBoardOptions } from "@/config";
// import { TaskManagerContext } from "@/context";
// import { getAllTasksApiCall, updateTaskApiCall } from "@/services";
// import React, { useContext, useEffect } from "react";

// const SrcumBoardPage = () => {
//   const { tasks, setTasks, loading, setLoading, user } =
//     useContext(TaskManagerContext);
//   async function fetchListofTasks(userId) {
//     setLoading(true);
//     if (user) {
//       const response = await getAllTasksApiCall(userId);
//       if (response?.success) {
//         const data = response.data;
//         setTasks(data);
//         setLoading(false);
//       }
//     }
//   }
//   function renderTodoByStatus() {
//     const taskStatus = {
//       todo: [],
//       inProgress: [],
//       blocked: [],
//       review: [],
//       done: [],
//     };

//     tasks.forEach((taskItem) => {
//       taskStatus[taskItem.status].push(
//         <div
//           className="p-1"
//           onDragStart={
//             taskItem.status !== "done"
//               ? (event) => onDragStart(event, taskItem._id)
//               : null
//           }
//           draggable={taskItem.status === "done" ? false : true}
//         >
//           <CommonCard
//             extraStyles={taskItem.status === "done" ? "line-through" : ""}
//             title={taskItem?.title}
//             description={taskItem?.status}
//           />
//         </div>
//       );
//     });
//     return taskStatus;
//   }

//   async function updateTaskByStatus(getTask) {
//     console.log(getTask);
//     await updateTaskApiCall(getTask);
//     await fetchListofTasks(user?._id);
//   }

//   function onDragStart(event, itemID) {
//     event.dataTransfer.setData("id", itemID);
//   }
//   function onDrop(event, getCurrentStatus) {
//     const draggedTaskId = event.dataTransfer.getData("id");
//     let findCurrentTask = tasks.find(
//       (item) => item?._id.toString() === draggedTaskId
//     );
//     findCurrentTask = {
//       ...findCurrentTask,
//       status: getCurrentStatus,
//     };
//     updateTaskByStatus(findCurrentTask);
//   }
//   useEffect(() => {
//     if (user !== null) fetchListofTasks(user?._id);
//   }, [user]);

//   return (
//     <>
//       <div className="grid grid-cols-5 gap-2 h-full">
//         {scrumBoardOptions.map((option) => {
//           return (
//             <div
//               key={option.id}
//               className="border border-[#3F3CF3] rounded overflow-auto"
//               onDrop={(event) => onDrop(event, option.id)}
//               onDragOver={(event) => event.preventDefault()}
//             >
//               <div className="px-1 py-3 text-center bg-gradient-to-tr from-[#3F3CF3] to-[#48C1F3] border-none mb-3">
//                 <h3 className="text-2xl font-bold text-white">
//                   {option.label}
//                 </h3>
//               </div>
//               <div className="p-3">{renderTodoByStatus()[option.id]}</div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default SrcumBoardPage;

import CommonCard from "@/components/common-card";
import { Skeleton } from "@/components/ui/skeleton";
import { scrumBoardOptions } from "@/config";
import { TaskManagerContext } from "@/context";
import { getAllTasksApiCall, updateTaskApiCall } from "@/services";
import React, { useContext, useEffect } from "react";

const ScrumBoardPage = () => {
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
      const response = await getAllTasksApiCall(userId);
      if (response?.success) {
        const data = response.data;
        setTasks(data);
        setLoading(false);
      }
    }
  }

  function renderTodoByStatus() {
    const taskStatus = {
      todo: [],
      inProgress: [],
      blocked: [],
      review: [],
      done: [],
    };

    tasks.forEach((taskItem) => {
      taskStatus[taskItem.status].push(
        <div
          className="p-1"
          onDragStart={
            taskItem.status !== "done"
              ? (event) => onDragStart(event, taskItem._id)
              : null
          }
          draggable={taskItem.status === "done" ? false : true}
        >
          <CommonCard
            extraStyles={taskItem.status === "done" ? "line-through" : ""}
            title={taskItem?.title}
            description={taskItem?.status}
          />
        </div>
      );
    });
    return taskStatus;
  }

  async function updateTaskByStatus(getTask) {
    console.log(getTask);
    await updateTaskApiCall(getTask);
    await fetchListofTasks(user?._id);
  }

  function onDragStart(event, itemID) {
    event.dataTransfer.setData("id", itemID);
  }

  function onDrop(event, getCurrentStatus) {
    const draggedTaskId = event.dataTransfer.getData("id");
    let findCurrentTask = tasks.find(
      (item) => item?._id.toString() === draggedTaskId
    );
    findCurrentTask = {
      ...findCurrentTask,
      status: getCurrentStatus,
    };
    updateTaskByStatus(findCurrentTask);
  }

  useEffect(() => {
    if (user !== null) fetchListofTasks(user?._id);
  }, [user]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 h-full">
        {scrumBoardOptions.map((option) => (
          <div
            key={option.id}
            className="border border-[#3F3CF3] rounded overflow-auto"
            onDrop={(event) => onDrop(event, option.id)}
            onDragOver={(event) => event.preventDefault()}
          >
            <div className="px-1 py-3 text-center bg-gradient-to-tr from-[#3F3CF3] to-[#48C1F3] border-none mb-3">
              <h3 className="text-2xl font-bold text-white">{option.label}</h3>
            </div>
            <div className="p-3">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton height="50px" />
                  <Skeleton height="50px" />
                  <Skeleton height="50px" />
                </div>
              ) : (
                renderTodoByStatus()[option.id]
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ScrumBoardPage;
