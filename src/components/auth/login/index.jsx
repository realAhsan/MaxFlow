import CommonForm from "@/components/common-form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { signinFormControls } from "@/config";
import { TaskManagerContext } from "@/context";
import { loginUserApi } from "@/services";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { toast } = useToast();
  const { loading, setLoading } = useContext(TaskManagerContext);

  const navigate = useNavigate();
  const formdata = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function handleSubmit(formData) {
    setLoading(true);
    console.log(formData);
    const data = await loginUserApi(formData);
    console.log("response:", data);

    if (data?.success) {
      toast({
        title: "Successfully Logged In",
        description: "Welcome back",
      });
      setLoading(false);

      navigate("/tasks/list");
      console.log("navigated to task");
    } else {
      setLoading(false);

      toast({
        variant: "destructive",
        title: "User Sign in Failed",
        description: "Please try again",
      });
    }
  }

  return (
    <div>
      <CommonForm
        formControls={signinFormControls}
        handleSubmit={handleSubmit}
        form={formdata}
        btnText={
          loading ? (
            <div
              className={`w-6 h-6 border-4 border-t-4 border-[#3F3CF3] border-solid rounded-full animate-spin`}
              style={{
                borderColor: "rgba(63, 60, 243, 0.5)",
                borderTopColor: "#3F3CF3",
              }}
            ></div>
          ) : (
            "Login"
          )
        }
      />
    </div>
  );
};

export default LoginPage;
