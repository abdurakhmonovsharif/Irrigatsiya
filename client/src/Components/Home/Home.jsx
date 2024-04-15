import React, { Suspense } from 'react';
import './scss/Home.scss'
import { Outlet } from 'react-router-dom';
import Loading from '../Loading/Loading';
import DynamicMetaTags from '../../context/DynamicMetaTags';
const Header = React.lazy(() => import('../Header/Header'));
const Footer = React.lazy(() => import('../Footer/Footer'));
const Home = () => {
    return (
        <div className='home'>
            <DynamicMetaTags pageTitle={"Tiiamebb.uz"} pageDescription={"TIQXMMI milliy tadqiqotlar universiteti Buxoro tabiiy resurslarni boshqarish instituti"} />
            <Suspense fallback={<Loading />}>
                <Header />
            </Suspense>
            <Outlet />
            <Suspense fallback={<Loading />}>
                <Footer />
            </Suspense>
        </div>
    );
}

export default Home;
