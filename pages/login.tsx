import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import * as yup from "yup";
import Link from "next/link";
import { IconLoader } from "@tabler/icons-react";

interface LoginFormProps {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required().email("Invalid email address"),
  password: yup.string().required().min(8, "minimum 8 characters"),
});

export default function Login() {
  const [loader, setLoader] = React.useState(false);
  const [loginError, setLoginError] = React.useState("");
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormProps) => {
    setLoader(true);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.events.on('routeChangeStart', () => setLoader(true));
        router.events.on('routeChangeComplete', () => setLoader(false));
        router.events.on('routeChangeError', () => setLoader(false));
        router.push("/dashboard");
      } else {
        const error = await response.json();
        setLoginError(error.message);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    router.prefetch("/dashboard");
  }, [router]);

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
              {errors.password.message || loginError}
            </p>
          )}
          {!errors.password && loginError && (
            <p className="absolute -bottom-7 font-semibold text-red-500">
              {loginError}
            </p>
          )}
        </div>
        <button
          className="h-10 bg-indianred text-white font-bold rounded"
          type="submit"
        >
          Login
        </button>
        <Link
          className="text-center font-semibold text-spacecadet"
          href="/register"
        >
          Dont you have an account ?
          <span className="underline text-indianred ml-1">Create One</span>
        </Link>
      </form>
      {loader && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black opacity-60 z-40"></div>
      )}
      {loader && (
        <IconLoader className="fixed z-50 w-12 h-12 animate-spin text-indianred inset-0 mx-auto my-auto" />
      )}
    </div>
  );
}
