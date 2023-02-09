import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import Spinner from '../../Shared/Spinner/Spinner';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const {
        data: doctors,
        isLoading,
        refetch,
      } = useQuery({
        queryKey: ["doctors"],
        queryFn: async () => {
          try {
            const res = await fetch(
              "http://localhost:5000/doctors",
              {
                headers: {
                  authorization: `bearer ${localStorage.getItem("accessToken")}`,
                },
              }
            );
            const data = await res.json();
            return data;
          } catch (error) {}
        },
      });

      const handleDeleteDoctor = (doctor) => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              toast.success(`Doctor ${doctor.name} deleted successfully`);
            }
          });
      };
    
      if (isLoading) {
        return <Spinner></Spinner>;
      }
    return (
        <div className="rounded-md ">
      <div className="p-12">
        <h3 className="text-3xl pb-5">Manage Doctors: {doctors?.length}</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="dark:text-black">
                <th></th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Specialty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors?.map((doctor, i) => (
                <tr className="hover dark:text-black" key={i}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        <img src={doctor.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{doctor.name}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.specialty}</td>
                  <td>
                    <label
                      onClick={() => setDeletingDoctor(doctor)}
                      htmlFor="confirmation-modal"
                      className="btn btn-xs btn-error">
                      Delete
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {deletingDoctor && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingDoctor.name}. It cannot be undone.`}
          successAction={handleDeleteDoctor}
          modalData={deletingDoctor}
          successButtonName="Delete"
        ></ConfirmationModal>
      )}
    </div>
    );
};

export default ManageDoctors;