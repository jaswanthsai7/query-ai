import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
    ChevronDown,
    Check
} from "lucide-react";

const CustomDropdown = ({ label, value, options, onChange, icon: Icon }) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-white/80 mb-1 flex items-center gap-2">
            {Icon && <Icon size={18} />} {label}
        </label>
        <Listbox value={value} onChange={onChange}>
            <div className="relative">
                <Listbox.Button className="w-full px-4 py-2 rounded-full border border-white/40 bg-white/10 text-white placeholder-white/70 flex items-center justify-between focus:ring-2 focus:ring-orange-400">
                    {value || `Select ${label}`}
                    <ChevronDown className="w-4 h-4 text-white/70" />
                </Listbox.Button>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-2 w-full max-h-60 overflow-auto rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                        {options.map((option, idx) => (
                            <Listbox.Option
                                key={idx}
                                className={({ active }) =>
                                    `cursor-pointer select-none px-4 py-2 ${active ? "bg-orange-100 text-orange-900" : "text-gray-900"
                                    }`
                                }
                                value={option}
                            >
                                {({ selected }) => (
                                    <div className="flex justify-between">
                                        <span className={selected ? "font-semibold" : "font-normal"}>
                                            {option}
                                        </span>
                                        {selected && <Check className="w-4 h-4 text-orange-500" />}
                                    </div>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    </div>
);

export default CustomDropdown;