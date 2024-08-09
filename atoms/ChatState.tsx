import { atom } from "recoil";

export const ChatState = atom({
    key: "ChatState",
    default: {active: false, friendId: ""}
})