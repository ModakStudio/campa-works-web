import Header from '../Header/Header'
import Sidebar from '../Sidebar/sidebar';
import './Layout.css';
import { Outlet } from 'react-router-dom';

export default function Layout({userRole})
{
    return(
        <div className='baseLayout'>
            <Header />
            <div className="bodyLayout">
                <Sidebar userRole={userRole} />
                <main className='mainContent'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
