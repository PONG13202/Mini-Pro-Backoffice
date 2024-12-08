import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BackOffice from "../../components/BackOffice";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import 'datatables.net';

function UserManage() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/user/all', config.headers());
            if (res.data.result) {
                setUsers(res.data.result);
            }
        } catch (e) {
            Swal.fire({
                title: 'Error',
                text: e.message,
                icon: 'error'
            }).then(() => {
                navigate('/home', { replace: true });
            });
        }
    };
    const updateStatus = async (userId, newStatus) => {
        try {
            const res = await axios.put(config.apiPath + '/user/update', { userId, newStatus }, config.headers());
            if (res.data.result) {
                fetchData(); // Refresh the user data after update
                Swal.fire({
                    title: 'Success',
                    text: 'User status updated successfully!',
                    icon: 'success'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error'
            });
            fetchData();
        }
    };
    const handleStatusChange = (userId, currentStatus, newStatus) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to change the status from ${currentStatus} to ${newStatus}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatus(userId, newStatus);
            } else {
                // Optionally handle cancel action
                console.log('Status change canceled.');
            }
        });fetchData();
    };

    useEffect(() => {
        if (users.length > 0) {
            $('#myTable').DataTable();
        }
    }, [users]);

    return (
        <BackOffice>
            <div className="user-manage">
                <h2>User Management</h2>
                {users.length > 0 ? (
                    <table id="myTable" className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Profile Image</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.Id}>
                                    <td>{user.Id}</td>
                                    <td>{user.User_Name}</td>
                                    <td>{user.First_Name}</td>
                                    <td>{user.Last_Name || 'N/A'}</td>
                                    <td>{user.Email || 'N/A'}</td>
                                    <td>
                                        <img 
                                            src={user.Profile_Image 
                                                ? (user.Profile_Image.startsWith('http') 
                                                    ? user.Profile_Image 
                                                    : `data:image/jpeg;base64,${user.Profile_Image}`)
                                                : '/path/to/default-image.png'} 
                                            alt="Profile"
                                            className="img-thumbnail"
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    </td>
                                    <td>
                                        {user.Status === 'user' ? (
                                            <select 
                                                defaultValue={user.Status} 
                                                onChange={(e) => handleStatusChange(user.Id, user.Status, e.target.value)}
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        ) : (
                                            <span>{user.Status}</span> 
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading user data...</p> 
                )}
            </div>
        </BackOffice>
    );
}

export default UserManage;
