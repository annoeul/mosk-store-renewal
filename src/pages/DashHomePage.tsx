import Product from "../components/Product"
import Category from "../components/Category"
import Header from "../components/Header"

function DashHomePage() {
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <Category />
        <Product />
      </div>
    </>
  )
}

export default DashHomePage
