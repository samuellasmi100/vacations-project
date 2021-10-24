import banner from '../../images/banner.png';
import { Link } from 'react-router-dom';
import './Home.css';


export const Home = () => {
    return (
        <section>
            <div className="banner">
                <div className="banner-text">
                    <h1>
                        TRAVEL MORE TO DISCOVER YOURSELF
                    </h1>
                    <p>
                        Far far away, behind the word mountains, far from the countries
                        Vokalia and Consonantia, there live the blind texts. Separated they
                        live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                    </p>
                    <Link to="/register" className="btn">Register</Link>
                </div>
                <div className="banner-img">
                    <img src={banner} alt="" />
                </div>
            </div>
        </section>
    )
}
