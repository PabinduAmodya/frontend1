import "./loging.css";

export default function LoginPage() {
    return (
        <div className="login-container">
            <h1>Login Page</h1>
            <input type="text" placeholder="Enter your name" />
            <input type="password" placeholder="Enter your password" />
            <button className='bg-yellow-500 p-8' >Login</button>
            <button className='bg-yellow-500 m-8' >Login</button>
        </div>
    );
}
