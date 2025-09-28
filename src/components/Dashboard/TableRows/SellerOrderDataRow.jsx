/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
const SellerOrderDataRow = ({orderData,refetch}) => {
  const {  plantName,customer,address ,plantId, price, _id, quantity, status } = orderData || {};
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
  const axiosSecure = useAxiosSecure();

  // handle order dlete cancellation
   const handleDelete = async () => {
      try {
        await axiosSecure.delete(`/order/${_id}`);
        // increase quantity from this plant 
              await axiosSecure.patch(`/plants/quantity/${plantId}`, { updatedQuantity: quantity,
                status:"increase"
               });
        // call refetch to update ui
        refetch();
        toast.success("Order cancelled");
        // console.log(_id);
      } catch (err) {
        console.log("Error deleting order:", err);
        toast.error(err.response?.data?.message || "Failed to cancel order");
      } finally {
        closeModal();
      }
    };
    // handle status update
    const handleStatusUpdate = async newStatus => {
      if(status === newStatus) return;
      // patch request 
       try {
        // update order status
              await axiosSecure.patch(`/order/${_id}`, { status: newStatus });
        // call refetch to update ui
        refetch();
        toast.success("Status updated");
        // console.log(_id);
      } catch (err) {
        console.log("Error updating status:", err);
        toast.error(err.response?.data?.message || "Failed to cancel order");
      } finally {
        closeModal();
      }

    }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{plantName}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{customer?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{quantity}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{address}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{status}</p>
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center gap-2'>
          <select
            required
            onChange={e => handleStatusUpdate(e.target.value)}
            disabled={status === 'Delivered'}
            className='p-1 border-2 border-lime-300 focus:outline-lime-500 rounded-md text-gray-900 whitespace-no-wrap bg-white'
            name='category'
          >
            <option value='Pending'>Pending</option>
            <option value='In Progress'>Start Processing</option>
            <option value='Delivered'>Deliver</option>
          </select>
          <button
            onClick={() => setIsOpen(true)}
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
          >
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Cancel</span>
          </button>
        </div>
        <DeleteModal handleDelete={handleDelete} isOpen={isOpen} closeModal={closeModal} />
      </td>
    </tr>
  )
}

SellerOrderDataRow.propTypes = {
  order: PropTypes.object,
  refetch: PropTypes.func,
}

export default SellerOrderDataRow
