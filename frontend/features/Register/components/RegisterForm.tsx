"use client";

import React, { useState } from "react";
import Input from "@/Components/Ui/Input/Input";
import Button from "@/Components/Ui/Button/Button";
import { Mail, Lock, User } from "lucide-react";

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="الاسم الكامل"
                type="text"
                placeholder="أحمد محمد"
                icon={<User className="w-5 h-5" />}
                required
            />
            
            <Input
                label="البريد الإلكتروني"
                type="email"
                placeholder="example@school.com"
                icon={<Mail className="w-5 h-5" />}
                required
            />
            
            <Input
                label="كلمة المرور"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-5 h-5" />}
                required
            />

            <Input
                label="تأكيد كلمة المرور"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="w-5 h-5" />}
                required
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
