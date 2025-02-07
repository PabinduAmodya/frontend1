import { Link } from "react-router-dom";
import "./home.css";

export default function HomePage() {
    return (
        <div className="home-container">
            <header>
                <h2>Welcome to Our Website</h2>
                <p>Your one-stop solution for all services.</p>
            </header>

            <Link to="/login">login</Link>

            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>

            <section className="content">
                <h2>Our Services</h2>
                <p>We offer a wide range of services to cater to your needs.</p>
                <button className="btn">Learn More</button>
            </section>

            <footer>
                <p>© 2025 Our Website. All rights reserved.</p>
            </footer>
        </div>
    );
}
