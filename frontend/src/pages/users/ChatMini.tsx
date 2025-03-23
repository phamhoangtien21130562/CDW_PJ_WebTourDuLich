import { useCallback } from "react";
import Talk from "talkjs";
import { Session, Chatbox } from "@talkjs/react";

function ChatMini() {
  const syncUser = useCallback(() => {
    return new Talk.User({
      id: "nina",
      name: "Nina",
      email: "nina@example.com",
      photoUrl: "https://talkjs.com/new-web/avatar-7.jpg",
      welcomeMessage: "Hi!",
      role: "default",
    });
  }, []);

  const syncConversation = useCallback((session: Talk.Session) => {
    const conversation = session.getOrCreateConversation("welcome");

    const other = new Talk.User({
      id: "frank",
      name: "Frank",
      email: "frank@example.com",
      photoUrl: "https://talkjs.com/new-web/avatar-8.jpg",
      welcomeMessage: "Hey, how can I help?",
      role: "default",
    });
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);

    return conversation;
  }, []);
  const chatStyle = {
    position: "fixed",
    bottom: "100px",
    right: "20px",
    width: "350px",
    height: "400px",
    zIndex: 1000,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    borderRadius: "10px",
  } as const;
  return (
    <div style={chatStyle}>
      <Session appId="tHevpRWs" syncUser={syncUser}>
        <Chatbox
          syncConversation={syncConversation}
          style={{ width: "100%", height: "100%" }}
        />
      </Session>
    </div>
  );
}

export default ChatMini;