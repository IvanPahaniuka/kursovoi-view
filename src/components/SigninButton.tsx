import {Button, Modal, Row, Col, Form, Input, message} from "antd";
import * as icons from "@ant-design/icons";
import React, {useState} from "react";

const categoryButtonStyle = {
    width: '100%',
    textAlign: 'start' as const
};

export interface ISigninButtonProps {
    visible?: boolean;
    onSignin?: (email: string, password: string) => string | void;
    onSignup?: (email: string, password: string) => string | void;
}

export function SigninButton({visible = true, onSignin = () => {}, onSignup = () => {}}: ISigninButtonProps) {
    const [isSigninModalVisible, setIsSigninModalVisible] = useState(false);
    const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);

    const onClick = () => {
        setIsSigninModalVisible(true);
    };

    const onSigninCancelClick = () => {
        setIsSigninModalVisible(false);
    };

    const onSigninFinishHandler = ({email, password}: any) => {
        let errorText = onSignin(email, password);
        if (errorText) {
            message.error(errorText);
            return;
        }

        setIsSigninModalVisible(false);
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
        let errorText = onSignup(email, password);
        if (errorText) {
            message.error(errorText);
            return;
        }

        setIsSignupModalVisible(false);
        setIsSigninModalVisible(true);
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