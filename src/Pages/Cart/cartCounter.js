import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function CartCounter() {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch()

  return (
    <div>cart Counter<h1>{cart[0].qty}</h1></div>
  )
}
