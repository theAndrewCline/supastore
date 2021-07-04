import { writable } from 'svelte/store'
import { makeCart } from './cart/cart'

export const cart = writable(makeCart({ user_id: '' }))
