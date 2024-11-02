import React, { Fragment, useEffect, useState } from "react";
import EditNews from "./EditNews";

const ListNews = () => {
    const [news, setNews] = useState([]);

    const deleteNews = async (id) => {
        try {
            await fetch(`http://localhost:5000/news/${id}`, {
                method: "DELETE",
            });

            // Update the state to remove the deleted news article
            setNews(news.filter(article => article.id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    const getNews = async () => {
        try {
            const response = await fetch("http://localhost:5000/news-id");
            const jsonData = await response.json();
            setNews(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getNews();
    }, []);

    return (
        <Fragment>
            <h1 className="text-center mt-5 text-3xl font-bold">News List</h1>
            <table className="min-w-full mt-5 border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Edit</th>
                        <th className="border px-4 py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map(article => (
                        <tr key={article.id} className="border-b hover:bg-gray-100">
                            <td className="border px-4 py-2">{article.description}</td>
                            <td className="border px-4 py-2">
                                <EditNews article={article} />
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200"
                                    onClick={() => deleteNews(article.id)}
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

export default ListNews;
