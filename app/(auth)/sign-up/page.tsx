// app/auth/sign-up/page.tsx
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div>
      <SignUp routing="hash" />
    </div>
  );
};

export default SignUpPage;
