import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import ControlSidebar from './ControlSidebar';
import UserManager from '../pages/backoffice/UserManage';
import Content from '../pages/backoffice/Content';

function BackOffice(props) {
    return<>
        <div className='wrapper'>
            <Navbar />
            <Sidebar />

            <div className='content-wrapper p-2'>
                {props.children}
            </div>
            
            <footer />
            <ControlSidebar />
        </div>
    
    </>
}
export default BackOffice;