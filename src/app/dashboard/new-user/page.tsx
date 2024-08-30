"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function ProfileForm() {
  const [formValues, setFormValues] = useState({
    userId: "",
    username: "",
    password: "",
    email: "",
    phoneNo: "",
    companyName: "",
    zoneName: "",
    branchName: "",
    divisionName: "",
    userType: "",
    organization: "",
    lob: "",
    isScoreReportUser: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form submission here
    console.log("Form submitted", formValues);
  };

  return (
    <div className="flex justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                User ID
              </Label>
              <Input
                name="userId"
                value={formValues.userId}
                onChange={handleChange}
                placeholder="Enter User ID"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Username
              </Label>
              <Input
                name="username"
                value={formValues.username}
                onChange={handleChange}
                placeholder="Enter Username"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <Input
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Email
              </Label>
              <Input
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Phone Number
              </Label>
              <Input
                name="phoneNo"
                value={formValues.phoneNo}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Company Name
              </Label>
              <Select onValueChange={handleSelectChange("companyName")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                  {formValues.companyName || "Select Company Name"}
                </SelectTrigger>
                <SelectContent>
                  {/* Add your options here */}
                  <SelectItem value="Company A">Company A</SelectItem>
                  <SelectItem value="Company B">Company B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Zone Name
              </Label>
              <Select onValueChange={handleSelectChange("zoneName")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                  {formValues.zoneName || "Select Zone Name"}
                </SelectTrigger>
                <SelectContent>
                  {/* Add your options here */}
                  <SelectItem value="Zone 1">Zone 1</SelectItem>
                  <SelectItem value="Zone 2">Zone 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Branch Name
              </Label>
              <Select onValueChange={handleSelectChange("branchName")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                  {formValues.branchName || "Select Branch Name"}
                </SelectTrigger>
                <SelectContent>
                  {/* Add your options here */}
                  <SelectItem value="Branch A">Branch A</SelectItem>
                  <SelectItem value="Branch B">Branch B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Division Name
              </Label>
              <Select onValueChange={handleSelectChange("divisionName")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                  {formValues.divisionName || "Select Division Name"}
                </SelectTrigger>
                <SelectContent>
                  {/* Add your options here */}
                  <SelectItem value="Division 1">Division 1</SelectItem>
                  <SelectItem value="Division 2">Division 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                User Type
              </Label>
              <Select onValueChange={handleSelectChange("userType")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                  {formValues.userType || "Select User Type"}
                </SelectTrigger>
                <SelectContent>
                  {/* Add your options here */}
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Organization
              </Label>
              <Select onValueChange={handleSelectChange("organization")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                  {formValues.organization || "Select Organization"}
                </SelectTrigger>
                <SelectContent>
                  {/* Add your options here */}
                  <SelectItem value="Org A">Org A</SelectItem>
                  <SelectItem value="Org B">Org B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-700 dark:text-gray-300">
                Lob
              </Label>
              <Select onValueChange={handleSelectChange("lob")}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
                  {formValues.lob || "Select Lob"}
                </SelectTrigger>
                <SelectContent>
                  {/* Add your options here */}
                  <SelectItem value="Lob 1">Lob 1</SelectItem>
                  <SelectItem value="Lob 2">Lob 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4 text-sm col-span-2">
              <p>Is Score Report User</p>
              <input type="checkbox" name="isScoreReportUser" onChange={handleChange} />
            </div>
          </div>
          <Button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-900"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
