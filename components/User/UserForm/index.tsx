import { useUserStore } from "@/states/user";
import { Button, Input, VStack } from "@chakra-ui/react";
import axios from "axios";

export type UserFormProps = {
  action: "sign_in" | "sign_up";
  title: string;
}

export default function UserForm({ action, title }: UserFormProps) {
  const login = useUserStore((state) => state.login);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget);
    const data = {
      user: {
        email: formData.get("email"),
        password: formData.get("password"),
      },
    };
  
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/${action}`,
      data,
    })
      .then((response) => {
        login(response.data.token, data.user.email as string);
      })
      .catch((error) => console.error(error));
    };

  return (
    <div>
      <h2 className="text-2xl font-bold text-sky-200">{ title }</h2>
      <form onSubmit={handleSubmit}>
        <VStack spacing={16} align="center" className="px-28 my-4">
          {[
            ["email", "Email"],
            ["password", "Type Password"],
          ].map(([input, label]) => (
            <Input
              key={input}
              placeholder={label}
              variant="filled"
              required
              name={input}
              type={input === "email" ? "email" : "password"}
              className="w-full p-2 border-sky-500 rounded-lg bg-sky-800 font-semibold"
            />
          ))}
          <Button
            type="submit"
            size="lg"
            className="content-center w-40 bg-teal-900 font-bold rounded-md"
          >
            Submit
          </Button>
        </VStack>
      </form>
    </div>
  );
}
