import { Menu, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

export type VibeType = "Professional" | "Casual" | "Funny";

interface DropDownProps {
  vibe: VibeType;
  setVibe: (vibe: VibeType) => void;
}

const vibes: VibeType[] = ["Professional", "Casual"];

export default function DropDown({ vibe, setVibe }: DropDownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
          <span>{vibe}</span>
          <ChevronUpIcon
            className="-mr-1 ml-2 h-5 w-5 hidden sm:block"
            aria-hidden="true"
          />
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 block sm:hidden"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {vibes.map((vibeItem) => (
              <Menu.Item key={vibeItem}>
                {({ active }) => (
                  <button
                    onClick={() => setVibe(vibeItem)}
                    className={`${
                      vibe === vibeItem ? "text-gray-900 bg-gray-100" : "text-gray-700"
                    } group flex items-center w-full px-4 py-2 text-sm`}
                  >
                    <span className="mr-2">{vibeItem}</span>
                    {vibe === vibeItem && (
                      <CheckIcon className="w-4 h-4 text-bold" />
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
