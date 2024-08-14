"use client";
import UserForm from "../UserForm";
import { useUserStore } from "@/states/user";
import { Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function Entrance() {
  const userMail = useUserStore((state) => state.userEmail)
  const logout = useUserStore((state) => state.logout)

  return (
    <div>
      {userMail !== "" ? (
        <div className="grid grid-cols-6 flex-row content-center">
          <h1 className="text-3xl font-semibold col-span-4">Hello, {userMail} !!</h1>
          <Button variant="ghost" className="bg-sky-600 w-10" onClick={logout}>
            <CloseIcon boxSize={8} />
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          <UserForm action="sign_up" title="Sign Up" />
          <UserForm action="sign_in" title="Sign In" />
        </div>
      )}
    </div>
  );
}
