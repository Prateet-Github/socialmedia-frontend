import {
  Camera,
  PhoneCall,
  PlusCircle,
  SendHorizonal,
  ArrowLeft,
} from "lucide-react";

const ChatBox = () => {
  return (
    <main className="flex flex-col h-screen">
      {/* Header - fixed to top */}
      <div className="border-b p-3 md:p-4 flex justify-between items-center sticky top-0 bg-black z-10">
        <div className="flex gap-3 md:gap-4 items-center">
          {/* Back button for mobile */}
          <button className="md:hidden">
            <ArrowLeft className="size-5" />
          </button>
          <img
            src="./pfp.jpeg"
            alt="pfp"
            className="h-9 w-9 md:h-10 md:w-10 object-cover rounded-full border"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-sm md:text-base">
              Prateet Tiwari
            </span>
            <span className="text-xs text-gray-400">Active now</span>
          </div>
        </div>
        <div className="flex gap-3 md:gap-4">
          <button className="cursor-pointer hover:text-gray-300 transition-colors">
            <Camera className="size-5 md:size-6" />
          </button>
          <button className="cursor-pointer hover:text-gray-300 transition-colors">
            <PhoneCall className="size-5 md:size-6" />
          </button>
        </div>
      </div>

      {/* Messages area - scrollable */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
        {/* Received message */}
        <div className="flex">
          <div className="bg-gray-800 p-2.5 md:p-3 rounded-2xl rounded-tl-sm max-w-[75%] md:max-w-xs">
            <p className="text-sm md:text-base">
              Hey Prateet! How's it going? Just wanted to check in and see how
              you're doing.
            </p>
            <span className="text-xs text-gray-400 mt-1 block">10:30 AM</span>
          </div>
        </div>

        {/* Sent message */}
        <div className="flex justify-end">
          <div className="bg-blue-600 p-2.5 md:p-3 rounded-2xl rounded-tr-sm max-w-[75%] md:max-w-xs text-white">
            <p className="text-sm md:text-base">
              Hey! I'm doing great, thanks for asking!
            </p>
            <span className="text-xs text-blue-200 mt-1 block">10:32 AM</span>
          </div>
        </div>

        <div className="flex">
          <div className="bg-gray-800 p-2.5 md:p-3 rounded-2xl rounded-tl-sm max-w-[75%] md:max-w-xs">
            <p className="text-sm md:text-base">
              That's awesome! What have you been up to lately?
            </p>
            <span className="text-xs text-gray-400 mt-1 block">10:33 AM</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-blue-600 p-2.5 md:p-3 rounded-2xl rounded-tr-sm max-w-[75%] md:max-w-xs text-white">
            <p className="text-sm md:text-base">
              Working on some cool projects! Building a social media app.
            </p>
            <span className="text-xs text-blue-200 mt-1 block">10:35 AM</span>
          </div>
        </div>

        <div className="flex">
          <div className="bg-gray-800 p-2.5 md:p-3 rounded-2xl rounded-tl-sm max-w-[75%] md:max-w-xs">
            <p className="text-sm md:text-base">
              That sounds interesting! Would love to hear more about it.
            </p>
            <span className="text-xs text-gray-400 mt-1 block">10:36 AM</span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-blue-600 p-2.5 md:p-3 rounded-2xl rounded-tr-sm max-w-[75%] md:max-w-xs text-white">
            <p className="text-sm md:text-base">
              Sure! Let's catch up soon 🚀
            </p>
            <span className="text-xs text-blue-200 mt-1 block">10:37 AM</span>
          </div>
        </div>
      </div>

      {/* Input - fixed to bottom */}
      <div className="border-t p-3 md:p-4 bg-black flex gap-2 md:gap-4 items-center">
        <button className="flex-shrink-0 hover:text-gray-300 transition-colors">
          <PlusCircle className="size-5 md:size-6" />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 md:p-2.5 px-4 bg-gray-900 border border-gray-700 rounded-full outline-none focus:border-blue-500 transition-colors text-sm md:text-base"
        />
        <button className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 p-2 md:p-2.5 rounded-full transition-colors">
          <SendHorizonal className="size-4 md:size-5" />
        </button>
      </div>
    </main>
  );
};

export default ChatBox;