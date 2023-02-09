import { GoogleAuthProvider } from 'firebase/auth';
import { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
//import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const Login = () => {
    const {register, formState: { errors }, handleSubmit} = useForm();
    //setForgetPassword
    const {signIn, providerLogin, setLoading} = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const [clientEmail, setClientEmail] = useState(''); 
    const [token] = useToken(clientEmail);
    //console.log('client Email', clientEmail);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    
    if(token)
    {
        navigate(from, {to:'/'}, { replace: true });
    }

    const googleProvider = new GoogleAuthProvider();
 
    const handleLogin = data => {
        setLoginError('');
        signIn(data.email, data.password)
        .then(result => {
            const user = result.user;
        console.log(user.email);
            setClientEmail(data.email);

            // if(user.emailVerified)
            // {
            //     navigate(from, {to:'/'}, { replace: true });
            // }
            // else
            // {
            //     toast.error('Your email is not verified.Please verify your email');
            // }
                
            })
            .catch((error) => 
            {
                setLoginError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const handleGoogleSignIn = () => {
        setLoginError('');
        providerLogin(googleProvider)
        .then((result) => {
            const user = result.user;
            navigate(from, {to:'/'}, { replace: true });
          })
          .catch((error) => {
            console.log(error);
            setLoginError(error.message);
          });
    }

    // const onBlur = (event) =>
    // {
    //     const email = event.target.value;
    //     setClientEmail(email);
    //     console.log(email);
        
    // }

    // const handleForgetPassword = () => 
    // {
    //     if(!clientEmail)
    //     {
    //         toast('Please enter your valid email.');
    //         return;
    //     }
    //     setForgetPassword(clientEmail)
    //     .then(() => {
    //         toast.success('Password reset email is send.Please check your inbox or spam folder of your email');
    //     })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    // }
    
    
    return (
        <div className='h-[800px] shadow-2xl flex justify-center items-center'>
            <div className='w-96 p-7 shadow-2xl'>
                <h2 className='text-4xl mb-5 text-center font-medium'>Log<span className='font-bold'>in</span></h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text text-xl font-medium">Email</span></label>
                    {/* onBlur={onBlur}  */}
                    <input type="email" {...register("email", { required: "Email Address is required"})} className="input dark:text-black input-bordered w-full max-w-xs" />
                    {errors.email && <p className='text-error text-center'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text text-xl font-medium">Password</span></label>
                    <input type="password" {...register("password",{required: "Password is required"})} className="input dark:text-black input-bordered w-full max-w-xs" />
                    {errors.password && <p className='text-error text-center'>{errors.password?.message}</p>}
                    <span><button className="btn btn-link no-underline">Forgot Password?</button></span>
                    {/* onClick={handleForgetPassword} */}
                </div>
                <input className='btn btn-accent w-full mt-5 text-xl font-medium' type="submit" value="Login" />
                <div>
                    {loginError && <p className='text-error text-center'>Your email or password is wrong</p>}
                </div>
                </form>
                <p className='text-center'>New to Dental Point? <Link className='text-secondary' to='/signup'>Create a new account</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full text-xl font-medium'>CONTINUE WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;