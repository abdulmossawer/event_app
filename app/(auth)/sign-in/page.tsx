// app/auth/sign-in/page.tsx
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div>
      <SignIn routing="hash" />
    </div>
  );
};

export default SignInPage;
