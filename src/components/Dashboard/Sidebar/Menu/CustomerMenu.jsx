import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
import { useState } from "react";
import BecomeSellerModal from "../../../Modal/BecomeSellerModal";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
const CustomerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const requestHandler = async () => {
    try {
      // send a req to server to become a seller
      const { data } = await axiosSecure.patch(`/users/${user?.email}`);
      console.log(data);
      toast.success("Request sent to admin");
    } catch (err) {
      console.log(err);

      // Safely access error message from backend
      const errorMessage =
        err.response?.data?.message || // if backend sends { message: "Already Requested" }
        err.response?.data || // if backend sends plain string
        "Something went wrong!"; // fallback

      toast.error(errorMessage);
    } finally {
      // setIsOpen(false)
      closeModal();
    }
  };
  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />

      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer"
      >
        <GrUserAdmin className="w-5 h-5" />

        <span className="mx-4 font-medium">Become A Seller</span>
      </button>

      <BecomeSellerModal
        requestHandler={requestHandler}
        closeModal={closeModal}
        isOpen={isOpen}
      />
    </>
  );
};

export default CustomerMenu;
