import AuthRedirect from "@/utils/AuthRedirect";
import ProtectedRoute from "@/utils/ProtectedRoute";

export default function Home() {
  return (
    <AuthRedirect>
      <ProtectedRoute>
        <div></div>
      </ProtectedRoute>
    </AuthRedirect>
  );
}
