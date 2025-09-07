import Card from './Card'
import Container from '../Shared/Container'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import LoadingSpinner from '../Shared/loadingSpinner'
const Plants = () => {

  const { data: plants = [], isLoading } = useQuery({
  queryKey: ['plants'],
  queryFn: async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/plants`)
    return res.data   // 👈 return the array directly
  }
})


  if(isLoading){
    return <LoadingSpinner/>
  }

  return (
  <Container>
    {plants.length === 0 ? (
      <div className='text-center text-3xl font-semibold my-20'>
        No Plants Available
      </div>
    ) : (
      <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {plants.map(plant => (
          <Card key={plant._id} plant={plant} />
        ))}
      </div>
    )}
  </Container>
)

}

export default Plants
