import { SearchState } from "@/atoms/SearchState";
import { ContactDetails } from "@/components/Sidebar";
import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";


export const useContacts = (userId: string) => {
    const [contacts, setContacts] = useState<ContactDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const search = useRecoilValue(SearchState);
    

    useEffect(()=>{
        const unsub = onSnapshot(doc(db,"friends", userId),(doc)=>{
            const friends: ContactDetails[] = doc.data()?.friends;
            const sortedFriends = friends.sort((a, b) => a.time.toMillis() - b.time.toMillis());
            setContacts(sortedFriends);
            setLoading(false);
        })
      
        return ()=>{
          unsub();
        }
      },[userId]);
    

    return {loading, contacts: contacts.filter((contact) => contact.username.toLowerCase().startsWith(search.toLowerCase()))};
}