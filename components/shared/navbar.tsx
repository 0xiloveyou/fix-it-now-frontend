'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, LogOut, LogIn, UserPlus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavbarProps } from '@/lib/types';
import { toast } from 'sonner';
import { logout } from '@/service/logout';
import { useRouter } from 'next/navigation';


export function Navbar({ user }: NavbarProps) {
  const isLoggedIn = user?.success && user?.data?.user;
  const userName = user?.data?.user?.name || 'User';
  const userRole = user?.data?.user?.role;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/technicians', label: 'Technicians' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];


  const router = useRouter()
  const handleUserMenuAction = async (action: string) => {

    if(action === "dashboard" ){
      if(userRole === "CUSTOMER"){
        router.push("/customer-dashboard")
      }
      else if(userRole === "TECHNICIAN"){
        router.push("/technician-dashboard")
      }
      else if(userRole === "ADMIN"){
        router.push("/admin-dashboard")
      }

      return;
    }

    if(action === "logout"){
        await logout();
        toast.success("User Logged Out Successfully!");
        router.push("/login");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              🔧
            </div>
            <span className="hidden sm:inline text-xl font-bold text-gray-900">FixItNow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
                <Link href="/login">
                  <Button variant="outline" size="sm" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Search className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                  
                    <Button  onClick={async () => await handleUserMenuAction("dashboard")} variant="outline" size="sm">
                      Dashboard
                    </Button>
                 
                  <div className="relative group">
                    <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold hover:bg-blue-700 transition-colors">
                      {userName.charAt(0).toUpperCase()}
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2 flex items-center">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <hr className="my-1" />
                      <button onClick={async () => {
                await handleUserMenuAction("logout")}} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 gap-2 flex items-center">
                        <LogOut  className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2" />
            {!isLoggedIn ? (
              <div className="flex gap-2 px-4">
                <Link href="/login" className="flex-1">
                  <Button  variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button size="sm" className="w-full">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2 px-4">
                <Link href="/dashboard" className="block">
                  <Button variant="outline" className="w-full">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/profile" className="block">
                  <Button variant="outline" className="w-full">
                    Profile
                  </Button>
                </Link>
                <Button  onClick={async () => {
                await handleUserMenuAction("logout")}} variant="outline" className="w-full">
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
