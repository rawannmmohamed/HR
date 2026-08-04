import { AUTH_COPY } from "../constants/auth.constants";
import { LoginForm } from "../components/login-form";

export default function Login() {
  return (
    <section className="flex flex-col justify-center px-6 py-10 sm:px-10">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">{AUTH_COPY.eyebrow}</p>
          <h1 className="text-3xl font-semibold tracking-normal">{AUTH_COPY.title}</h1>
          <p className="text-sm leading-6 text-muted-foreground dark:text-[#a7adbd]">{AUTH_COPY.subtitle}</p>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
