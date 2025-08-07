'use client'
import React, { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { steamCallback } from '../utils/steam'
import { setTokens } from '../../lib/auth'
import toast, { Toaster } from 'react-hot-toast'

function SteamCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Steam callback dan kelgan parametrlarni olish
        const params = new URLSearchParams(window.location.search)
        const steamData = {}
        
        // Steam OpenID parametrlarini collect qilish
        for (const [key, value] of params.entries()) {
          steamData[key] = value
        }

        if (Object.keys(steamData).length === 0) {
          toast.error('Steam login da xatolik yuz berdi!')
          router.push('/login')
          return
        }

        // Backend ga Steam ma'lumotlarini yuborish
        const result = await steamCallback(steamData)
        
        if (result && result.access && result.refresh) {
          setTokens(result.access, result.refresh)
          toast.success('Steam orqali muvaffaqiyatli login qildingiz!')
          router.push('/user-dashboard')
        } else {
          toast.error('Steam login da xatolik yuz berdi!')
          router.push('/login')
        }
      } catch (error) {
        console.error('Steam callback error:', error)
        toast.error('Steam login da xatolik yuz berdi!')
        router.push('/login')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Toaster position="top-right" />
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">Steam orqali login qilinmoqda...</h2>
        <p className="text-gray-400">Iltimos kutib turing...</p>
      </div>
    </div>
  )
}

export default function SteamCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Yuklanmoqda...</h2>
          <p className="text-gray-400">Iltimos kutib turing...</p>
        </div>
      </div>
    }>
      <SteamCallbackContent />
    </Suspense>
  )
}
