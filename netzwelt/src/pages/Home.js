import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faFacebook, faGithub, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Banner from '../components/Banner';

export default function Home() {
    const bannerData = {
        title: 'Welcome to netzwelt!',
        content: 'We build cutting edge, next-generation software!',
        destination: '/login',
        label: 'Login to our Website',
    };

    return (
        <>
            <Banner data={bannerData} />
            <Container>
            <div id="contact" className="row justify-content-center mb-5">
                        <div className="col-12 text-center">
                            <a href="https://www.linkedin.com" target="_blank">
                                <FontAwesomeIcon icon={faLinkedinIn} />
                            </a>
                            <a href="https://www.facebook.com" target="_blank">
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a href="https://github.com/" target="_blank">
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <a href="https://www.twitter.com" target="_blank">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="https://www.instagram.com" target="_blank">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
            </div>            
            </Container>
            <footer className="bg-dark text-light text-center pt-1">
                <div className="container">
                    <div className="col">
                        <p>
                            {new Date().getFullYear()} All Rights Reserved.
                        </p>
                        <p>
                            Made by JEHV
                        </p>
                    </div>
                </div>
            </footer>
            </>
    );
}