import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const User = () => {
    const loadedUser = useLoaderData();
    const [users, setUsers] = useState(loadedUser);


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
                fetch(`https://coffee-server-ccv7ypnby-alamins-projects-a414811e.vercel.app/user/${id}`, {
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

    return (
        <div>
            <h1>CReated User Length: {loadedUser.length}</h1>
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

export default User;