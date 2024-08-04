import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product";
import { useRouter } from "next/router";

export default function Product() {
  const {query} = useRouter()

  return (
    <ProductContainer>
      <ImageContainer>
        
      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi natus corrupti officiis non esse libero tempore doloremque dicta? Voluptatum at officia impedit hic tenetur cum et obcaecati excepturi mollitia.</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}