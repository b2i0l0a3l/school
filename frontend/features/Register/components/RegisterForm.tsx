"use client";

import React, { useMemo, useState } from "react";
import Input from "@/Components/Ui/Input/Input";
import Button from "@/Components/Ui/Button/Button";
import { Mail, Lock, User } from "lucide-react";
import { Register } from "../api/RegisterApi";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const payload = useMemo(
    () => ({
      email,
      password,
    }),
    [email, password],
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (payload.password !== confirmPassword) {
      toast.error("كلمة المرور غير متطابقة");
      return;
    }
    try {
      setIsLoading(true);
      const result = await Register(payload.email, payload.password);
      if (!result.succeeded || !result.value) {
        toast.error(result.message);
      }
      toast.success(result.message);
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="البريد الإلكتروني"
        type="email"
        placeholder="example@school.com"
        icon={<Mail className="w-5 h-5" />}
        required
        autoComplete="email"
      />

      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="كلمة المرور"
        type="password"
        placeholder="••••••••"
        icon={<Lock className="w-5 h-5" />}
        required
        autoComplete="new-password"
      />

      <Input
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        label="تأكيد كلمة المرور"
        type="password"
        placeholder="••••••••"
        icon={<Lock className="w-5 h-5" />}
        required
        autoComplete="new-password"
      />

      <Button
        type="submit"
        text="إنشاء حساب"
        variant="primary"
        className="w-full mt-4 py-3"
        loading={isLoading}
      />
    </form>
  );
}
