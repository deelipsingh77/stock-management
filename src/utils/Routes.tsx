import { Home, LayoutDashboard, BarChart2, FileText, Settings } from 'lucide-react';

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  submenu?: NavItem[]
  admin: boolean
}

export const navItems: NavItem[] = [
  { title: "Home", href: "/", icon: Home , admin: false},
  { 
    title: "Admin", 
    href: "/admin", 
    icon: LayoutDashboard,
    submenu: [
      { title: "New User", href: "/new-user", icon: BarChart2 , admin: true},
      { title: "Manage Users", href: "/manage-users", icon: FileText , admin: true},
    ],
    admin: true,
  },
  { title: "Settings", href: "/settings", icon: Settings , admin: false},
]
