import { Link,Route,Routes } from "react-router-dom";
import Header from "../header";
import LoginPage from "./loging";
import ProductOverview from "./home/productOverview";

export default function HomePage() {
    return (
       <div className="h-[50px] w-full">

        <Header/>
        <div className="w-full h-[calc(100vh-80px)] bg-amber-600">
        <Routes path="/*">
          <Route path="/" element={<h1>Home Page</h1>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/productInfo/:id" element={<ProductOverview/>} />
        </Routes>
        </div>
         

       </div>
      
    )
}
