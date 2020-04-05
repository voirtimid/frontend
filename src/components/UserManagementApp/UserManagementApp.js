import React, {useState} from "react";
import LoginForm from "./LoginForm/LoginForm";
import UserService from "../../service/UserService";
import EmployeeService from "../../service/EmployeeService";

const UserManagementApp = (props) => {

    const [shouldRegister, setShouldRegister] = useState(false);

    const handleRegisterSubmit = (userDTO) => {
        const registerDTO = {
            email: userDTO.email,
            password: userDTO.password,
            role: userDTO.role
        };
        UserService.createNewUser(registerDTO).then(response => {
            const newUser = response.data;
            const tempEmployee = {
                firstName: userDTO.firstName,
                lastName: userDTO.lastName
            };
            const employeeDTO = {
                employee: tempEmployee,
                userId: newUser.userId
            };

            EmployeeService.createEmployeeWithUser(employeeDTO).then(response => {

            }).catch(reason => {
                alert(reason);
            });
            props.login(newUser);
        }).catch(reason => {
            alert(reason);
        });
    };

    const handleLoginSubmit = (userDTO) => {
        UserService.validateUser(userDTO).then(response => {
            props.login(response.data);
        }).catch(reason => {
            alert(reason);
        });
    };


    // const renderPage = () => {
    //     if (shouldRegister) {
    //         return <RegisterForm onRegister={handleRegisterSubmit()} />;
    //     } else {
    //         return <LoginForm onLogin={handleLoginSubmit()}/>;
    //     }
    // };

    const textToShow = () => {
        if (shouldRegister) {
            return "Already have an account. Click here to login!";
        } else {
            return "Don't have an account. Please click here to register!";
        }
    };

    const changePageStatus = () => setShouldRegister(!shouldRegister);

    return (
        <div className="container">
            <div className="card m-lg-5">
                <div className="card-body">
                    <h4 className="card-title">MetalCut Login page!</h4>
                    {/*{renderPage()}*/}
                    <LoginForm onLogin={handleLoginSubmit} onRegister={handleRegisterSubmit} shouldRegister={shouldRegister}/>

                    <button type="button"
                            onClick={() => changePageStatus()}
                            className="btn-link">{textToShow()}</button>
                </div>
            </div>
        </div>
    );

};

export default UserManagementApp;
