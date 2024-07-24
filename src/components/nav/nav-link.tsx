"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = () => {
  const links = [
    { lable: "Dashboard", path: "/" },
    { lable: "Tickets", path: "/tickets" },
    { lable: "Users", path: "/users" },
  ];
  const currrentPath = usePathname();
  return (
    <>
      <div className="flex items-center gap-2">
        {links.map((link) => {
          return (
            <Link
              className={`navbar-link ${
                currrentPath == link.path &&
                "cursor-default text-primary/70 hover:text-primary/60 "
              }`}
              key={link.lable}
              href={link.path}
            >
              {link.lable}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default NavLink;
