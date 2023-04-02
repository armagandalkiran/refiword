import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface RegisterFormProps {
  username: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormProps) => {
    console.log(data)
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log(response);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="username">username:</label>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} id="username" type="text" />}
        />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label htmlFor="email">email:</label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} id="email" type="text" />}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password">password:</label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} id="password" type="text" />}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
