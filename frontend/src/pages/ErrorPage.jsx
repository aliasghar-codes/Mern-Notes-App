import React from 'react'
import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <>
            <main className="flex h-screen w-full flex-col justify-center items-center bg-slate-700 text-white">
                <h1 className="text-2xl">Uh-Oh..</h1>
                <p>Page not found</p>
                <h2 className="text-9xl my-6">404</h2>
                <Link to="/" className='py-3 px-6 bg-slate-300 rounded-sm text-black'>Go to home page</Link>
            </main>
        </>
    )
}

export default ErrorPage