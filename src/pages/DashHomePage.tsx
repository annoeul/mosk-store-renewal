import Header from "../components/Header"
import { useLocation } from "react-router-dom"
import ProductListPage from "./ProductListPage"
import BasicSpeedDial from "../components/CreateBtn"
import CategoryList from "./CategoryList"

function DashHomePage() {
  const location = useLocation()
  // const { storeId } = location.state || {}
  const { storeId } = location.state

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <CategoryList storeId={storeId} />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", height: "300px" }}>
          <ProductListPage storeId={storeId} />
        </div>
      </div>
      <BasicSpeedDial />
    </>
  )
}

export default DashHomePage
