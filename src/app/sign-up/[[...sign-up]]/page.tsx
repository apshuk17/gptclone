import { SignUp } from "@clerk/nextjs";
 
function SignupPage() {
  return (
    <div className="hero min-h-screen">
      <SignUp />
    </div>
  );
}

export default SignupPage;