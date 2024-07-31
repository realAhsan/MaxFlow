import CommonForm from "@/components/common-form";
import { useToast } from "@/components/ui/use-toast";
import { signUpFormControls } from "@/config";
import { TaskManagerContext } from "@/context";
import { registerUserApi } from "@/services";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { toast } = useToast();

  const navigate = useNavigate();
  const { loading, setLoading } = useContext(TaskManagerContext);

  const formdata = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  async function handleSubmit(getData) {
    // console.log(getData);
    setLoading(true);
    const data = await registerUserApi(getData);
    console.log("data:", data);
    if (data?.success) {
      setLoading(false);

      toast({
        title: "User Registration Success",
        description: "Welcome",
      });
      navigate("/tasks/list");
    } else {
      setLoading(false);

      toast({
        variant: "destructive",
        title: "User Registration Failed",
        description: "Please try again",
      });
    }
  }

  return (
    <div>
      <CommonForm
        formControls={signUpFormControls}
        handleSubmit={handleSubmit}
        form={formdata}
        // btnText={"Signup"}
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
            "Signup"
          )
        }
      />
    </div>
  );
};

export default SignupPage;
