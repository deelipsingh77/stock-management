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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

const formSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email("Invalid email address"),
  phoneNo: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  companyName: z.string().min(1, "Company name is required"),
  zoneName: z.string().min(1, "Zone name is required"),
  branchName: z.string().min(1, "Branch name is required"),
  divisionName: z.string().min(1, "Division name is required"),
  userType: z.string().min(1, "User type is required"),
  organization: z.string().min(1, "Organization is required"),
  lob: z.string().min(1, "Lob is required"),
  isScoreReportUser: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

export default function ProfileForm() {
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
      const response = await axios.post(
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") +
          "/api/v1/users/register",
        data
      );
      console.log(response);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setValue(name, value as any);
  };

  // Watch values for Select fields
  const companyName = watch("companyName");
  const zoneName = watch("zoneName");
  const branchName = watch("branchName");
  const divisionName = watch("divisionName");
  const userType = watch("userType");
  const organization = watch("organization");
  const lob = watch("lob");

  // Aggregate and filter errors
  const errorMessages = Object.values(errors)
    .map((error) => error.message)
    .filter((message) => message && !message.startsWith("Required"))
    .join(", ");

  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Single Alert for All Errors */}
          {errorMessages && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessages}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                User ID
              </Label>
              <Input
                {...register("userId")}
                placeholder="Enter User ID"
                className="mt-1 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
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
                {...register("phoneNo")}
                placeholder="Enter Phone Number"
                className="mt-1 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">
                Company Name
              </Label>
              <Select onValueChange={handleSelectChange("companyName")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Company Name">
                    {companyName || "Select Company Name"}
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
              <Select onValueChange={handleSelectChange("zoneName")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Zone Name">
                    {zoneName || "Select Zone Name"}
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
              <Select onValueChange={handleSelectChange("branchName")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Branch Name">
                    {branchName || "Select Branch Name"}
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
              <Select onValueChange={handleSelectChange("divisionName")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select Division Name">
                    {divisionName || "Select Division Name"}
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
              <Select onValueChange={handleSelectChange("userType")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select User Type">
                    {userType || "Select User Type"}
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
                    {organization || "Select Organization"}
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
                    {lob || "Select Lob"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lob 1">Lob 1</SelectItem>
                  <SelectItem value="Lob 2">Lob 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Is Score Report User
              </Label>
              <input
                {...register("isScoreReportUser")}
                type="checkbox"
                className="mt-1 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="mt-6">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
