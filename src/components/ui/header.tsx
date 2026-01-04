"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

function Header1() {
    const navigationItems = [
        {
            title: "How It Works",
            href: "#how-it-works",
        },
        {
            title: "For Parents",
            href: "#for-parents",
        },
        {
            title: "Pricing",
            href: "#pricing",
        },
    ];

    const [isOpen, setOpen] = useState(false);
    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-background/95 backdrop-blur-sm border-b border-border/50">
            <div className="container relative mx-auto min-h-16 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center px-4">
                {/* Logo */}
                <div className="flex items-center">
                    <span className="font-serif text-2xl tracking-tight">Artemis</span>
                </div>

                {/* Desktop Navigation */}
                <div className="justify-center items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-center items-center">
                        <NavigationMenuList className="flex justify-center gap-1 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuLink href={item.href}>
                                        <Button variant="ghost" className="text-sm font-medium">
                                            {item.title}
                                        </Button>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* CTA Buttons */}
                <div className="flex justify-end w-full gap-3">
                    <Button variant="ghost" className="hidden md:inline-flex text-sm" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button className="text-sm" asChild>
                        <Link href="/login">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" size="icon" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-16 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 px-4 gap-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="py-2 px-4 rounded-md hover:bg-muted text-sm font-medium"
                                    onClick={() => setOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}
                            <div className="border-t my-2"></div>
                            <Button variant="ghost" className="justify-start" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button className="w-full" asChild>
                                <Link href="/login">Get Started</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export { Header1 };