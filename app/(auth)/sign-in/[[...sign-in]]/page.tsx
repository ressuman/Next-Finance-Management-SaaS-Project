import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div>Sign In</div>
      <SignIn />
    </>
  );
}
