import { useState } from "react";
import PropTypes from "prop-types";
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const UpdatePlantForm = ({ plant, setIsEditModalOpen, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [uploadImg, setUploadImg] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Form state with default values from plant prop
  const [formData, setFormData] = useState({
    name: plant?.name || "",
    category: plant?.category || "Indoor",
    description: plant?.description || "",
    price: plant?.price || "",
    quantity: plant?.quantity || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUploadImg(file);
  };

  const uploadImageToImgbb = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.data.display_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = plant?.image; // Keep existing image if no new image uploaded

      // Upload new image if one is selected
      if (uploadImg) {
        imageUrl = await uploadImageToImgbb(uploadImg);
      }

      const updatedPlantData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        image: imageUrl,
      };

      // Update plant via API
      await axiosSecure.patch(`/plants/${plant._id}`, updatedPlantData);

      toast.success("Plant updated successfully!");
      refetch(); // Refresh the plant list
      setIsEditModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error updating plant:", error);
      toast.error("Failed to update plant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                placeholder="Plant Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Category */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Succulent">Succulent</option>
                <option value="Flowering">Flowering</option>
              </select>
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                placeholder="Write plant description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 "
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600 ">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="price"
                  id="price"
                  type="number"
                  placeholder="Price per unit"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">
                  Quantity
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                  name="quantity"
                  id="quantity"
                  type="number"
                  placeholder="Available quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Current Image Preview */}
            {plant?.image && (
              <div className="space-y-1 text-sm">
                <label className="block text-gray-600">Current Image</label>
                <img
                  src={plant.image}
                  alt="Current plant"
                  className="w-full h-32 object-cover rounded-md border"
                />
              </div>
            )}

            {/* Image Upload */}
            <div className=" p-4  w-full  m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                    />
                    <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                      {uploadImg ? "Change Image" : "Upload New Image"}
                    </div>
                  </label>
                  {uploadImg && (
                    <p className="text-xs text-gray-500 mt-1">
                      {uploadImg.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 hover:bg-lime-600 disabled:bg-gray-400"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin mx-auto" />
              ) : (
                "Update Plant"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

UpdatePlantForm.propTypes = {
  plant: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    image: PropTypes.string,
  }),
  setIsEditModalOpen: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default UpdatePlantForm;
