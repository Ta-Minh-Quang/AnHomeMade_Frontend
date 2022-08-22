import { Fragment,lazy,Lazy,Suspense } from "react";
import Banner from "./Components/banner/Banner";
import { Route, Routes } from "react-router-dom";
import Main from "./Components/Header/Main";
import HomePage from "./page/HomePage";
// import ProductPage from "./page/ProductPage";
import Form from "./Components/Admin/Login/Login";
import Manage from "./Components/Admin/Manage/Manage"
// import ProductsDetail from "./page/ProductsDetail";
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { useState } from "react";
import Protected from "./Protected";
// import ProductsBox from "./Components/Admin/Manage/Products/ProductsBox";
// import CategoryBox from "./Components/Admin/Manage/Categories/CategoryBox";
// import MainAdmin from "./Components/Admin/MainAdmin";

const ProductPage = lazy(()=> import("./page/ProductPage"))
const ProductsDetail = lazy(()=> import("./page/ProductsDetail"))
const MainAdmin = lazy(()=> import("./Components/Admin/MainAdmin"))
const ProductsBox = lazy(()=> import("./Components/Admin/Manage/Products/ProductsBox"))
const CategoryBox = lazy(()=> import("./Components/Admin/Manage/Categories/CategoryBox"))
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  return (
    <div className="App">
    <Suspense fallback>
      <Routes>
        {/* Nguoi dung */}
          <Route element={<Main></Main>}>
            <Route exact path="/" element={<><Banner></Banner><HomePage></HomePage></>}></Route>
            <Route path="/products" element={<ProductPage></ProductPage>}></Route>
            <Route path="/products/:productId" element={<ProductsDetail></ProductsDetail>}></Route>
          </Route>
          {/* admin */}
          <Route path="/Admin/login" element={<Form setisLoggedIn={setisLoggedIn}></Form>}></Route>
          <Route element={<Protected isLoggedIn={isLoggedIn}><Manage></Manage></Protected>}>
            <Route path="/Admin/home" element={<MainAdmin></MainAdmin>}></Route>
            <Route path="/Admin/products" element={<ProductsBox></ProductsBox>}></Route>
            <Route path="/Admin/category" element={<CategoryBox></CategoryBox>}></Route>
          </Route> 
      </Routes>
    </Suspense>
    

       
    </div>
  );
}

export default App;
