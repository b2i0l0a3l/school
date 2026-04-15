"use client";

import React, { useState } from "react";
import Input from "@/Components/Ui/Input/Input";
import Button from "@/Components/Ui/Button/Button";
import { Mail, Lock } from "lucide-react";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="البريد الإلكتروني"
                type="email"
                placeholder="example@school.com"
                icon={<Mail className="w-5 h-5" />}
                required
            />
            
            <div className="space-y-1">
                <Input
                    label="كلمة المرور"
                    type="password"
                    placeholder="••••••••"
                    icon={<Lock className="w-5 h-5" />}
                    required
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
