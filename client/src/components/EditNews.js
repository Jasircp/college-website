import React, { Fragment, useState, useEffect } from "react";

const EditNews = ({ article }) => {
    const [description, setDescription] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Use useEffect to set description when article changes
    useEffect(() => {
        if (article) {
            setDescription(article.description);
        }
    }, [article]);

    const updateDescription = async (e) => {
        e.preventDefault();
        if (!article) return; // Prevent updating if article is not defined
        try {
            const body = { description };
            await fetch(`http://localhost:5000/news/${article.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            setIsOpen(false); // Close modal after update
            window.location.reload(); // Refresh the page to see the updated news
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Fragment>
            <button
                type="button"
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                onClick={() => setIsOpen(true)}
            >
                Edit
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-96">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h4 className="text-lg font-bold">Edit News</h4>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setIsOpen(false)}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="p-4">
                            <input
                                type="text"
                                className="border rounded-lg p-2 w-full"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="p-4 border-t flex justify-end">
                            <button
                                type="button"
                                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                                onClick={updateDescription}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default EditNews;
