import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import CallPage from './pages/CallPage'
import OnBoardingPage from './pages/OnBoardingPage'
import ChatPage from './pages/ChatPage'
import NotificationPage from './pages/NotificationPage'
import { Toaster } from 'react-hot-toast'
import PageLoading from './component/pageLoading'
import useAuthUser from './hooks/useAuthUser'
import Layout from './component/Layout'
function App() {
  // const [data,setData] = useState([]);
  // const [isLoading,setIsLoading] = useState(false);
  // const [error,setError] = useState(null);

  // useEffect(()=>{
  //   const getData = async () => {
  //     setIsLoading(true);
  //     try{
  //       const data = await fetch("https://jsonplaceholder.typicode.com/todos");
  //       const json =  await data.json();
  //       setData(json);
  //     }
  //     catch(error){
  //       setError(error)
  //     }finally{
  //       setIsLoading(false);
  //     }
  //   }

  //   getData();
  // },[])


  // const {data,isLoading,error} = useQuery({queryKey:["todos"],
  //   queryFn: async()=>{
  //     const res = await fetch("https://jsonplaceholder.typicode.com/todos")
  //     const data = await res.json()
  //     return data;
  //   }
  // })


  const {isLoading,authUser} =  useAuthUser();

  const isAuthenticated = Boolean(authUser)
  const isOnBoarded = authUser?.isOnboarded

  if (isLoading) {
    return (
      <PageLoading />
    )

  }
  return (
    <div className='bg-gray-700 w-[calc(100vw-20px)] min-h-screen'>
      <Routes>
        <Route path='/' element={isAuthenticated && isOnBoarded ? (
          <Layout>
            <HomePage/>
          </Layout>
        ) : (
        <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )}></Route>
         <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnBoarded? "/" : "/onboarding"} />
          }
        />
        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}></Route>
        <Route path='/call' element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}></Route>
        <Route path='/chat' element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}></Route>
        <Route path='/onboarding' element={
          isAuthenticated 
            ? (!isOnBoarded ? <OnBoardingPage /> : <Navigate to="/" />)
            : <Navigate to="/login" />
        }></Route>
        <Route path='/notifications' element={isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />}></Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
