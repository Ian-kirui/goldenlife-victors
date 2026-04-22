import Signin from "@/components/Auth/SignIn";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In | GoldenLife Victors",
};

const SigninPage = () => {
  return (
    <>
      <Suspense>
        <Breadcrumb pageName="Sign In Page" />
        <div className="dark:bg-dark">
          <div className="px-4 container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) py-5">
            <Signin />
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default SigninPage;
