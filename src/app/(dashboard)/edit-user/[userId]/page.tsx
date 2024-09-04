"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import _ from "lodash";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  company: z.string().min(1, "Company name is required"),
  zone: z.string().min(1, "Zone name is required"),
  branch: z.string().min(1, "Branch name is required"),
  division: z.string().min(1, "Division name is required"),
  role: z.string().min(1, "User type is required"),
  lob: z.string().min(1, "Lob is required"),
  isScoreReportUser: z.boolean(),
  organization: z.string().min(1, "Organization is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function EditUser({ params }: { params: { userId: string } }) {
  const [user, setUser] = useState<FormData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") +
            `/api/v1/users/${params.userId}`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data.message);

        const userData = response.data.message;
        userData.role = _.capitalize(userData.role);
        console.log(userData);

        setValue("username", userData.username);
        setValue("email", userData.email);
        setValue("phoneNumber", userData.phoneNumber || "");
        setValue("company", userData.company || "");
        setValue("zone", userData.zone || "");
        setValue("branch", userData.branch || "");
        setValue("division", userData.division || "");
        setValue("role", userData.role || "");
        setValue("organization", userData.organization || "");
        setValue("lob", userData.lob || "");
        setValue("isScoreReportUser", userData.isScoreReportUser || false);

        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to fetch user details.");
        toast({
          title: "Fetch Error",
          description: "Failed to fetch user details.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.userId, toast]);

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);

      await axios.patch(
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") +
          `/api/v1/users/${params.userId}`,
        data,
        {
          withCredentials: true,
        }
      );
      toast({
        title: "Success",
        description: "User update successful.",
        variant: "default",
      });
      router.push("/manage-users");
    } catch (error) {
      console.error("Update Error:", error);
      toast({
        title: "Update Error",
        description: "Failed to update user.",
        variant: "destructive",
      });
    }
  };

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setValue(name, value as any, { shouldValidate: true });
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.entries(errors).map(([key, error]) => {
        const field = key.charAt(0).toUpperCase() + key.slice(1);
        return error ? `${field} ${error.message}` : "";
      }).filter((message) => message).join(", ");

      if (errorMessages) {
        toast({
          title: "Form Error",
          description: errorMessages,
          variant: "destructive",
        });
      }
    }
  }, [errors, toast]);

  if (loading)
    return <p className="text-gray-700 dark:text-gray-300">Loading...</p>;
  if (error) return <p className="text-red-600 dark:text-red-400">{error}</p>;

  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Username
              </Label>
              <Input
                {...register("username")}
                placeholder="Enter Username"
                className="mt-1 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter Email"
                className="mt-1 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Phone Number
              </Label>
              <Input
                {...register("phoneNumber")}
                placeholder="Enter Phone Number"
                className="mt-1 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">
                Company Name
              </Label>
              <Select
                value={getValues("company")}
                onValueChange={handleSelectChange("company")}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Company Name">
                    {getValues("company") || "Select Company Name"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Company A">Company A</SelectItem>
                  <SelectItem value="Company B">Company B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">
                Zone Name
              </Label>
              <Select
                value={getValues("zone")}
                onValueChange={handleSelectChange("zone")}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Zone Name">
                    {getValues("zone") || "Select Zone Name"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Zone 1">Zone 1</SelectItem>
                  <SelectItem value="Zone 2">Zone 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">
                Branch Name
              </Label>
              <Select
                value={getValues("branch")}
                onValueChange={handleSelectChange("branch")}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Branch Name">
                    {getValues("branch") || "Select Branch Name"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Branch A">Branch A</SelectItem>
                  <SelectItem value="Branch B">Branch B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">
                Division Name
              </Label>
              <Select
                value={getValues("division")}
                onValueChange={handleSelectChange("division")}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Division Name">
                    {getValues("division") || "Select Division Name"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Division A">Division A</SelectItem>
                  <SelectItem value="Division B">Division B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">
                User Type
              </Label>
              <Select
                value={getValues("role")}
                onValueChange={handleSelectChange("role")}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select User Type">
                    {getValues("role") || "Select User Type"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">
                Lob
              </Label>
              <Select
                value={getValues("lob")}
                onValueChange={handleSelectChange("lob")}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Lob">
                    {getValues("lob") || "Select Lob"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lob A">Lob A</SelectItem>
                  <SelectItem value="Lob B">Lob B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">
                Organization
              </Label>
              <Select
                value={getValues("organization")}
                onValueChange={handleSelectChange("organization")}
              >
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Organization">
                    {getValues("organization") || "Select Organization"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Org A">Org A</SelectItem>
                  <SelectItem value="Org B">Org B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Label className="block text-gray-700 dark:text-gray-300 text-md">
                Is Score Report User
              </Label>
              <input
                {...register("isScoreReportUser")}
                type="checkbox"
                className="mt-1 text-gray-900 dark:text-gray-100 h-4 w-4"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              className="bg-slate-300 hover:bg-slate-500 text-black"
              onClick={(e) => {
                e.preventDefault();
                toast({
                  title: "Cancelled",
                  description: "User update cancelled.",
                });
                router.push("/manage-users");
              }}
            >
              Cancel
            </Button>
            <Button type="submit" className="hover:bg-green-500">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
