import axios from "axios"
import React, { useEffect, useState } from "react"

function Product({ filteredData }) {
  const [imageURLs, setImageURLs] = useState([])

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const imagePromises = filteredData.products.map(async (product) => {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/public/products/img/${product.id}`)
          const imageData = response.data.data

          if (imageData.encodedImg && imageData.imgType) {
            const dataURL = `data:image/${imageData.imgType};base64,${imageData.encodedImg}`
            return dataURL
          } else {
            return null
          }
        })
        const imageURLArray = await Promise.all(imagePromises)
        setImageURLs(imageURLArray)
      } catch (error) {
        console.error("Error fetching image data:", error)
      }
    }
    fetchImageData()
  }, [filteredData.products])

  return (
    <div style={{ backgroundColor: "beige", width: "100%" }}>
      <div>
        <h1>{filteredData.name}</h1>
        {filteredData.products.length > 0 ? (
          filteredData.products.map((product, index) => (
            <div key={product.id}>
              <img src={imageURLs[index]} alt="Product" style={{ maxWidth: "100%" }} />
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
          ))
        ) : (
          <p>상품이 없습니다.</p>
        )}
      </div>
    </div>
  )
}

export default Product
