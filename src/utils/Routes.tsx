import { Home, LayoutDashboard, BarChart2, FileText, Settings } from 'lucide-react';

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  submenu?: NavItem[]
  admin: boolean
}

export const navItems: NavItem[] = [
  { title: "Home", href: "/dashboard", icon: Home , admin: false},
  { 
    title: "Admin", 
    href: "/dashboard/admin", 
    icon: LayoutDashboard,
    submenu: [
      { title: "New User", href: "/dashboard/new-user", icon: BarChart2 , admin: true},
      { title: "Manage Users", href: "/dashboard/manage-users", icon: FileText , admin: true},
    ],
    admin: true,
  },
  { title: "Settings", href: "/dashboard/settings", icon: Settings , admin: false},
]
