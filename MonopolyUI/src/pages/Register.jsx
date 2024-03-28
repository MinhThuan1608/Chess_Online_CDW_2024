import React, { useState } from 'react';
import '../assert/style/register.css';
import { RegisterAPI } from '../api_caller/authenticate';


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;

    const register = async () => {
        if (validateEmail() && validatePassword() && validateRePassword()) {
            const response = await RegisterAPI(email, password, confirmPassword);
            if (response.id) {
                window.location = '/create-character';
            } else {
                const errorMessage = document.querySelector('#error-message');
                errorMessage.innerHTML = response;
                errorMessage.style.display = "block";
            }
        }
    }

    const validateEmail = () => {
        const emailInput = document.querySelector('#email')
        const errorEmail = document.querySelector('#error-email')
        if (!email) {
            errorEmail.innerHTML = 'Email không được bỏ trống';
            errorEmail.style.display = 'block';
            emailInput.classList.add('error');
            return false;
        } else if (!emailRegex.test(email)) {
            errorEmail.innerHTML = 'Email không hợp lệ';
            errorEmail.style.display = 'block';
            emailInput.classList.add('error');
            return false;
        } else {
            errorEmail.style.display = 'none';
            emailInput.classList.remove('error');
            return true;
        }
    }

    const validatePassword = () => {
        const passwordInput = document.querySelector('#password')
        const errorPassword = document.querySelector('#error-password')
        if (!password) {
            errorPassword.innerHTML = 'Password không được bỏ trống';
            errorPassword.style.display = 'block';
            passwordInput.classList.add('error');
            return false;
        } else if (password.length < 8) {
            errorPassword.innerHTML = 'Password phải có ít nhất 8 ký tự';
            errorPassword.style.display = 'block';
            passwordInput.classList.add('error');
            return false;
        } else {
            errorPassword.style.display = 'none';
            passwordInput.classList.remove('error');
            return true;
        }
    }

    const validateRePassword = () => {
        const rePasswordInput = document.querySelector('#re-password')
        const errorRePassword = document.querySelector('#error-re-password')
        if (!confirmPassword) {
            errorRePassword.innerHTML = 'Password không được bỏ trống';
            errorRePassword.style.display = 'block';
            rePasswordInput.classList.add('error');
            return false;
        } else if (confirmPassword !== password) {
            errorRePassword.innerHTML = 'Nhập lại phải giống mật khẩu';
            errorRePassword.style.display = 'block';
            rePasswordInput.classList.add('error');
            return false;
        } else {
            errorRePassword.style.display = 'none';
            rePasswordInput.classList.remove('error');
            return true;
        }
    }

    return (
        <div class="main-container-login">
            <div class="left-container">
                <div class="title-container">
                    <h1 class="title">♛ CỜ VUA ♛</h1>
                </div>
            </div>
            <div class="right-container">
                <div class="form-container">
                    <div class="form-bounder">
                        <p class="form-title">Đăng ký</p>
                        <input type="email" class="input-text" name="email" id="email" placeholder="Email"
                            onChange={(event) => setEmail(event.target.value)} onBlur={validateEmail} />
                        <p className="error-message" id="error-email"></p>
                        <input type="password" class="input-text" name="password" id="password" placeholder="Mật khẩu"
                            onChange={(event) => setPassword(event.target.value)} onBlur={validatePassword} />
                        <p className="error-message" id="error-password"></p>
                        <input type="password" class="input-text" name="rePassword" id="re-password" placeholder="Nhập lại mật khẩu"
                            onChange={(event) => setConfirmPassword(event.target.value)} onBlur={validateRePassword} />
                        <p className="error-message" id="error-re-password"></p>
                        <p id="error-message"></p>
                        <div class="button-container">
                            <a href="/login"><button id="register" class="button" form="">Trở lại</button></a>
                            <input type="submit" class="button" id="submit" value="Đăng ký" onClick={register}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Register;