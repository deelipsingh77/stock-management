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
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") +
            "/api/v1/users/all-users",
            {
              withCredentials: true
            }
        );
        console.log(response);

        setUsers(response.data.message); // Adjust based on your API response structure
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <Table className="w-full">
          <TableCaption className="text-gray-700 dark:text-gray-300">
            A list of all users.
          </TableCaption>
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
                <TableCell>
                  <Button
                    onClick={() => handleEdit(user._id)}
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
