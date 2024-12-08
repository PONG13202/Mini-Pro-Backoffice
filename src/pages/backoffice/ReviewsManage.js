import React, { useState, useEffect } from "react";
import BackOffice from "../../components/BackOffice";
import axios from 'axios';
import config from "../../config";
import Swal from 'sweetalert2';
import $ from 'jquery';
import 'datatables.net';

function ReviewsManage() {
    const [userReview, setUserReview] = useState([]);

    useEffect(() => {
        fetchData(); // เรียก fetchData เพื่อดึงข้อมูลเมื่อ component mount
    }, []);

    useEffect(() => {
        // เรียก DataTable เมื่อ userReview มีข้อมูล
        if (userReview.length > 0) {
            $('#reviewsTable').DataTable(); // เริ่มต้น DataTable
        }
    }, [userReview]); // ทำงานเมื่อ userReview เปลี่ยนแปลง

    const fetchData = async () => {
        try {
            const reviewRes = await axios.get(`${config.apiPath}/content/getreview`);
            if (reviewRes.data && reviewRes.data.results) {
                setUserReview(reviewRes.data.results); // อัปเดต userReview ด้วยข้อมูลที่ดึงมา
            } else {
                setUserReview([]); // ถ้าไม่มีข้อมูล ให้ตั้งเป็น array ว่าง
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Failed to fetch reviews.', // แสดง SweetAlert ถ้าดึงข้อมูลไม่สำเร็จ
                icon: 'error',
            });
        }
    };

    const handleDeleteReview = async (reviewId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${config.apiPath}/content/delReview`, {
                    data: { reviewId } // ส่ง reviewId ใน body ของ request
                });
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Review deleted successfully.', // แสดงข้อความเมื่อรีวิวถูกลบสำเร็จ
                    icon: 'success',
                });
                fetchData(); // รีเฟรชข้อมูลหลังจากลบ
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to delete review.', // แสดง SweetAlert ถ้าลบไม่สำเร็จ
                    icon: 'error',
                });
            }
        }
    };

    return (
        <BackOffice>
            <div className="reviews-manage">
                <h2>Reviews Management</h2>
                {userReview.length > 0 ? (
                    <table id="reviewsTable" className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Comment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userReview.map((review) => (
                                <tr key={review.id}>
                                    <td>{review.id}</td>
                                    <td>{review.user.First_Name} {review.user.Last_Name}</td>
                                    <td>{review.comment}</td>
                                    <td>
                                        <button 
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteReview(review.id)} // เรียก handleDeleteReview เมื่อกดปุ่ม
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading user reviews...</p> // แสดงข้อความเมื่อกำลังโหลดข้อมูล
                )}
            </div>
        </BackOffice>
    );
}

export default ReviewsManage;
