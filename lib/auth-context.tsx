'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  addresses: Address[]
  createdAt: string
}

export interface Address {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  register: (email: string, password: string, name: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  addAddress: (address: Address) => void
  updateAddress: (id: string, address: Partial<Address>) => void
  deleteAddress: (id: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('nut8bites-user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error('Failed to load user:', e)
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading && user) {
      localStorage.setItem('nut8bites-user', JSON.stringify(user))
    }
  }, [user, isLoading])

  const register = async (email: string, password: string, name: string) => {
    // Simulate registration - In real app, this would call backend
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      name,
      email,
      addresses: [],
      createdAt: new Date().toISOString(),
    }

    // Store password hash in localStorage (only for demo - never do this in production)
    const users = JSON.parse(localStorage.getItem('nut8bites-users') || '[]')
    users.push({ email, passwordHash: password })
    localStorage.setItem('nut8bites-users', JSON.stringify(users))

    setUser(newUser)
  }

  const login = async (email: string, password: string) => {
    // Simulate login - In real app, this would call backend
    const users = JSON.parse(localStorage.getItem('nut8bites-users') || '[]')
    const user = users.find((u: any) => u.email === email && u.passwordHash === password)

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const currentUser: User = {
      id: Math.random().toString(36).substring(2, 11),
      name: email.split('@')[0],
      email,
      addresses: [],
      createdAt: new Date().toISOString(),
    }

    setUser(currentUser)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('nut8bites-user')
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data }
      setUser(updated)
    }
  }

  const addAddress = (address: Address) => {
    if (user) {
      setUser({
        ...user,
        addresses: [...user.addresses, address],
      })
    }
  }

  const updateAddress = (id: string, addressData: Partial<Address>) => {
    if (user) {
      setUser({
        ...user,
        addresses: user.addresses.map((addr) =>
          addr.id === id ? { ...addr, ...addressData } : addr
        ),
      })
    }
  }

  const deleteAddress = (id: string) => {
    if (user) {
      setUser({
        ...user,
        addresses: user.addresses.filter((addr) => addr.id !== id),
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        register,
        login,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
