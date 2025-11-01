"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const settingsLinks = [
    { title: "Personal Information", href: "/setting/personal-information" },
    { title: "Change Password", href: "/setting/change-password" },
    { title: "Terms & Condition", href: "/setting/terms-condition" },
    { title: "Privacy Policy", href: "/setting/privacy-policy" },
    { title: "Trust & Safety", href: "/setting/trust-safety" },
  ];

  return (
    <div className='flex min-h-screen bg-transparent p-6'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className='max-w-3xl mx-auto'>
            <h1 className='text-2xl font-semibold text-gray-800 mb-4'>
              Settings
            </h1>
            <div className='border-b border-gray-200 mb-6'></div>

            <div className='space-y-4'>
              {settingsLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className='flex items-center justify-between p-4 border border-[#760C2A] rounded-md hover:bg-gray-900 transition-colors'
                >
                  <span className='text-white text-lg'>{link.title}</span>
                  <ChevronRight className='h-5 w-5 text-gray-400' />
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
