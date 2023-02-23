import React from "react";
import axios from "axios";
import { useFormInputValidation } from "react-form-input-validation";


export const Form = () => {

    const [fields, errors, form] = useFormInputValidation({
        name: '',
        dob: '',
        className: '',
        division: '',
        gender: ''
    }, {
        name: 'required',
        dob: 'required',
        className: 'required',
        division: 'required',
        gender: 'required'
    });


    function postUser(user) {
        const postData = axios.post('http://localhost:8080/api/forms/new-user', user)
            .then(response => {
                return response;
            })
            .catch(err => {
                return err;
            });
        return postData;
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        const isValid = await form.validate(e);
        if (isValid) {
            console.log('valid');
            // Perform api call here
            // console.log(fields.dob)
            postUser(fields)
                .then(data => {
                    // exectue certain events on result
                    console.log(data);
                    alert("You have sucessfully submitted the data, Please reload to see the new data")
                })
                .catch(err => {
                    // -----    -----
                    console.log(err);
                });
        }
        console.log(fields, errors);

    };


    return (
        <>
            <div className="components">
                <form noValidate autoComplete="off" onSubmit={onSubmit}>
                    <h1>Student form</h1>
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" onChange={form.handleChangeEvent} onBlur={form.handleBlurEvent} placeholder="Enter your name" />
                        <span className="error redColor">
                            {errors.name
                                ? errors.name
                                : ""}
                        </span>
                    </div>
                    <div>
                        <label>Date of Birth</label>
                        <input type="date" name="dob" onChange={form.handleChangeEvent} placeholder="yyyy/mm/dd" />
                        <span className="error redColor">
                            {errors.dob
                                ? errors.dob
                                : ""}
                        </span>
                    </div>
                    <div>
                        <label>Class</label>
                        <select name="className" onChange={form.handleChangeEvent}>
                            <option>Select your class</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                            <option value="III">III</option>
                            <option value="IV">IV</option>
                            <option value="V">V</option>
                            <option value="V1">V1</option>
                            <option value="V11">V11</option>
                            <option value="V111">V111</option>
                            <option value="1X">1X</option>
                            <option value="X">X</option>
                            <option value="X11">X11</option>
                            <option value="X12">X12</option>
                        </select>
                        <span className="error redColor">
                            {errors.className
                                ? errors.className
                                : ""}
                        </span>
                    </div>
                    <div>
                        <label>Division</label>
                        <select name="division" onChange={form.handleChangeEvent}>
                            <option></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                        <span className="error redColor">
                            {errors.division
                                ? errors.division
                                : ""}
                        </span>
                    </div>
                    <div>
                        <label>Gender</label>
                        <select name="gender" onChange={form.handleChangeEvent}>
                            <option></option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <span className="error redColor">
                            {errors.gender
                                ? errors.gender
                                : ""}
                        </span>
                    </div>
                    <div className="align-center">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};