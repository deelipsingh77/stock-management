import ProtectedRoute from "@/utils/ProtectedRoute"
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
  return (
  <ProtectedRoute>
    {children}
  </ProtectedRoute>
  )
}
export default Layout