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
} from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + `/api/v1/users/${params.userId}`,
          {
            withCredentials: true, // Include cookies if required
          }
        );
        setUser(response.data.message);

        // Set form values
        const userData = response.data.message;
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
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.userId]);

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      
      await axios.patch(
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000") + `/api/v1/users/${params.userId}`,
        data,
        {
          withCredentials: true, // Include cookies if required
        }
      );
      router.push("/manage-users"); // Redirect to users list or any other page
    } catch (error) {
      console.error("Update Error:", error);
      setError("Failed to update user.");
    }
  };

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setValue(name, value as any, { shouldValidate: true });
  };

  // Aggregate and filter errors
  const errorMessages = Object.values(errors)
    .map((error) => error.message)
    .filter((message) => message && !message.startsWith("Required"))
    .join(", ");

  if (loading) return <p className="text-gray-700 dark:text-gray-300">Loading...</p>;
  if (error) return <p className="text-red-600 dark:text-red-400">{error}</p>;

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
              <Label className="block text-gray-700 dark:text-gray-300">Username</Label>
              <Input
                {...register("username")}
                placeholder="Enter Username"
                className="mt-1 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              {errors.username && <p className="text-red-600 dark:text-red-400">{errors.username.message}</p>}
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter Email"
                className="mt-1 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              {errors.email && <p className="text-red-600 dark:text-red-400">{errors.email.message}</p>}
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">Phone Number</Label>
              <Input
                {...register("phoneNumber")}
                placeholder="Enter Phone Number"
                className="mt-1 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              {errors.phoneNumber && <p className="text-red-600 dark:text-red-400">{errors.phoneNumber.message}</p>}
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">Company Name</Label>
              <Select value={getValues("company")} onValueChange={handleSelectChange("company")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  {getValues("company") || "Select Company Name"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Company A">Company A</SelectItem>
                  <SelectItem value="Company B">Company B</SelectItem>
                </SelectContent>
              </Select>
              {errors.company && <p className="text-red-600 dark:text-red-400">{errors.company.message}</p>}
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">Zone Name</Label>
              <Select value={getValues("zone")} onValueChange={handleSelectChange("zone")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  {getValues("zone") || "Select Zone Name"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Zone 1">Zone 1</SelectItem>
                  <SelectItem value="Zone 2">Zone 2</SelectItem>
                </SelectContent>
              </Select>
              {errors.zone && <p className="text-red-600 dark:text-red-400">{errors.zone.message}</p>}
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">Branch Name</Label>
              <Select value={getValues("branch")} onValueChange={handleSelectChange("branch")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  {getValues("branch") || "Select Branch Name"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Branch A">Branch A</SelectItem>
                  <SelectItem value="Branch B">Branch B</SelectItem>
                </SelectContent>
              </Select>
              {errors.branch && <p className="text-red-600 dark:text-red-400">{errors.branch.message}</p>}
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">Division Name</Label>
              <Select value={getValues("division")} onValueChange={handleSelectChange("division")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  {getValues("division") || "Select Division Name"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Division 1">Division 1</SelectItem>
                  <SelectItem value="Division 2">Division 2</SelectItem>
                </SelectContent>
              </Select>
              {errors.division && <p className="text-red-600 dark:text-red-400">{errors.division.message}</p>}
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">User Type</Label>
              <Select value={getValues("role")} onValueChange={handleSelectChange("role")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  {getValues("role") || "Select User Type"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && <p className="text-red-600 dark:text-red-400">{errors.role.message}</p>}
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">Organization</Label>
              <Select value={getValues("organization")} onValueChange={handleSelectChange("organization")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  {getValues("organization") || "Select Organization"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Org A">Org A</SelectItem>
                  <SelectItem value="Org B">Org B</SelectItem>
                </SelectContent>
              </Select>
              {errors.organization && <p className="text-red-600 dark:text-red-400">{errors.organization.message}</p>}
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300 mb-1">Lob</Label>
              <Select value={getValues("lob")} onValueChange={handleSelectChange("lob")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100">
                  {getValues("lob") || "Select Lob"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lob A">Lob A</SelectItem>
                  <SelectItem value="Lob B">Lob B</SelectItem>
                </SelectContent>
              </Select>
              {errors.lob && <p className="text-red-600 dark:text-red-400">{errors.lob.message}</p>}
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Is Score Report User
              </Label>
              <input
                {...register("isScoreReportUser")}
                type="checkbox"
                className="mt-1 text-gray-900 dark:text-gray-100"
              />
              {errors.isScoreReportUser && <p className="text-red-600 dark:text-red-400">{errors.isScoreReportUser.message}</p>}
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
