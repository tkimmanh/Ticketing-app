import Link from "next/link";
import React from "react";
import { ModeToggle } from "../mode-toggle";
import NavLink from "./nav-link";

const MainNav = () => {
  return (
    <div className="flex justify-between">
      <NavLink></NavLink>
      <div className="flex items-center gap-2">
        <Link href="/">Logout</Link>
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
};

export default MainNav;
