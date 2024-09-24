import React, { ReactNode } from "react";
import { StateAction } from "../../interfaces/app";
import Footer from "./footer";
import Nav from "./nav";
import SearchForm from "./search_form";
import { useRouter } from "next/router";
import { useScroll } from "@/hooks/use_scroll_hook";
import HOC from "./hoc";

const Layout = HOC(
  ({
    children,
    setSearch,
  }: {
    children?: ReactNode;
    setSearch?: StateAction<string>;
  }) => {
    const { pathname } = useRouter();
    const searchForm = pathname === "/" ? setSearch! : () => {};
    const { scroll } = useScroll();

    const navProps = `w-full bg-white mb-12 z-50 ${
      scroll! > 80
        ? "fixed top-0 right-0 transform ease-linear duration-300"
        : "mt-10"
    } ${scroll! > 0 ? "shadow-xl" : "shadow-none"}`;
    return (
      <div className="mx-2 relative">
        <Nav
          className={
            pathname !== "/login" && pathname !== "/register" ? navProps : ""
          }
        >
          <SearchForm setSearch={searchForm} />
        </Nav>
        {children}
        <Footer />
      </div>
    );
  }
);

export default Layout;
