"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Sample user data (Replace this with your data fetching logic)
const users = [
  {
    userId: "1",
    username: "user1",
    divisionName: "Division A",
    email: "user1@example.com",
    phoneNo: "123-456-7890",
  },
  {
    userId: "2",
    username: "user2",
    divisionName: "Division B",
    email: "user2@example.com",
    phoneNo: "987-654-3210",
  },
  // Add more user objects as needed
];

export default function UserTablePage() {
  const router = useRouter();

  const handleEdit = (userId: string) => {
    router.push(`/edit-user/${userId}`);
  };

  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <Table className="w-full">
          <TableCaption className="text-gray-700 dark:text-gray-300">A list of all users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-900 dark:text-gray-100">User ID</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Username</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Division Name</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Email ID</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Phone No</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId} className="even:bg-gray-100 odd:bg-gray-50 dark:even:bg-gray-700 dark:odd:bg-gray-800">
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">{user.userId}</TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100">{user.username}</TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100">{user.divisionName}</TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100">{user.email}</TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100">{user.phoneNo}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(user.userId)}
                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:text-gray-900 dark:hover:bg-blue-600"
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
