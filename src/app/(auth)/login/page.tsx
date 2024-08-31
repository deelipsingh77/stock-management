import LoginPage from "@/components/pages/LoginPage";
import AuthRedirect from "@/utils/AuthRedirect";

const Login = () => {
  return (
    <AuthRedirect>
      <div className="flex justify-center items-center h-screen">
        <LoginPage />
      </div>
    </AuthRedirect>
  );
};
export default Login;
