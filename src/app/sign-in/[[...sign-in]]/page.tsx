import { SignIn } from "@clerk/nextjs";
 
function SigninPage() {
  return (
    <div className="hero min-h-screen">
      <SignIn />
    </div>
  );
}

export default SigninPage