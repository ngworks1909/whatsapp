import prisma from "@/db/src/index";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { getServerSession } from "next-auth";

export const fetchMessages = async (friendId: string) => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  const id = session.user.id;
  const data = await prisma.friend.update({
    where: {
      userId: id,
      friendId,
    },
    data: {
      messageCount: 0,
    },
    select: {
      incomingMessages: {
        where: {
          recieverDelete: false,
        },
      },
      outgoingMessages: {
        where: {
          senderDelete: false,
        },
      },
    },
  });
  const combinedMessages = [...data.incomingMessages, ...data.outgoingMessages];

  const messages = combinedMessages.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  return messages;
};
