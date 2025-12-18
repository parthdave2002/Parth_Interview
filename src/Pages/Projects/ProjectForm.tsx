import React from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { Form } from "reactstrap";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch } from '../../store/hooks'
// import { createProjectThunk, updateProjectThunk } from '../../store/slice/project/project-slice'
import Inputbox from '../../components/common/input/Inputbox'

type FormValues = {
  ref: string
  name: string
  password: string
  email: string
  terms?: boolean
}

  const initialValues: FormValues = {
    ref: '',
    name: '',
    password: '',
    email:'',
    terms: false,
  }

const ProjectForm: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,

    validationSchema: Yup.object({
      ref: Yup.string().required('Reference number is required').min(12, 'Reference number must be atleast 12 characters').max(16, 'Reference number must be at most 16 characters'),
      name: Yup.string().required('Project name is required').max(25, 'Project name must be at most 25 characters'),
      projectNumber: Yup.string().required('Project number is required').min(10, 'Reference number must be atleast 10 characters').max(10, 'Project number must be at most 10 characters'),
      area: Yup.string().required('Area location is required').max(20, 'Area location must be at most 20 characters'),
      address: Yup.string().required('Address is required').max(50, 'Address must be at most 50 characters'),
      dueDate: Yup.date().required('Due date is required'),
      contact: Yup.string().required('Contact is required').min(10, 'Contact must be 10 characters').max(10, 'Contact must be 10 characters'),
      manager: Yup.string().required('Project manager is required').max(15, 'Project manager must be 15 characters'),
      staff: Yup.string().required('Staff is required').max(25, 'Staff must be at most 25 characters'),
      status: Yup.string().required('Status is required').max(10, 'Status must be at most 10 characters'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
    }),

    onSubmit: (values) => {
      // if (id) {
      //   dispatch(updateProjectThunk(values))
      // } else {
      //   dispatch(createProjectThunk(values))
      // }
      console.log("Form Values", values);
    },

    // navigate('/projects')
  });

  const Closecall = () => {
    navigate('/projects')
  }

  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-4">{id ? 'Edit' : ' Add New'} Project</h1>
      <Form onSubmit={validation.handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-xl shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Inputbox  id="name" name="name" label="Customer"  required={true} placeholder="Enter project type" type="text" validation={validation} />
          <Inputbox  id="ref" name="ref"  label="Reference Number"  required={true} placeholder="Enter reference number" type="text" validation={validation} />
          <Inputbox  id="name" name="name" label="Project Name"  required={true} placeholder="Enter project name" type="text" validation={validation} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Inputbox id="projectNumber" name="projectNumber" label="Project Number" required={true} placeholder="Enter your project number" type="text" validation={validation} />
          <Inputbox id="area" name="area" label="Area Location" required={true} placeholder="Enter your project area location" type="text" validation={validation} />
          <Inputbox id="address" name="address" label="Address" required={true} placeholder="Enter your project address" type="text" validation={validation} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Inputbox id="dueDate" name="dueDate" label="Due Date" required={true} placeholder="Select due date" type="date" validation={validation} />
          <Inputbox id="contact" name="contact" label="Contact" required={true} placeholder="Enter your contact" type="text" validation={validation} />
          <Inputbox id="manager" name="manager" label="Manager" required={true} placeholder="Select project manager" type="text" validation={validation} />
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          <Inputbox id="staff" name="staff" label="Staff" required={true} placeholder="Select project staff" type="text" validation={validation} />
          <Inputbox id="status" name="status" label="Status" required={true} placeholder="Enter your contact" type="text" validation={validation} />
          <Inputbox id="email" name="email" label="Email" required={true} placeholder="Select project manager" type="text" validation={validation} />
        </div>
        
        <div className="flex justify-end gap-4 mt-6">
          <button type='submit' className="bg-blue-600 hover:bg-blue-700  text-white  px-4 py-3 rounded-xl w-[10rem] cursor-pointer" >{id ? 'Update' : ' Add '} Now</button>
          <button className="bg-gray-100 border border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white px-4 py-3 rounded-xl w-[10rem] cursor-pointer" onClick={Closecall}> Cancel </button>
        </div>
      </Form>
    </div>
  )
}

export default ProjectForm