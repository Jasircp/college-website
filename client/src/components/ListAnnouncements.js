import React, { Fragment, useEffect, useState } from "react";
import EditAnnouncements from "./EditAnnouncements"; // Update import if needed

const ListAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);

    const deleteAnnouncement = async (id) => {
        try {
            await fetch(`http://localhost:5000/announcements/${id}`, {
                method: "DELETE",
            });

            // Update the state to remove the deleted announcement
            setAnnouncements(announcements.filter(article => article.id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    const getAnnouncements = async () => {
        try {
            const response = await fetch("http://localhost:5000/announcements-id"); // Update endpoint
            const jsonData = await response.json();
            console.log(jsonData);
            setAnnouncements(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getAnnouncements();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center mt-5 text-3xl font-bold">Announcements List</h1>
            <table className="min-w-full mt-5 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Edit</th>
                        <th className="border px-4 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {announcements.map(article => (
                        <tr key={article.id} className="border-b hover:bg-gray-100">
                            <td className="border px-4 py-2">{article.description}</td>
                            <td className="border px-4 py-2">
                                <EditAnnouncements article={article} /> {/* Update if needed */}
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200"
                                    onClick={() => deleteAnnouncement(article.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListAnnouncements;
