"use client";

import { useEffect, useState } from "react";
import axios from "axios";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Define TypeScript interfaces based on the API response
interface User {
  _id: string;
  username: string;
  email: string;
  fullName?: string;
  division?: string;
  role: string;
  company?: string;
  zone?: string;
  branch?: string;
  lob?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  statusCode: number;
  message: User[];
  data: string;
  success: boolean;
}

export default function UserTablePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") +
            "/api/v1/users/all-users",
          {
            withCredentials: true,
          }
        );
        const users = response.data.message.filter((userList) => userList.username !== user?.username);
        setUsers(users); // Adjust based on your API response structure
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId: string) => {
    router.push(`/edit-user/${userId}`);
  };

  const handleDelete = async () => {
    if (selectedUserId) {
      try {
        await axios.delete(
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") +
            `/api/v1/users/${selectedUserId}`,
          {
            withCredentials: true,
          }
        );
        toast({
          title: "User deleted successfully.",
          description: "The user has been deleted successfully.",
          variant: "destructive",
        })
        // After deleting, update the state to remove the deleted user
        setUsers(users.filter((user) => user._id !== selectedUserId));
        setSelectedUserId(null); // Reset the selected user ID
      } catch (err) {
        setError("Failed to delete user.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <Table className="w-full">
          {/* <TableCaption className="text-gray-700 dark:text-gray-300">
            A list of all users.
          </TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-900 dark:text-gray-100">
                User ID
              </TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">
                Username
              </TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">
                Division Name
              </TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">
                Email ID
              </TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                className="even:bg-gray-100 odd:bg-gray-50 dark:even:bg-gray-700 dark:odd:bg-gray-800"
              >
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  {user._id}
                </TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100">
                  {user.username}
                </TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100">
                  {user.division || "N/A"}
                </TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100">
                  {user.email}
                </TableCell>
                <TableCell className="flex space-x-2">
                  <Button
                    onClick={() => handleEdit(user._id)}
                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:text-slate-200 dark:hover:bg-blue-600"
                  >
                    Edit
                  </Button>

                  {/* Alert Dialog for Delete Confirmation */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        onClick={() => setSelectedUserId(user._id)}
                        className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:text-slate-200 dark:hover:bg-red-600"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:outline-none dark:border-none">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to delete this user?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="dark:text-slate-200">
                          This action cannot be undone. This will permanently
                          delete the user and remove their data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="dark:text-black">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
