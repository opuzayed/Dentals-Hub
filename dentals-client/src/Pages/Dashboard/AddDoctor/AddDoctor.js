import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Shared/Spinner/Spinner';

const AddDoctor = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const imageHostKey = process.env.REACT_APP_imgbb_key;
      console.log('imageHostKey', imageHostKey);
      const navigate = useNavigate();

      const { data: specialties, isLoading } = useQuery({
        queryKey: ["specialty"],
        queryFn: async () => {
          const res = await fetch(
            "http://localhost:5000/appointmentSpecialty"
          );
          const data = await res.json();
          return data;
        },
      });

      const handleAddDoctor = (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgData) => {
            if (imgData.success) {
              console.log(imgData.data.url);
              const doctor = {
                name: data.name,
                email: data.email,
                specialty: data.specialty,
                image: imgData.data.url,
              };
              fetch("http://localhost:5000/doctors", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  authorization: `bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(doctor),
              })
                .then((res) => res.json())
                .then((result) => {
                  console.log(result);
                  toast.success(`${data.name} is added successfully`);
                  navigate("/dashboard/managedoctors");
                });
            }
          });
      };
    
      if (isLoading) {
        return <Spinner></Spinner>;
      }

    return (
        <div className="w-96 p-7">
        <h2 className="text-4xl">Add A Doctor</h2>
        <form onSubmit={handleSubmit(handleAddDoctor)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text dark:text-white">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs dark:text-black"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text dark:text-white">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
              })}
              className="input input-bordered w-full max-w-xs dark:text-black"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text dark:text-white">Specialty</span>
            </label>
            <select
              {...register("specialty")}
              className="select input-bordered w-full max-w-xs dark:text-black "
            >
              {specialties.map((specialty) => (
                <option key={specialty._id} value={specialty.name}>
                  {specialty.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className="label-text dark:text-white">Photo</span>
            </label>
            <input
              type="file"
              {...register("image", {
                required: "Photo is Required",
              })}
              className="input input-bordered w-full max-w-xs dark:text-black"
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
  
          <input
            className="btn btn-accent w-full mt-4"
            value="Add Doctor"
            type="submit"
          />
        </form>
      </div>
    );
};

export default AddDoctor;