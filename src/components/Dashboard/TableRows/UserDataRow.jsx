/* eslint-disable react/prop-types */
import { useState } from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";
const UserDataRow = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { email, role, status } = userData || {};
  const { user } = useAuth();
  return (
    <tr>
      <td
        className={`px-5 py-5 border-b border-gray-200 text-sm ${
          user?.email === email ? "bg-gray-400 text-white" : "bg-white"
        }`}
      >
        <p className="whitespace-no-wrap">{email}</p>
      </td>
      <td
        className={`px-5 py-5 border-b border-gray-200 text-sm ${
          user?.email === email ? "bg-gray-400 text-white" : "bg-white"
        }`}
      >
        <p className="whitespace-no-wrap">{role}</p>
      </td>
      <td
        className={`px-5 py-5 border-b border-gray-200 text-sm ${
          user?.email === email ? "bg-gray-400" : "bg-white"
        }`}
      >
        <p
          className={`${
            status === "Requested"
              ? "text-blue-500"
              : status === "Verified"
              ? "text-green-500"
              : "text-red-500"
          } whitespace-no-wrap`}
        >
          {!status ? "Unavailable" : status}
        </p>
      </td>

      <td
        className={`px-5 py-5 border-b border-gray-200 text-sm ${
          user?.email === email ? "bg-gray-400" : "bg-white"
        }`}
      >
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </span>
        {/* Modal */}
        <UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
