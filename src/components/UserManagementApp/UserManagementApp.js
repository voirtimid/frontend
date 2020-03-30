import React, {useState} from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LoginForm/LoginForm";

const UserManagementApp = (props) => {

    const [shouldRegister, setShouldRegister] = useState(false);

    const handleRegisterSubmit = (userDTO) => {

    };

    const handleLoginSubmit = (userDTO) => {

    };


    const renderPage = () => {
        if (shouldRegister) {
            return <RegisterForm onRegister={handleRegisterSubmit()} />;
        } else {
            return <LoginForm onLogin={handleLoginSubmit()}/>;
        }
    };

    const textToShow = () => {
        if (shouldRegister) {
            return "Already have an account. Please Login!";
        } else {
            return "Do not have an account. Please click here to register!";
        }
    };

    const changePageStatus = () => setShouldRegister(!shouldRegister);

    return (
        <div className="container">
            <div className="card m-lg-5">
                <div className="card-body">
                    <h4 className="card-title">MetalCut Login page!</h4>
                    {renderPage()}

                    <button type="button"
                            onClick={() => changePageStatus()}
                            className="btn-link">{textToShow()}</button>
                </div>
            </div>
        </div>
    );

};

export default UserManagementApp;