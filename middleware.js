/**
 * This middleware redirects reset-password requests from the API domain 
 * to the frontend application domain.
 */

import { NextResponse } from 'next/server'

export function middleware(request) {
  const url = request.nextUrl.clone()
  
  // If someone accesses reset-password with query params, redirect to frontend
  if (url.pathname === '/reset-password' && url.searchParams.has('email') && url.searchParams.has('token')) {
    // Create frontend URL
    const frontendUrl = new URL(url.pathname, process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3001')
    frontendUrl.search = url.search // Copy all query parameters
    
    console.log('Redirecting reset-password from API to frontend:', frontendUrl.toString())
    
    return NextResponse.redirect(frontendUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/reset-password'
}
