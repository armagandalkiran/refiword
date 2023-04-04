import { IconX } from "@tabler/icons-react";
import React from "react";

interface PopupProps {
  show: boolean;
  setShow: (value: boolean) => void;
  title?: string;
  children: any;
}

export const Popup = ({ show, setShow, title, children }: PopupProps) => {
  const handleClose = () => setShow(false);

  React.useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [show]);

  return (
    <>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleClose}
          />
          <div className="relative bg-white rounded-lg p-4 w-10/12">
            <IconX
              className="absolute text-gray-500 right-3"
              onClick={handleClose}
            />
            <header className="text-spacecadet text-lg">{title}</header>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
