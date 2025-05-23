import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import PricingPlans from '../../components/Pricingplans';
import { Outlet } from 'react-router';
// import { Layout } from 'lucide-react';

const Home = () => {
    return (
        <div>
            {/* <Navbar/>
            <Outlet/> */}
            <Hero/>
            <PricingPlans/>
        </div>
    );
};

export default Home;