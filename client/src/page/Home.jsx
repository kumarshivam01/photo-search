import React, { useState, useEffect } from 'react'
import { Pagination } from '../component/Pagination'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [data, setData] = useState()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(9)
  const [totalPage, setTotalPages] = useState()
  const navigate = useNavigate()
  // fetch search api
  const fetchData = async () => {
    setOpen(true);
    try {
      const response = await fetch(
        `/api/v1/api/items?search=${search}&page=${currentPage}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setData(data.items);
      setTotalPages(data.totalPages);
      setOpen(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setOpen(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, [currentPage, search,limit])

  // loader control
  const [open, setOpen] = React.useState(false);
  return (
    <div className="main">
      <div className="px-4 sm:px-8 lg:px-16 xl:px-20 mx-auto">
        <div className="hero">
          {/* <!-- hero headline --> */}
          <div className="hero-headline flex flex-col items-center justify-center pt-24 text-center">
            <h1 className=" font-bold text-3xl text-gray-900">Stunning free images & royalty free stock</h1>
            <p className=" font-base text-base text-gray-600">high quality stock images  shared by our shivam community. <button onClick={() => { navigate('/image/upload') }} className="border border-gray-600 text-gray700 font-bold py-1 px-4 rounded">
              Upload new Photos
            </button></p>
          </div>
          
          {/* <!-- image search box --> */}
          <div className="box pt-6">
            <div className="box-wrapper">
              <div className=" bg-white rounded flex items-center w-full p-3 shadow-sm border border-gray-200">
                <button className="outline-none focus:outline-none"></button>
                <input value={search} onChange={(e) => { setSearch(e.target.value) }} type="search" name="" id="" placeholder="Search image through title, keyword" x-model="q" className="w-full pl-4 text-sm outline-none focus:outline-none bg-transparent" />
              </div>
            </div>
          </div>

          <select name="" id="" value={limit} onChange={(e)=>{setLimit(e.target.value)}} className='border border-gray-700 w-[300px] mt-5 px-2 py-1 outline-none'>
            <option >-- Show Result in Per Page --</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          
          <section className="my-5 grid grid-cols-1 md:grid-cols-4 gap-4">
            {
              data && data.map((e) => {
                  const time = new Date(e.date)
                  
                return (
                  <div key={e._id} className='border border-gray-500 p-2'>
                    <img loading="lazy" className="w-full h-64 object-cover" src={`http://localhost:8080/api/v1/gallery/${e.image}`} alt={e.title} />
                    <p className='text-center text-2xl mt-2 capitalize'>{e.title}</p>
                    <p className='text-center text-gray-500 capitalize text-[13px]'>{e.description}</p>
                    <p className='text-end text-gray-800 capitalize text-[12px] mt-3'>{`Uploaded Time:- ${time.getHours()} : ${time.getMinutes()} : ${time.getSeconds()}`}</p>
                  </div>
                )
              })
            }
          </section>
          {
            totalPage == 0 && <>
              <div className='h-[50vh] align-bottom'>
                <p className='text-center text-5xl'>Result Not Found</p>
              </div>
            </>
          }
          <div className='w-[100%] m-auto'><Pagination value={currentPage} onChange={setCurrentPage} totalPage={totalPage} /></div>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Home