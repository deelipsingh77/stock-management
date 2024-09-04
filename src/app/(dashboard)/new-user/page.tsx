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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
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
  organization: z.string().min(1, "Organization is required"),
  lob: z.string().min(1, "Lob is required"),
  isScoreReportUser: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

export default function ProfileForm() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      const response = await axios.post(
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") +
          "/api/v1/users/register",
        data
      );
      toast({
        title: "Success",
        description: "User created successfully",
        variant: "default",
      });
      console.log(response);
      router.push("/manage-users");
    } catch (error: Error | any) {
      console.error(
        "Error submitting form",
        error.response?.data?.message || error.message
      );
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setValue(name, value as any);
  };

  // Show toast for form errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.entries(errors)
        .map(([key, error]) => {
          const field = key.charAt(0).toUpperCase() + key.slice(1);
          return error ? `${field} ${error.message}` : "";
        })
        .filter((message) => message)
        .join(", ");
        
      toast({
        title: "Form Error",
        description: errorMessages,
        variant: "destructive",
      });
    }
  }, [errors, toast]);

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
                Password
              </Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="Enter Password"
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
              <Select onValueChange={handleSelectChange("company")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Company Name">
                    {watch("company") || "Select Company Name"}
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
              <Select onValueChange={handleSelectChange("zone")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Zone Name">
                    {watch("zone") || "Select Zone Name"}
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
              <Select onValueChange={handleSelectChange("branch")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Branch Name">
                    {watch("branch") || "Select Branch Name"}
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
              <Select onValueChange={handleSelectChange("division")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Division Name">
                    {watch("division") || "Select Division Name"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Division 1">Division 1</SelectItem>
                  <SelectItem value="Division 2">Division 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">
                User Type
              </Label>
              <Select onValueChange={handleSelectChange("role")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select User Type">
                    {watch("role") || "Select User Type"}
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
                Organization
              </Label>
              <Select onValueChange={handleSelectChange("organization")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Organization">
                    {watch("organization") || "Select Organization"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Org A">Org A</SelectItem>
                  <SelectItem value="Org B">Org B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">
                Lob
              </Label>
              <Select onValueChange={handleSelectChange("lob")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Lob">
                    {watch("lob") || "Select Lob"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lob 1">Lob 1</SelectItem>
                  <SelectItem value="Lob 2">Lob 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 items-center">
              <Label className="block text-gray-700 dark:text-gray-300 text-md">
                Is Score Report User
              </Label>
              <input
                {...register("isScoreReportUser")}
                type="checkbox"
                className="w-4 h-4 mt-1 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="submit" className="hover:bg-gray-600">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
