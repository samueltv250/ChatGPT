import classnames from "classnames";
import ChatHistory from "./ChatHistory";
import { IonIcon } from "@ionic/react";
import Avatar from "../Avatar/Avatar";
export default function Navbar({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (v: boolean) => void;
}) {
  const navClass = classnames(
    " absolute left-0 bottom-0 top-0  md:flex-grow-1 w-9/12 md:w-[260px] bg-[#202123] text-white z-10 p-2 flex flex-col transition duration-500",
    { "translate-x-0": active, "-translate-x-[150%]": !active }
  );
  const navWrapClass = classnames(
    "navwrap absolute duration-500 top-0 left-0 bottom-0 right-0 z-30 bg-gray-500 md:bg-opacity-0 ",
    { "bg-opacity-60 ": active, "opacity-0 pointer-events-none": !active }
  );
  return (
    <>
      <div className={navWrapClass}>
        <nav className={navClass}>
          <div className="flex mb-2  items-center justify-between gap-2">
            <button
              type="button"
              className=" border border-gray-500 p-2 w-full  md:w-auto  rounded-md text-left flex-grow flex"
            >
              <span className="mr-2 text-xl">
                <IonIcon name="add-outline" />
              </span>
              <span>New chat</span>
            </button>
            <button
              type="button"
              className="border h-10 w-10 border-gray-500 rounded-md p-2 hidden md:inline-block text-gray-200"
              onClick={() => setActive(false)}
            >
              <i className="fa-regular fa-window-maximize rotate-90"></i>
            </button>
          </div>
          <div className="history overflow-y-auto flex-grow pl-2">
            {[...Array(5)].map((_, i) => (
              <ChatHistory key={i} />
            ))}
          </div>
          <div className="account absolute left-0 font-bold right-0 bottom-0 text-sm z-20 bg-[#202123] border-y border-gray-500 shadow  ">
            <div className="px-2 py-2 flex items-center">
              <span className="inline-block text-xl">
                <IonIcon name="person-outline" />
              </span>
              <button className="p-2 inline-block">Upgrade to Plus</button>
              <span className=" uppercase text-black p-1 font-normal rounded ml-auto inline-block bg-orange-200">
                new
              </span>
            </div>

            <div className="px-2 relative py-2 flex items-center hover:bg-gray-700 transition group">
              <div className=" absolute bottom-12 rounded-md left-0 right-0 bg-black font-normal invisible transition  m-2 z-30 text-gray-300 group-hover:visible">
                <button className=" p-2   hover:bg-gray-700 w-full text-left flex items-center">
                  <span className="mr-2 p-1 text-xl  flex items-center">
                    <IonIcon name="chatbox-ellipses-outline" />
                  </span>
                  <span>Custom instructions</span>
                </button>
                <button className=" p-2   hover:bg-gray-700 w-full text-left flex items-center">
                  <span className="mr-2 p-1  text-xl flex items-center">
                    <IonIcon name="settings-outline" />
                  </span>
                  <span>Settings</span>
                </button>
                <div className="h-[1px] bg-gray-300"></div>
                <button className=" p-2   hover:bg-gray-700  w-full  text-left flex items-center">
                  <span className="mr-2 p-1 text-xl flex items-center">
                    <IonIcon name="log-out-outline" />
                  </span>
                  <span>Log out</span>
                </button>
              </div>
              <Avatar />

              <span className="p-2">T-Series</span>
              <button className=" ml-auto  text-gray-400 text-2xl">
                <IonIcon name="ellipsis-horizontal-outline" />
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActive(false)}
            className="close md:hidden absolute top-2 h-10 w-10 border-2 -right-10  p-2 flex items-center justify-center"
          >
            <span className=" text-2xl flex">
              <IonIcon name="close-outline" />
            </span>
          </button>
        </nav>
      </div>
    </>
  );
}
