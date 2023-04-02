import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";

interface RegisterFormProps {
  username: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email("Invalid email address"),
  password: yup.string().required().min(8, "minimum 8 characters"),
});

export default function Register() {
  const [registerError, setRegisterError] = React.useState("");
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormProps) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.push("/dashboard");
      } else {
        const error = await response.json();
        setRegisterError(error.message);
      }
    } catch (error) {}
  };

  return (
    <div className="py-16 min-h-screen bg-rebeccapurple">
      <header>
        <h1 className="text-indianred font-bold text-3xl text-center">
          REFIWORD
        </h1>
      </header>
      <form
        className="h-full px-4 py-10 flex flex-col gap-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative flex flex-col">
          <label className="text-paledogwood font-semibold" htmlFor="username">
            Username:
          </label>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="focus:outline-none h-10 rounded px-4"
                {...field}
                id="username"
                type="text"
              />
            )}
          />
          {errors.username && (
            <p className="absolute -bottom-7 font-semibold text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="relative flex flex-col">
          <label className="text-paledogwood font-semibold" htmlFor="email">
            Email:
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="focus:outline-none h-10 rounded px-4"
                {...field}
                id="email"
                type="text"
              />
            )}
          />
          {errors.email && (
            <p className="absolute -bottom-7 font-semibold text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="relative flex flex-col">
          <label className="text-paledogwood font-semibold" htmlFor="password">
            Password:
          </label>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="focus:outline-none h-10 rounded px-4"
                {...field}
                id="password"
                type="password"
              />
            )}
          />
          {errors.password && (
            <p className="absolute -bottom-7 font-semibold text-red-500">
              {errors.password.message}
            </p>
          )}
          {registerError && (
            <p className="absolute -bottom-7 font-semibold text-red-500">
              {registerError}
            </p>
          )}
        </div>
        <button
          className="h-10 bg-indianred text-white font-bold rounded"
          type="submit"
        >
          Register
        </button>
        <Link className="text-center font-semibold text-spacecadet" href="/login">
          Already have an account ?
          <span className="underline text-indianred ml-1">Login</span>
        </Link>
      </form>
    </div>
  );
}
