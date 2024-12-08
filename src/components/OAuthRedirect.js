// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// function OAuthRedirect() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get('token'); // Token sent from backend

//     if (token) {
//       // Validate the token before storing it
//       validateToken(token)
//         .then((isValid) => {
//           if (isValid) {
//             // Store the token in a secure cookie
//             setSecureCookie('token', token);
//             Swal.fire({
//               title: 'Login Successful',
//               text: 'Welcome back!',
//               icon: 'success',
//               timer: 2000,
//               showConfirmButton: false,
//             }).then(() => {
//               navigate('/home', { replace: true });
//             });
//           } else {
//             Swal.fire({
//               title: 'Error',
//               text: 'Invalid token. Please try again.',
//               icon: 'error',
//             }).then(() => {
//               navigate('/');
//             });
//           }
//         })
//         .catch((error) => {
//           Swal.fire({
//             title: 'Error',
//             text: 'Error validating token. Please try again.',
//             icon: 'error',
//           }).then(() => {
//             navigate('/');
//           });
//         });
//     } else {
//       Swal.fire({
//         title: 'Error',
//         text: 'Login failed. Please try again.',
//         icon: 'error',
//       }).then(() => {
//         navigate('/');
//       });
//     }
//   }, [navigate]);

//   return <div>Redirecting... Please wait.</div>; // Show a message while redirecting
// }

// // Function to validate the token
// function validateToken(token) {
//   // Implement token validation logic here
//   // Return a promise that resolves to true if the token is valid, false otherwise
// }

// // Function to set a secure cookie
// function setSecureCookie(name, value) {
//   // Implement secure cookie setting logic here
//   // Use the httpOnly and secure flags to set a secure cookie
// }

// export default OAuthRedirect;