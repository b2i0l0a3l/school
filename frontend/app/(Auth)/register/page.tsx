import React from 'react';
import Link from 'next/link';
import AuthHeader from '@/Components/Auth/AuthHeader';
import RegisterForm from '@/features/Register/components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-xl shadow-2xl">
            <AuthHeader 
                title="إنشاء حساب جديد" 
                subtitle="قم بإنشاء حساب والانضمام إلى منصتنا التعليمية" 
            />
            
            <RegisterForm />
            
            <p className="mt-8 text-center text-sm text-slate-400">
                لديك حساب بالفعل؟{' '}
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                    تسجيل الدخول
                </Link>
            </p>
        </div>
    );
}
