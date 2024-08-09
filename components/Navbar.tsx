import React from "react";
import NavDropDown from "./NavDropDown";
import ChatDropDown from "./ChatDropDown";
import ChatHeader from "./ChatHeader";
import NavHeader from "./NavHeader";


export default function Navbar({type}: {type: "Chats" | "ChatRoom"}) {
  return (
    <div className="bg-[#202c33] h-16 flex w-full items-center px-4 justify-between">
      {type === "Chats" ? 
      <>
      <NavHeader />
      <NavDropDown />
      </>
      : 
      <>
      <ChatHeader/>
      <ChatDropDown/>
      </>
      }
    </div>
  );
}
