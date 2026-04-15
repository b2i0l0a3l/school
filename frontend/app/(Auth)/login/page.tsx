import React from 'react';
import Link from 'next/link';
import AuthHeader from '@/Components/Auth/AuthHeader';
import LoginForm from '@/features/login/components/LoginForm';
export default function LoginPage() {
    return (
        <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl">
            <AuthHeader 
                title="مرحباً بك مجدداً" 
                subtitle="قم بتسجيل الدخول للوصول إلى لوحة التحكم الخاصة بك" 
            />
            
            <LoginForm />
            
            <p className="mt-8 text-center text-sm text-slate-400">
                ليس لديك حساب؟{' '}
                <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                    إنشاء حساب جديد
                </Link>
            </p>
        </div>
    );
}
