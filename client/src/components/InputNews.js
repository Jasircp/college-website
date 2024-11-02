import React, { Fragment, useState } from "react";
import ListNews from "./ListNews";

const InputNews = () => {
    const [description, setDescription] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            await fetch("http://localhost:5000/news", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            // Clear inputs after submission
            setDescription("");
            // Optionally redirect or fetch news again
            window.location = "/editnews"; // Redirect to homepage or news list
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">Input News Here</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <textarea
                    className="form-control me-2"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-primary">Add News</button>
            </form>
            <ListNews />
        </Fragment>
    );
};

export default InputNews;
