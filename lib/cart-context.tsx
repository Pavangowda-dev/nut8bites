'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from './data'

export interface CartItem {
  product: Product
  quantity: number
  selectedPack: string
  selectedPrice: number
}

interface CartContextType {
  cart: CartItem[]
  cartItems: CartItem[]
  wishlist: Product[]
  addToCart: (product: Product, quantity: number, selectedPack?: string) => void
  removeFromCart: (productId: string, selectedPack?: string) => void
  updateQuantity: (productId: string, quantity: number, selectedPack?: string) => void
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearCart: () => void
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('nut8bites-cart')
    const savedWishlist = localStorage.getItem('nut8bites-wishlist')

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to load cart:', e)
      }
    }

    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist))
      } catch (e) {
        console.error('Failed to load wishlist:', e)
      }
    }

    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nut8bites-cart', JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('nut8bites-wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, isLoaded])

  const addToCart = (
    product: Product,
    quantity: number,
    selectedPack = product.packSizes[0]
  ) => {
    const selectedPrice = product.prices[selectedPack]

    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedPack === selectedPack
      )

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id &&
          item.selectedPack === selectedPack
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [
        ...prevCart,
        {
          product,
          quantity,
          selectedPack,
          selectedPrice,
        },
      ]
    })
  }

  const removeFromCart = (productId: string, selectedPack?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (!selectedPack || item.selectedPack === selectedPack)
          )
      )
    )
  }

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedPack?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedPack)
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product.id === productId &&
          (!selectedPack || item.selectedPack === selectedPack)
            ? { ...item, quantity }
            : item
        )
      )
    }
  }

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.find((item) => item.id === product.id)) {
        return [...prevWishlist, product]
      }
      return prevWishlist
    })
  }

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    )
  }

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId)
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.selectedPrice * item.quantity,
      0
    )
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems: cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}