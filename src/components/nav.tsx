import Image from "next/image";
import React, { ReactNode, useEffect, useState, useRef } from "react";
import { useSupabaseClient } from "@/hooks/use-supabase";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import HOC from "./hoc";
const Nav = HOC(
  ({ children, className }: { children?: ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { signOut, getUserSession } = useSupabaseClient();
    const [user, setUser] = useState<
      { email: string; avatar: string } | undefined
    >(undefined);
    const [isHover, setIsHover] = useState(true);

    const { pathname } = useRouter();

    useEffect(() => {
      (async () => {
        const userSession = await getUserSession();
        if (!userSession) setUser(undefined);
        else {
          const { email, user_metadata } = userSession!;
          setUser({
            email: email!,
            avatar: user_metadata.avatar_url!,
          });
        }
      })();
    }, [user, pathname, signOut, getUserSession]);

    useEffect(() => {
      if (pathname === "/login" || pathname === "/register") {
        setIsHover(true);
        return;
      }

      const node = ref.current;
      const handleMouseEnter = () => setIsHover(false);
      const handleMouseLeave = () => setIsHover(true);
      if (node) {
        node.addEventListener("mouseenter", handleMouseEnter);
        node.addEventListener("mouseleave", handleMouseLeave);
      }
      return () => {
        if (node) {
          node.removeEventListener("mouseenter", handleMouseEnter);
          node.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }, [pathname]);

    return (
      <div
        className={
          className
            ? className
            : "w-full fixed top-0 left-0 right-0 bg-white z-50 shadow-xl"
        }
      >
        <nav
          className={`flex-nowrap md:flex md:justify-between items-center p-4`}
        >
          <div
            ref={ref}
            className="flex justify-between items-center md:text-center md:space-x-2 md:items-start"
          >
            {isHover && user && (
              <div className="hover:cursor-pointer">
                {user?.avatar ? (
                  <Image
                    src={user?.avatar ?? ""}
                    className="rounded-full h-9 w-9"
                    height={"500"}
                    width={"500"}
                    alt={user.avatar}
                    quality={100}
                    loading="lazy"
                  />
                ) : (
                  <User className="w-9 h-9 rounded-full bg-gray-200 p-1" />
                )}
              </div>
            )}
            {!user && (
              <Link
                href={pathname === "/login" ? "/register" : "/login"}
                passHref
                className="text-xs font-bold text-orange-500 text-center p-2 rounded ring-1 ring-orange-600 bg-transparent transition-all duration-300 hover:scale-105 hover:bg-orange-100"
              >
                {pathname === "/login" ? "Register" : "Log in"}
              </Link>
            )}
            {!isHover && user && (
              <LogOut
                onClick={signOut}
                className="w-9 h-9 text-red-600 rounded-full bg-red-200 p-1 hover:cursor-pointer hover:scale-105 transition-all duration-500 hover:bg-red-300"
              />
            )}
            <p className="text-md font-semibold text-yellow-600">
              {user?.email}
            </p>
          </div>
          <div className="flex mt-10 items-center justify-center md:mt-0">
            <div className="w-full md:w-max">{children}</div>
          </div>
        </nav>
      </div>
    );
  }
);
export default Nav;
