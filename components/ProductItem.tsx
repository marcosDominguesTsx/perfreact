import dynamic from "next/dynamic";
import { memo, useState } from "react";
import { AddProductToWishlistProps } from "./AddProductToWishlist";
import lodash from "lodash";
// dinamix para next e lazy para react

const AddProductWishList = dynamic<AddProductToWishlistProps>(
  () => {
    return import("./AddProductToWishlist").then(
      (mod) => mod.AddProductToWishlist
    );
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    title: string;
    price: number;
    priceFormatted: string;
  };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductWishList
          onAddToWishlist={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);

ProductItem.displayName = "ProductItem";

/*
Onde irei utilizar o memo?

1. Pure Funnctional Components 
2. Renders too often
3. Re-renders with same props
4. Medium to big size

*/
