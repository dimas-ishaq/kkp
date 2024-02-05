import React from 'react'
import Navbar from '../components/Navbar'
import FaqDashboard from '../components/FaqDashboard'
import Footer from '../components/Footer'

const Faq = () => {
    return (
        <><div className="flex flex-col w-full h-full">
            <Navbar />
            <div className="w-full h-full py-20">
                <FaqDashboard />
            </div>
            <Footer />
        </div>
        </>
    )
}

export default Faq