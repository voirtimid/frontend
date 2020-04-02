import React, {Fragment} from "react";
import "./Footer.css"

const Footer = (props) => {

    return (
        <footer className="footer">
            <div className="footer-copyright text-center">
                MetalCut &copy; - 2020 <a href="http://metalkat.mk" target="_blank">Official website</a>
            </div>
        </footer>
    );
};

export default Footer;
