import LoginPage from "@/components/auth/login";
import SignupPage from "@/components/auth/signup";
import CommonButton from "@/components/common-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React, { useState } from "react";

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  return (
    <div className="flex flex-auto flex-col  min-h-screen h-full">
      <div className="flex h-full flex-col justify-center items-center bg-white pt-20">
        <img className="w-40" src="/logo.png" />
        <h3 className="text-3xl font-bold">MaxFlow </h3>
        <div className="m-8">
          <Tabs defaultValue="login" className="w-[450px] ">
            <TabsList className="grid w-full grid-cols-2 ">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginPage />
            </TabsContent>
            <TabsContent value="signup">
              <SignupPage />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
