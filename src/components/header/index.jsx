import { TaskManagerContext } from "@/context";
import { userLogoutApiCall } from "@/services";
import { LogOut } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { setUser, setLoading, loading } = useContext(TaskManagerContext);
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);
      setLogout(true);
      const response = await userLogoutApiCall();
      if (response) {
        setLoading(false);
        setLogout(false);

        setUser(null);
        navigate("/auth");
        console.log("logout successful");
      }
    } catch (error) {
      console.error("Failed to logout", error);
      setLoading(false);
      setLogout(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg">
      <div className="container mx-auto h-16 flex items-center">
        <div className="flex items-center justify-between w-full h-[64px]">
          <div className="w-auto flex items-center">
            <img src="/logo.png" alt="MaxFlow logo" className="w-[40px]" />
            <h1 className="font-bold text-[24px]">MaxFlow</h1>
          </div>
          <div className="flex gap-4 h-[30px]">
            <Link
              className="text-black text-xl font-bold hover:border-b-4 hover:border-[#4051F3]"
              to={"/tasks/list"}
            >
              Tasks
            </Link>
            <Link
              className="text-black text-xl font-bold hover:border-b-4 hover:border-[#4051F3] transition-all ease-out"
              to={"/tasks/scrum-board"}
            >
              Scrum Board
            </Link>
          </div>
          <div className="w-32 flex justify-end items-center">
            <LogOut
              color="#000"
              className="cursor-pointer"
              onClick={handleLogout}
            />

            {loading && logout ? (
              <div
                className={`w-6 h-6 border-4 border-t-4 border-[#3F3CF3] border-solid rounded-full animate-spin`}
                style={{
                  borderColor: "rgba(63, 60, 243, 0.5)",
                  borderTopColor: "#3F3CF3",
                }}
              ></div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
