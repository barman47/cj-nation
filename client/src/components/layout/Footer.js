import React from 'react'

const Footer = () => (
    <footer className="page-footer">
        <div className="row">
            <div className="col l6 s12">
                <h5 className="white-text">About CJ Nation</h5>
                <p className="grey-text text-lighten-4">Cj Nation Entertainment is an Entertainment Industry which Major fundamental goal is promoting and shaping of talents in and out Nasarawa State, event management overseeing them and also marketing of events, brands and products. CJ Nation keeps you updated with entertainment news and also happenings around various campus around the country and beyond.</p>
            </div>
            <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Connect with us via</h5>
                <ul>
                    <li><a href="https://www.youtube.com/channel/UClIlIdnYdrceCQzvCsEWfsA?view_as=subscriber" target="_blank"><span className="mdi mdi-youtube mdi-48px"></span></a></li>
                    <li><a href="https://facebook.com/@cj.nation.entertainment" target="_blank"><span className="mdi mdi-facebook-box mdi-48px"></span></a></li>
                    <li><a href="https://instagram.com/carljohnsonnation?igshid=x9px38rjuf4j" target="_blank"><span className="mdi mdi-instagram mdi-48px"></span></a></li>
                </ul>
            </div>
        </div>
        <div className="footer-copyright">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} CJ Nation Entertainment</p>
                <a className="grey-text text-lighten-4 right domstech" href="https://domstech.com">Powered by Domstech</a>
            </div>
        </div>
    </footer>
);

export default Footer;