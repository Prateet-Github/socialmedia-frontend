import {
  Camera,
  PhoneCall,
  PlusCircle,
  SendHorizonal,
} from "lucide-react";

const ChatBox = () => {
  return (
    <main className="flex flex-col h-screen">
      {/* Header - fixed to top */}
      <div className="border-b p-4 flex justify-between items-center sticky top-0 bg-black z-10">
        <div className="flex gap-4 items-center">
          <img
            src="./pfp.jpeg"
            alt="pfp"
            className="h-10 w-10 object-contain rounded-full border"
          />
          <span className="font-semibold">Prateet Tiwari</span>
        </div>
        <div className="flex gap-4">
          <button className="cursor-pointer" title="Start a Video Call">
            <Camera />
          </button>
          <button className="cursor-pointer" title="Start a Voice Call">
            <PhoneCall />
          </button>
        </div>
      </div>

      {/* Messages area - scrollable */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Example message */}
        <div className="mb-4">
          <div className="bg-gray-800 p-3 rounded-lg max-w-xs">
            <p className="text-sm">
              Hey Prateet! How's it going? Just wanted to check in and see how
              you're doing.
            </p>
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <div className="bg-blue-600 p-3 rounded-lg max-w-xs text-white">
            <p className="text-sm">Hey! I'm doing great, thanks for asking!</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="bg-gray-800 p-3 rounded-lg max-w-xs">
            <p className="text-sm">
              Hey Prateet! How's it going? Just wanted to check in and see how
              you're doing.
            </p>
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <div className="bg-blue-600 p-3 rounded-lg max-w-xs text-white">
            <p className="text-sm">Hey! I'm doing great, thanks for asking!</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="bg-gray-800 p-3 rounded-lg max-w-xs">
            <p className="text-sm">
              Hey Prateet! How's it going? Just wanted to check in and see how
              you're doing.
            </p>
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <div className="bg-blue-600 p-3 rounded-lg max-w-xs text-white">
            <p className="text-sm">Hey! I'm doing great, thanks for asking!</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="bg-gray-800 p-3 rounded-lg max-w-xs">
            <p className="text-sm">
              Hey Prateet! How's it going? Just wanted to check in and see how
              you're doing.
            </p>
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <div className="bg-blue-600 p-3 rounded-lg max-w-xs text-white">
            <p className="text-sm">Hey! I'm doing great, thanks for asking!</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="bg-gray-800 p-3 rounded-lg max-w-xs">
            <p className="text-sm">
              Hey Prateet! How's it going? Just wanted to check in and see how
              you're doing.
            </p>
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <div className="bg-blue-600 p-3 rounded-lg max-w-xs text-white">
            <p className="text-sm">Hey! I'm doing great, thanks for asking!</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="bg-gray-800 p-3 rounded-lg max-w-xs">
            <p className="text-sm">
              Hey Prateet! How's it going? Just wanted to check in and see how
              you're doing.
            </p>
          </div>
        </div>
        <div className="mb-4 flex justify-end">
          <div className="bg-blue-600 p-3 rounded-lg max-w-xs text-white">
            <p className="text-sm">Hey! I'm doing great, thanks for asking!</p>
          </div>
        </div>
      </div>

      {/* Input - fixed to bottom */}
      <div className="border-t p-4 bg-black flex gap-4 items-center">
        <button>
          <PlusCircle className="cursor-pointer" />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border rounded-full outline-none"
        />
        <button className="bg-blue-500 p-2 rounded-full cursor-pointer">
          <SendHorizonal />
        </button>
      </div>
    </main>
  );
};

export default ChatBox;
