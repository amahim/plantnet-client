import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { Fragment } from "react";
import { MdCancel } from "react-icons/md";

const ImageViewerModal = ({ isOpen, setIsOpen, imageUrl, altText }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="relative max-w-4xl max-h-[90vh] transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 z-10 rounded-full p-2 text-black hover:bg-opacity-75 transition-colors text-xl font-bold w-10 h-10 flex items-center justify-center"
                  title="Close"
                >
                  <MdCancel/>
                </button>

                {/* Image */}
                <div className="flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt={altText || "Plant image"}
                    className="max-w-full max-h-[90vh] object-contain"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                {/* Optional: Image details */}
                {altText && (
                  <div className="px-6 py-4 bg-gray-50">
                    <p className="text-center text-gray-700 font-medium">
                      {altText}
                    </p>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

ImageViewerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string,
};

export default ImageViewerModal;
