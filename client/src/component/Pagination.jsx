import React from 'react'

export const Pagination = ({ value, onChange, totalPage }) => {
    return (
    <>
        <div className='flex gap-2 mb-10 mt-5'>
            <p><i className='fa fa-angle-left bg-blue-700 text-white px-3 py-1 rounded'></i></p>
            {Array.from({ length: totalPage }, (_, index) => (
                <button
                    key={index}
                    onClick={() => onChange(index + 1)}
                    className={value === index + 1 ? 'active' : ''}
                >
                    <p className={`bg-blue-700 px-3 text-white rounded`}> {index + 1}</p>
                </button>
            ))}
            <p><i className='fa fa-angle-right bg-blue-700 text-white px-3 py-1 rounded'></i></p>
        </div>
        
        </>
    )
}
