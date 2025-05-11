import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productslide';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
  
  useEffect(() => {
    (async () => {
      
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/product`);
        const resData = await res.json();
        console.log(resData);
        dispatch(setDataProduct(resData));
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      
    })();
  }, [dispatch]);
  console.log(productData)
  return (
    <div>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Header />
      <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
        <Outlet />
      </main>
    </div>
  );
}

export default App;