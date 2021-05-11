import {Button, Modal, Form, Input, message} from "antd";
import * as icons from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {ISigninUser, ISignupUser} from "../types/user";

export interface ISigninButtonProps {
    visible?: boolean;
    onSignin?: (user: ISigninUser) => string | void;
    onSignup?: (user: ISignupUser) => string | void;
    signinResult?: "success" | "error";
    signupResult?: "success" | "error";
    error?: string;
}

export function SigninButton({visible = true, onSignin = () => {}, onSignup = () => {},
                                 signinResult, signupResult, error}: ISigninButtonProps) {
    const [isSigninModalVisible, setIsSigninModalVisible] = useState<boolean>(false);
    const [isSignupModalVisible, setIsSignupModalVisible] = useState<boolean>(false);

    useEffect(() => {
        if (signinResult === "error" && error) message.error(error);
        if (signinResult === "success") setIsSigninModalVisible(false);
    }, [signinResult, error]);

    useEffect(() => {
        if (signupResult === "error" && error) message.error(error);
        if (signupResult === "success") {
            setIsSignupModalVisible(false);
            setIsSigninModalVisible(true);
        }
    }, [signupResult, error]);

    const onClick = () => {
        setIsSigninModalVisible(true);
    };

    const onSigninCancelClick = () => {
        setIsSigninModalVisible(false);
    };

    const onSigninFinishHandler = ({email, password}: any) => {
        onSignin({email, password});
    };

    const onSignupClick = () => {
        setIsSigninModalVisible(false);
        setIsSignupModalVisible(true);
    };

    const onSigninClick = () => {
        setIsSignupModalVisible(false);
        setIsSigninModalVisible(true);
    };

    const onSignupCancelClick = () => {
        setIsSignupModalVisible(false);
    };

    const onSignupFinishHandler = ({email, password, passwordConfirm}: any) => {
        onSignup({email, password});
    };

    return (
        <div style={{display: visible ? 'inline-block' : 'none'}}>
            <Button size='large' icon={<icons.LoginOutlined/>} onClick={onClick}>
                Войти
            </Button>
            <Modal title="Вход пользователя" visible={isSigninModalVisible}
                   onCancel={onSigninCancelClick} footer={null}>
                <Form
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onSigninFinishHandler}
                    onFinishFailed={() => {}}>
                    <Form.Item
                        name="email"
                        rules={[
                            {required: true, message: 'Пожалуйста, введите адрес электронной почты!'},
                            {type: 'email', message: 'Проверьте правильность электронной почты!'}
                        ]}>
                        <Input size="large" placeholder="Электронная почта" prefix={<icons.MailOutlined />} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {required: true, message: 'Пожалуйста, введите пароль!'},
                            {min: 8, message: 'Длина пароля должна составлдять не менее 8 символов!'}
                        ]}
                        hasFeedback>
                        <Input.Password size="large" placeholder="Пароль" prefix={<icons.LockOutlined />}/>
                    </Form.Item>

                    <Form.Item style={{margin: '1rem 0 0 0'}}>
                        <Button size='large' type="primary" htmlType="submit" block>
                            Войти
                        </Button>
                        <Button  type='default' onClick={onSignupClick} block
                                style={{margin: '0.5rem 0 0 0'}}>
                            Регистрация
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Регистрация пользователя" visible={isSignupModalVisible}
                   onCancel={onSignupCancelClick} footer={null}>
                <Form
                    name="basic"
                    onFinish={onSignupFinishHandler}
                    onFinishFailed={() => {}}>
                    <Form.Item
                        name="email"
                        rules={[
                            {required: true, message: 'Пожалуйста, введите адрес электронной почты!'},
                            {type: 'email', message: 'Проверьте правильность электронной почты!'}
                        ]}>
                        <Input size="large" placeholder="Электронная почта" prefix={<icons.MailOutlined />} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {required: true, message: 'Пожалуйста, введите пароль!'},
                            {min: 8, message: 'Длина пароля должна составлдять не менее 8 символов!'}
                        ]}
                        hasFeedback>
                        <Input.Password size="large" placeholder="Пароль" prefix={<icons.LockOutlined />}/>
                    </Form.Item>

                    <Form.Item
                        name="passwordConfirm"
                        dependencies={['password']}
                        rules={[
                            {required: true, message: 'Пожалуйста, подтвержите пароль!'},
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают!'));
                                },
                            }),
                        ]}
                        hasFeedback>
                        <Input.Password size="large" placeholder="Повтор пароля" prefix={<icons.LockOutlined />}/>
                    </Form.Item>

                    <Form.Item style={{margin: '1rem 0 0 0'}}>
                        <Button size='large' type="primary" htmlType="submit" block>
                            Зарегистрироваться
                        </Button>
                        <Button type='default' onClick={onSigninClick} block
                                 style={{margin: '0.5rem 0 0 0'}}>
                            Вход
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};