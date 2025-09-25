import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'
import { imageUpload } from '../../../api/utils'
import useAuth from '../../../hooks/useAuth'
import { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const AddPlant = () => {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  // upload btn text n image preview
  const [uploadImg, setUploadImg] = useState({image:{name: 'Upload Image'}})
  const [loading, setLoading] = useState(false)
const navigate = useNavigate()
  const handleFormSubmit =async  (e) => {
    e.preventDefault()

    setLoading(true)
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const quantity = parseFloat(form.quantity.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image)

    // user info
    const seller ={
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL
    }

    // create palnt data obj
    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      image: imageUrl,
      seller,

  }

  // console.table(plantData)
  // save data to db
  try { 
 await axiosSecure.post('/plants', plantData)
toast.success('Plant added successfully')
navigate('/dashboard/my-inventory')
  }catch (error) {

    console.log(error.message)
  }
  finally {
    setLoading(false)
    form.reset()
  }
}

  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm 
        handleFormSubmit={handleFormSubmit} 
        uploadImg={uploadImg}
        setUploadImg={setUploadImg}
        loading={loading}
        // setLoading={setLoading}
      />
    </div>
  )
}

export default AddPlant
