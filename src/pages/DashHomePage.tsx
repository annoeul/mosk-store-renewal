import Product from "../components/Product"
import Category from "../components/Category"
import Header from "../components/Header"
import { useLocation } from "react-router-dom"
import ProductListPage from "./ProductListPage"

function DashHomePage() {
  const location = useLocation()
  // const { storeId } = location.state || {}
  const { storeId } = location.state

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Category storeId={storeId} />
        <ProductListPage storeId={storeId} />
      </div>
    </>
  )
}

export default DashHomePage
