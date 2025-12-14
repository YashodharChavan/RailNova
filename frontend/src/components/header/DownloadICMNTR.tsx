import { useEffect, useState } from "react";
import {  useMotionValue } from "framer-motion";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DownloadIcon } from "../../icons";

export default function DownloadICMNTR() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

  const x = useMotionValue(0);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (confirmed) {
      const clearAll = async () => {
        try {
          const res = await fetch("https://backend-of-railnova.vercel.app/api/clear-all-data");
          const data = await res.json();

          if (data.success) {
            console.log("✅ Tables cleared successfully");
          } else {
            console.error("❌ Failed to clear tables:", data.error);
          }
        } catch (err) {
          console.error("❌ Error clearing tables:", err);
        }
      };
      clearAll();
    }
  }, [confirmed]);

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };

  // 👇 Reset swipe state whenever dropdown opens
  useEffect(() => {
    if (isOpen) {
      setConfirmed(false);
      x.set(0);
    }
  }, [isOpen, x]);

  return (
    <div className="relative">
      {/* upload trigger button (notification bell) */}
      <button
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={handleClick}
      >
        {notifying && (
          <span className="absolute right-0 top-0.5 z-10 flex h-2 w-2 rounded-full bg-green-700">
            <span className="absolute inline-flex w-full h-full bg-green-700 rounded-full opacity-75 animate-ping"></span>
          </span>
        )}

        <DownloadIcon className="w-6 h-6" />
      </button>

      {/* Dropdown */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <a
          href="/resources/ICMNTR.xls"
          download
          className="
    group mb-3 flex items-center justify-between gap-3
    rounded-xl border border-gray-700/40
    bg-gradient-to-br from-gray-800/90 to-gray-900
    px-4 py-3
    text-sm font-semibold text-white
    shadow-md
    transition-all duration-200
    hover:from-gray-700 hover:to-gray-800
    hover:shadow-lg
    active:scale-[0.98]
  "
        >
          <div className="flex items-center gap-3">
            {/* Icon container */}
            <span className="
      flex h-9 w-9 items-center justify-center
      rounded-lg bg-gray-700/70
      transition group-hover:bg-gray-600
    ">
              ⬇
            </span>

            <div className="flex flex-col leading-tight">
              <span>Download ICMNTR</span>
              <span className="text-xs font-normal text-gray-400">
                Excel Sheet (.xls)
              </span>
            </div>
          </div>

          {/* Right arrow */}
          <span className="text-gray-400 transition group-hover:translate-x-1">
            →
          </span>
        </a>

      </Dropdown>
    </div>
  );
}