import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://outfit-recommendation-b2pv.onrender.com";

const OutfitRecommendation = () => {
    const [season, setSeason] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [filters, setFilters] = useState({});
    const [filterOptions, setFilterOptions] = useState({});
    const [error, setError] = useState(""); // Track API errors

    // Fetch recommendations from backend
    const fetchRecommendation = async () => {
        if (!season) return; // Prevent empty requests

        try {
            setError(""); // Reset error before fetching
            const response = await axios.post(`${API_URL}/recommend`, { season });
            const data = response.data.recommended_products || [];

            const filteredData = data.map(({ id, ...rest }) => rest);
            setRecommendations(filteredData);
        } catch (error) {
            console.error("Error fetching recommendation:", error);
            setError("Failed to fetch recommendations. Please try again later.");
        }
    };

    // Update filter options when recommendations change
    useEffect(() => {
        if (recommendations.length > 0) {
            const options = {};
            Object.keys(recommendations[0]).forEach((column) => {
                if (column !== "productDisplayName" && column !== "season") {
                    options[column] = [...new Set(recommendations.map((item) => item[column]))];
                }
            });
            setFilterOptions(options);
            setFilters(Object.keys(options).reduce((acc, key) => ({ ...acc, [key]: "" }), {}));
        }
    }, [recommendations]);

    // Handle filter selection
    const handleFilterChange = (column, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
    };

    // Apply filters to recommendations
    const filteredData = recommendations.filter((item) =>
        Object.keys(filters).every((key) => filters[key] === "" || item[key] === filters[key])
    );

    return (
        <div
            className="flex flex-col items-center p-6 min-h-screen bg-cover bg-center bg-no-repeat dark:bg-gray-900"
            style={{ backgroundImage: "url('/bg_two.png')" }}
        >
            <h2 className="text-xl font-bold mb-4 text-white dark:text-gray-200">Choose Your Season</h2>
            <input
                type="text"
                className="border p-2 rounded w-64 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                placeholder="Enter season (e.g., Summer, Winter)"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
            />
            <button
                className={`mt-4 px-4 py-2 rounded transition-colors duration-200 ${
                    season 
                        ? "bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700" 
                        : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                }`}
                onClick={fetchRecommendation}
                disabled={!season}
            >
                Get Recommendation
            </button>
    
            {error && <p className="text-red-500 dark:text-red-400 mt-4">{error}</p>}
    
            {recommendations.length > 0 && (
                <div className="mt-6 w-full max-w-5xl bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-90 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">Recommended Outfits:</h3>
                    <div className="overflow-x-auto max-h-[500px] border border-gray-300 dark:border-gray-600 rounded-md">
                        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                            <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700">
                                <tr>
                                    {Object.keys(recommendations[0]).map((column) => (
                                        <th key={column} className="border border-gray-300 dark:border-gray-600 p-2 w-32 text-left dark:text-white">{column}</th>
                                    ))}
                                </tr>
                                <tr>
                                    {Object.keys(recommendations[0]).map((column) =>
                                        column !== "productDisplayName" && column !== "season"
                                        && column !== "baseColour" && column !== "articleType"
                                        && column !== "subCategory" && column !== "usage" ? (
                                            <th key={column} className="border border-gray-300 dark:border-gray-600 p-2">
                                                <select
                                                    className="border p-1 w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    value={filters[column]}
                                                    onChange={(e) => handleFilterChange(column, e.target.value)}
                                                >
                                                    <option value="">All</option>
                                                    {filterOptions[column]?.map((option, index) => (
                                                        <option key={index} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                            </th>
                                        ) : (
                                            <th key={column} className="border border-gray-300 dark:border-gray-600 p-2"></th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <tr key={index} className="text-center dark:text-white">
                                            {Object.values(item).map((value, colIndex) => (
                                                <td key={colIndex} className="border border-gray-300 dark:border-gray-600 p-2 w-32">{value}</td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={Object.keys(recommendations[0]).length} className="text-center p-4 w-full dark:text-white">
                                            No results found. Try changing the filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
    
};

export default OutfitRecommendation;
