import React from 'react'

const LoadingSkeleton = () => {
    return (
        <>
            <div className="flex gap-4 items-center mx-4">
                <div className="skeleton w-16 h-16 rounded-full shrink-0 bg-gray-300"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-3 w-20 bg-gray-300"></div>
                    <div className="skeleton h-3 w-28 bg-gray-300"></div>
                </div>
            </div>
            <div className="flex gap-4 justify-end items-center mx-4">
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-3 w-20 bg-gray-300"></div>
                    <div className="skeleton h-3 w-28 bg-gray-300"></div>
                </div>
                <div className="skeleton w-16 h-16 rounded-full shrink-0 bg-gray-300"></div>
            </div>
            <div className="flex gap-4 items-center mx-4">
                <div className="skeleton w-16 h-16 rounded-full shrink-0 bg-gray-300"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-3 w-20 bg-gray-300"></div>
                    <div className="skeleton h-3 w-28 bg-gray-300"></div>
                </div>
            </div>
        </>
    )
}

export default LoadingSkeleton
