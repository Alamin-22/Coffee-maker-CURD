import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const User2 = () => {


    const { isPending, isError, error, data: users } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/user")
            return res.json();
        }
    })





    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:5000/user")
    //         .then(res => res.json())
    //         .then(data => {
    //             setUsers(data)
    //         })
    // }, [])


    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/user/${id}`, {
                    method: "DELETE",
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            console.log("DeletedSuccessfully");
                            // remove the user from UI
                            const remainingUser = users.filter(user => user._id !== id);
                            setUsers(remainingUser);
                            Swal.fire({ title: 'Done', text: "Deleted Successfully!", icon: 'success', })
                        }
                    })
            }
        })
    }


    if (isPending) {
        return <span className="loading loading-ring loading-lg"></span>
    } else if(isError){
       return  Swal.fire({ title: 'Error', text: `${error.message}`, icon: 'error', })
    }


    return (
        <div>
            {/* <h1>CReated User Length: {loadedUser.length}</h1> */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Created Time</th>
                                <th>Last Logged In</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                users.map(user => <tr key={user._id} className="bg-base-200">
                                    <th></th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.createdAt}</td>
                                    <td>{user.LastLoggedAt}</td>
                                    <td onClick={() => handleDelete(user._id)} className="btn">X</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default User2;