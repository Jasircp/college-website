import React, { Fragment, useState, useEffect } from "react";
import cseLogo from './cse.png';
import { Link } from "react-router-dom";
import ImageCarousel from "./carousel";

const DeptPage = () => {
    const [news, setNews] = useState([]);
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('http://localhost:5000/news'); // Replace with your actual API endpoint for news
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNews(data);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        const fetchAnnouncements = async () => {
            try {
                const response = await fetch('http://localhost:5000/announcements'); // Replace with your actual API endpoint for announcements
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnnouncements(data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchNews();
        fetchAnnouncements();
    }, []);

    return (
        <Fragment>
            <nav className="mycolor">
                <div className="container mx-auto flex flex-wrap space-x-4 py-2">
                    <div className="ml-auto flex space-x-4">
                        <select className="text-white text-sm mycolor border rounded px-2 py-1 focus:outline-none focus:ring focus:mycolor">
                            <option value="en">English</option>
                            <option value="ml">Malayalam</option>
                        </select>
                        <a className="text-white text-sm px-3 py-2 rounded mycolor" href="#">LogIn</a>
                    </div>
                </div>
            </nav>

            <header className="bg-white">
                <div className="container mx-auto flex flex-wrap justify-between items-center py-4">
                    <div className="flex items-center">
                        <img alt="College Logo" className="mr-4" height="50" src={cseLogo} width="50" />
                        <div>
                            <h1 className="text-xl font-bold text-black">Department of Computer Science and Engineering</h1>
                            <p className="text-sm text-black">College of Engineering Trivandrum</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <a className="text-primary" href="#"><i className="fab fa-facebook-f"></i></a>
                        <a className="text-primary" href="#"><i className="fab fa-linkedin-in"></i></a>
                        <a className="text-primary" href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <nav className="mycolor">
                    <div className="container mx-auto flex flex-wrap space-x-4 py-2">
                        <a className="text-white px-3 py-2 rounded bg-[#6B8564]" href="#">Home</a>
                        <a className="text-white px-3 py-2 rounded" href="#">About Us</a>
                        <a className="text-white px-3 py-2 rounded" href="#">Academics</a>
                        <a className="text-white px-3 py-2 rounded" href="#">Facilities</a>
                        <a className="text-white px-3 py-2 rounded" href="#">People</a>
                        <a className="text-white px-3 py-2 rounded" href="#">Research</a>
                        <a className="text-white px-3 py-2 rounded" href="#">Placements</a>
                        <a className="text-white px-3 py-2 rounded" href="#">Contact Us</a>
                    </div>
                </nav>
            </header>
            <main className="container mx-auto mt-4">
                <div><ImageCarousel /></div>
                <div className="flex gap-4 mt-4 px-2">
                    <div className="text-white relative bg-[#4C8FA7] flex-1">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold mx-2 text-white">News</h2>
                            <Link to="/editnews">
                            <button className="fa custom-button">&#xf044;</button>
                            </Link>
                        </div>
                        <div className="scrolling-content mt-2 bg-white text-[#6B8564] p-2">
                            <ul>
                                {news.map((item, index) => (
                                    <li key={index} className="mt-2">
                                        • {item.description} {/* Adjust according to your data structure */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-1 bg-[#6B8564]"></div> {/* Vertical line */}
                    <div className="text-white relative bg-[#4C8FA7] flex-1">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold mx-2 text-white">Announcements</h2>
                            <Link to="/editannouncements">
                            <button className="fa custom-button">&#xf044;</button>
                            </Link>
                        </div>
                        <div className="scrolling-content mt-2 bg-white text-[#6B8564] p-2">
                            <ul>
                                {announcements.map((item, index) => (
                                    <li key={index} className="mt-2">
                                        • {item.description} {/* Adjust according to your data structure */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="mycolor text-white mt-8">
                <div className="container mx-auto py-4">
                    <div className="flex flex-wrap justify-center space-x-4">
                        <a className="text-white" href="#">Grievance Redressal</a>
                        <a className="text-white" href="#">Women Cell (24X 7)</a>
                        <a className="text-white" href="#">Disclosures</a>
                        <a className="text-white" href="#">Downloads</a>
                        <a className="text-white" href="#">Conferences</a>
                        <a className="text-white" href="#">Job Opportunities</a>
                        <a className="text-white" href="#">Ranked list</a>
                        <a className="text-white" href="#">Kerala Technological University</a>
                        <a className="text-white" href="#">SPARK</a>
                    </div>
                    <div className="my-4 h-1 bg-white" />
                    <div className="text-center mt-1">
                        <p>Copyright 2024 College of Engineering Trivandrum. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
};

export default DeptPage;
