"use client";

import React, { useMemo, useState } from "react";
import Input from "@/Components/Ui/Input/Input";
import Button from "@/Components/Ui/Button/Button";
import { Mail, Lock } from "lucide-react";
import { login } from "../api/LoginApi";
import toast from "react-hot-toast";
import { setAccessToken, setRefreshToken } from "@/Util/Api/session";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const payload = useMemo(() => ({
        email,
        password,
    }), [email, password]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
     try{
        setIsLoading(true);
        const result = await login(payload.email, payload.password);
        if (!result.succeeded || !result.value) {
            toast.error(result.message);
        }
        console.log(result);
        setAccessToken(result.value?.token!);
        setRefreshToken(result.value?.refreshToken!);
        router.push("/");
     }catch(error){
        console.log(error);
        toast.error("Login failed");
     }finally{
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
            
            <div className="space-y-1">
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="كلمة المرور"
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock className="w-5 h-5" />}
                    required
                    autoComplete="current-password"
                />
                <div className="flex justify-end mt-1">
                    <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                        نسيت كلمة المرور؟
                    </a>
                </div>
            </div>

            <Button
                type="submit"
                text="تسجيل الدخول"
                variant="primary"
                className="w-full mt-2 py-3"
                loading={isLoading}
            />
        </form>
    );
}
