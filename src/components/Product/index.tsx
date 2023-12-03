import axios from "axios"
import React, { useEffect, useState } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { Box, Container } from "@mui/material"

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    price: string
  }
}

function Product({ product }: ProductProps): JSX.Element {
  const [imageURL, setImageURL] = useState<string | null>(null)

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/public/products/img/${product.id}`)
        const imageData = response.data.data

        if (imageData.encodedImg && imageData.imgType) {
          const dataURL = `data:image/${imageData.imgType};base64,${imageData.encodedImg}`
          setImageURL(dataURL)
        }
      } catch (error) {
        console.error("Error fetching image data:", error)
      }
    }

    fetchImageData()
  }, [product.id])

  return (
    <Container>
      <Card style={{ height: "45%" }}>
        <CardMedia
          component="img"
          height="200"
          style={{ objectFit: "contain" }}
          image={imageURL || "placeholder_image_url"}
          alt="Product"
        />
        <CardContent>
          <Typography variant="h5" component="div" style={{ textAlign: "center" }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.price}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Product
