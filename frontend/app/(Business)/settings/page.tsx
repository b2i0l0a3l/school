"use client";

import Header from "@/Components/Ui/Header/Header";
import Card from "@/Components/Ui/Card/Card";
import Input from "@/Components/Ui/Input/Input";
import Button from "@/Components/Ui/Button/Button";
import { Save, Shield, Bell, User } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="flex flex-col flex-1 pb-[20px] min-h-screen text-slate-200">
            <Header title="الإعدادات" />
            
            <div className="flex-1 p-8 flex flex-col gap-6 max-w-5xl mx-auto w-full">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-50">إعدادات النظام والحساب</h1>
                        <p className="text-sm text-slate-400 mt-1">
                            قم بإدارة إعدادات حسابك وتفضيلات النظام من هنا.
                        </p>
                    </div>
                    <Button
                        text="حفظ التغييرات"
                        icon={<Save size={16} />}
                        variant="primary"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Settings Navigation Sidebar (Visual only) */}
                    <div className="col-span-1 flex flex-col gap-2">
                        <button className="flex items-center gap-3 px-4 py-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl font-medium transition-colors text-right">
                            <User size={18} />
                            الملف الشخصي
                        </button>
                        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 rounded-xl font-medium transition-colors text-right">
                            <Shield size={18} />
                            الأمان وكلمة المرور
                        </button>
                        <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 rounded-xl font-medium transition-colors text-right">
                            <Bell size={18} />
                            الإشعارات
                        </button>
                    </div>

                    {/* Settings Content */}
                    <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
                        <Card
                            header={
                                <>
                                    <h3>المعلومات الأساسية</h3>
                                </>
                            }
                        >
                            <div className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Input
                                        label="الاسم الأول"
                                        placeholder="فاطمة"
                                    />
                                    <Input
                                        label="اسم العائلة"
                                        placeholder="أحمد"
                                    />
                                </div>
                                <Input
                                    label="البريد الإلكتروني"
                                    type="email"
                                    placeholder="admin@school.com"
                                />
                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-sm font-medium text-slate-300">الدور الوظيفي</label>
                                    <input 
                                        type="text" 
                                        disabled 
                                        value="مدير النظام (Admin)"
                                        className="w-full px-4 py-2.5 bg-slate-900/30 border border-slate-700/30 rounded-xl text-slate-500 text-sm cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </Card>

                        <Card
                            header={
                                <>
                                    <h3>تفضيلات العرض</h3>
                                </>
                            }
                        >
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-700/50 rounded-xl">
                                    <div>
                                        <div className="font-medium text-slate-200">الوضع الليلي (Dark Mode)</div>
                                        <div className="text-xs text-slate-400 mt-1">تفعيل أو تعطيل السمة الداكنة للتطبيق بأكمله.</div>
                                    </div>
                                    <div className="relative inline-block w-12 h-6 rounded-full bg-indigo-500 transition-colors cursor-pointer">
                                        <div className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform translate-x-6"></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-700/50 rounded-xl">
                                    <div>
                                        <div className="font-medium text-slate-200">تنبيهات البريد الإلكتروني</div>
                                        <div className="text-xs text-slate-400 mt-1">تلقي إشعارات دورية حول نشاطات النظام والطلاب.</div>
                                    </div>
                                    <div className="relative inline-block w-12 h-6 rounded-full bg-slate-700 transition-colors cursor-pointer">
                                        <div className="absolute top-1 left-1 bg-slate-400 w-4 h-4 rounded-full transition-transform"></div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
