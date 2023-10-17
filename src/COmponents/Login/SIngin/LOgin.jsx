import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";

const LOgin = () => {
    const { LoginUser } = useContext(AuthContext);
    // console.log(LoginUser)
    const [showPassword, setShowPassword] = useState(false)




    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        // login user
        LoginUser(email, password)
            .then(res => {
                console.log(res.user);
                const user = {
                    email,
                    LastLoggedAt: res.user?.metadata?.lastSignInTime
                    // Update last login
                }
                fetch('https://coffee-server-ccv7ypnby-alamins-projects-a414811e.vercel.app/user', {
                    method: "PATCH",
                    headers: {
                        "content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        Swal.fire('Good job!', 'User Login Successfully!', 'success')
                    })
            })
            .catch(error => {
                console.log(error);
                Swal.fire('Something wrong!', `${error.message.slice(10, 50)}`, 'error')
            })
    }





    return (
        <div >
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password" placeholder="password" className="input input-bordered w-full" required />
                                    <span className="absolute right-10 top-[136px] cursor-pointer" onClick={() => { setShowPassword(!showPassword) }} >
                                        {
                                            showPassword ? <AiFillEye className="text-2xl " /> : <AiFillEyeInvisible className="text-2xl " />
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                            <p className="text-center">Do not have an account? <Link to={"/register"} className="font-semibold text-blue-600 underline" >Register</Link> </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LOgin;