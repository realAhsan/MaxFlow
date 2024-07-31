import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { userAuthApiCall } from "@/services";

export const TaskManagerContext = createContext(null);

function TaskManagerContextProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [currentEditedId, setCurrentEditedID] = useState(null);
  const taskFormData = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
    },
  });
  console.log("User is Setting ", user);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const verifyUserCookie = async () => {
      const data = await userAuthApiCall();
      console.log("Auth API call result:", data);
      if (data?.user) {
        setUser(data?.user);
        console.log("User set:", data?.user);
      }
      return data?.user
        ? navigate(
            location.pathname === "/auth" || location.pathname === "/"
              ? "/tasks/list"
              : `${location.pathname}`
          )
        : navigate("/auth");
    };
    verifyUserCookie();
  }, [navigate, location.pathname]);

  return (
    <TaskManagerContext.Provider
      value={{
        tasks,
        setTasks,
        user,
        setUser,
        taskFormData,
        loading,
        setLoading,
        currentEditedId,
        setCurrentEditedID,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
}

export default TaskManagerContextProvider;
