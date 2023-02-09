import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const AllUsers = () => {
    const [deletingUser, setDeletingUser] = useState(null);

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await fetch("http://localhost:5000/users");
          const data = await res.json();
          return data;
        },
      });
      const handleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
          method: "PUT",
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              toast.success("Admin made successfully.");
              refetch();
            }
          });
      };
      const handleDeleteDoctor = (user) => {
        fetch(`http://localhost:5000/users/${user._id}`, {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              toast.success(`User ${user.name} deleted successfully`);
            }
          });
      };
    return (
        <div className="rounded-md ">
      <div className="p-12">
        <h3 className="text-4xl pb-5">All Users : {users?.length}</h3>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="dark:text-black">
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, i) => (
                <tr className="hover dark:text-black" key={i}>
                  <th>{i + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user?.role !== "admin" && (
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="btn btn-xs btn-primary"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td>
                    <label
                      onClick={() => setDeletingUser(user)}
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
      {deletingUser && (
        <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingUser.name}. It cannot be undone.`}
          successAction={handleDeleteDoctor}
          modalData={deletingUser}
          successButtonName="Delete"
        ></ConfirmationModal>
      )}
    </div>
    );
};

export default AllUsers;