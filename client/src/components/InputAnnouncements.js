import React, { Fragment, useState } from "react";
import ListAnnouncements from "./ListAnnouncements"; // Update this import if needed

const InputAnnouncements = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            await fetch("http://localhost:5000/announcements", { // Update endpoint
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            // Clear inputs after submission
            setDescription("");
            // Optionally redirect or fetch announcements again
            window.location = "/editannouncements"; // Update to the correct route
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5 text-2xl font-bold">Input Announcements Here</h1>
            <form className="flex mt-5" onSubmit={onSubmitForm}>
                <textarea
                    className="border border-gray-300 rounded-lg p-2 w-full me-2"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Add Announcement
                </button>
            </form>
            <ListAnnouncements /> {/* Update this component if needed */}
        </Fragment>
    );
};

export default InputAnnouncements;
