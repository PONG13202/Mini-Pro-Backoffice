import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import config from "../config";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [img, setImg] = useState(null);

    useEffect(() => {
        fetchData();
    },[]);
    
const fetchData = async () => {
    try {
        const res = await axios.get(config.apiPath + '/user/info', config.headers());
        if (res.data.result) {
            setUser(res.data.result);
        }
    } catch (e) {
        Swal.fire({
            title: 'Error',
            text: e.message,
            icon: 'error'
        }).then(() => {
            navigate('/', { replace: true });
        });
    }
};

    const handleSignOut = async () => {
        const button = await Swal.fire({
            title: 'Logout',
            text: 'Are you sure you want to log out?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        });

        if (button.isConfirmed) {
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    const selectedFile = (inputFile) => {
        if (inputFile && inputFile.length > 0) {
            setImg(inputFile[0]);
        }
    }

    const handleUpload = async () => {
     
        if (!img) {
            Swal.fire({
                title: 'Error',
                text: 'Please select an image to upload.',
                icon: 'error'
            });
            return;
        }

        const confirmation = await Swal.fire({
            title: 'Confirm Upload',
            text: 'Are you sure you want to upload this image?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, upload it!',
            cancelButtonText: 'No, cancel!'
        });

        if (confirmation.isConfirmed) {
            const formData = new FormData();
            formData.append('myFile', img); 
            formData.append('userId', user.Id); 

            try {
                const res = await axios.post(config.apiPath + '/user/ProfileUpload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': localStorage.getItem('token')
                    }
                });

                Swal.fire({
                    title: 'Success',
                    text: res.data.message,
                    icon: 'success'
                });
                fetchData(); 
            } catch (e) {
                Swal.fire({
                    title: 'Error',
                    text: e.message,
                    icon: 'error'
                });
            }
        }
    };



    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="index3.html" className="brand-link">
                <img 
                    src="dist/img/AdminLTELogo.png" 
                    alt="AdminLTE Logo" 
                    className="brand-image img-circle elevation-3" 
                    style={{ opacity: '.8' }} 
                />
                <span className="brand-text font-weight-light">BackOffice</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
  <img
    src={user?.Profile_Image
      ? user.Profile_Image.startsWith('http')
        ? user.Profile_Image 
        : `data:image/jpeg;base64,${user.Profile_Image}` 
      : '/path/to/default-image.png'} 
    className="img-circle elevation-2"
    alt="User Image"
  />
</div>
                    <div className="info">
                        <a href="#" className="d-block">Admin {user.First_Name}</a>
                        <button onClick={handleSignOut} className="btn btn-danger">
                            <i className="fa fa-times mr-2"></i> Sign Out
                        </button>
                    </div>
                </div>
                <div className="upload-button mb-3">
                    <label htmlFor="file-upload" className="btn btn-primary">
                        Upload Image
                    </label>
                    
                    <input 
                        id="file-upload" 
                        type="file" 
                        style={{ display: 'none' }} 
                        onChange={e => selectedFile(e.target.files)} />
                        <button className="btn btn-success"  style={{ margin:'0 0 9px 2px' }}  onClick={handleUpload}>
                    Submit
                </button>
                </div>
                
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-header">Menu</li>
                        <li className="nav-item">
                            <Link to="/usermanage" className="nav-link">
                                <i className="nav-icon fas fa-columns"></i>
                                <p>User Management</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/content" className="nav-link">
                                <i className="nav-icon fa fa-box"></i>
                                <p>Content<span className="badge badge-info right">2</span></p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/reviewsmanage" className="nav-link">
                                <i className="nav-icon fa fa-list"></i>
                                <p>การรีวิว</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;