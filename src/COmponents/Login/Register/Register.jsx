import { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
    const [showPassword, setShowPassword] = useState(null)
    const { CreateUser } = useContext(AuthContext);

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);


        // create User
        CreateUser(email, password)
            .then(result => {
                console.log(result.user)

                const createdAt = result.user?.metadata?.creationTime;

                // backend
                const user = { name, email, password, createdAt: createdAt }

                // using Axiox
                axios.post("http://localhost:5000/user", user)
                    .then(data => {
                        console.log(data.data);
                        if (data.data.insertedId) {
                            Swal.fire('Good job!', 'User Created Successfully!', 'success')
                        }
                    })




                // using fetch method
                // fetch("http://localhost:5000/user", {
                //     method: "POST",
                //     headers: {
                //         "content-type": "application/json",
                //     },
                //     body: JSON.stringify(user)
                // })
                //     .then(res => res.json())
                //     .then(data => {
                //         if (data.insertedId) {
                //             Swal.fire('Good job!', 'User Created Successfully!', 'success')
                //         }
                //     })
            })
            .catch(error => {
                Swal.fire({ title: 'Sorry!', text: `${error.message.slice(10, 60)}`, icon: 'error', })
                console.log(error)
            })


    }
    return (
        <div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-3xl font-semibold text-center mt-5">Register Now!!</h1>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password" placeholder="password" className="input input-bordered w-full" required />
                                <span className="absolute right-10 top-80 cursor-pointer" onClick={() => { setShowPassword(!showPassword) }} >
                                    {
                                        showPassword ? <AiFillEye className="text-2xl " /> : <AiFillEyeInvisible className="text-2xl " />
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                        <p className="text-center">Already have an account? <Link to={"/login"} className="font-semibold text-blue-600 underline" >LogIn</Link> </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
