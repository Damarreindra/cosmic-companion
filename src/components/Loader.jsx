import React from 'react'

function Loader() {
    return (
        <div class="flex justify-center items-center">
            <svg class="animate-spin h-12 w-12 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="63" stroke-dashoffset="62" class="opacity-25" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-linecap="round" class="opacity-75" />
            </svg>
        </div>
    )
}

export default Loader