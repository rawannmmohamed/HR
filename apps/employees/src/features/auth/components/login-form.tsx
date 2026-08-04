import { useState, type FormEvent } from "react";
import { Button, Input } from "@hr/shared";
import { AUTH_COPY } from "../constants/auth.constants";
import { useLogin } from "../hooks/use-login";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginMutation.mutate({ email, password });
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <label className="space-y-2">
        <span className="text-sm font-medium">{AUTH_COPY.emailLabel}</span>
        <Input autoComplete="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-medium">{AUTH_COPY.passwordLabel}</span>
        <Input autoComplete="current-password" name="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
      </label>
      {loginMutation.isError ? <p className="text-sm font-medium text-destructive">{AUTH_COPY.errorMessage}</p> : null}
      <Button className="h-11 w-full" type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? AUTH_COPY.loadingLabel : AUTH_COPY.submitLabel}
      </Button>
    </form>
  );
}
