import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const {register, formState: { errors }, handleSubmit} = useForm();

    const handleLogin = data => {
        console.log(data);
    }
    
    return (
        <div className='h-[800px] shadow-2xl flex justify-center items-center'>
            <div className='w-96 p-7 shadow-2xl'>
                <h2 className='text-4xl mb-5 text-center font-medium'>Please Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Email</span></label>
                    <input type="email" {...register("email", { required: "Email Address is required" })} className="input input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-error text-center'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text">Password</span></label>
                    <input type="password" {...register("password",
                    { required: "Password is required",
                    minLength:{ value: 6, message: "Password must be at least six characters" },
                    maxLength:{ value: 10, message: "Password maximum ten characters" } 
                }
                    
                    // { maxLength: { value: 10, message: "Password maximum ten characters" } }
                    )} className="input input-bordered w-full max-w-xs" />
                    {errors.password && <p className='text-error text-center'>{errors.password?.message}</p>}
                </div>
                <input className='btn btn-accent w-full mt-5' type="submit" value="Login" />
                </form>
                <p className='text-center'>New to Dental Point? <Link className='text-secondary' to='/signup'>Create a new account</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;