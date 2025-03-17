import { useState, useEffect } from "react";
import axios from "axios";


const API_URL = "https://outfit-recommendation-b2pv.onrender.com";

const OutfitRecommendation = () => {
    const [season, setSeason] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [filters, setFilters] = useState({});
    const [filterOptions, setFilterOptions] = useState({});

    // Fetch all recommendations from the backend
    const fetchRecommendation = async () => {
        try {
            const response = await axios.post(`${API_URL}/recommend`, { season });
            const data = response.data.recommended_products || [];

            // Exclude 'id' column from being displayed
            const filteredData = data.map(({ id, ...rest }) => rest);
            setRecommendations(filteredData);

            if (filteredData.length > 0) {
                // Extract unique values for dropdowns (excluding 'productDisplayName' and 'season')
                const options = {};
                Object.keys(filteredData[0]).forEach((column) => {
                    if (column !== "productDisplayName" && column !== "season") {
                        options[column] = [...new Set(filteredData.map((item) => item[column]))];
                    }
                });
                setFilterOptions(options);
                setFilters(Object.keys(options).reduce((acc, key) => ({ ...acc, [key]: "" }), {}));
            }
        } catch (error) {
            console.error("Error fetching recommendation:", error);
        }
    };

    // Handle filter selection
    const handleFilterChange = (column, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
    };

    // Apply filters to recommendations
    const filteredData = recommendations.filter((item) =>
        Object.keys(filters).every((key) => filters[key] === "" || item[key] === filters[key])
    );

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-xl font-bold mb-4">Choose Your Season</h2>
            <input
                type="text"
                className="border p-2 rounded w-64"
                placeholder="Enter season (e.g., Summer, Winter)"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
            />
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={fetchRecommendation}
            >
                Get Recommendation
            </button>

            {recommendations.length > 0 && (
                <div className="mt-6 w-full max-w-5xl">
                    <h3 className="text-lg font-semibold mb-2">Recommended Outfits:</h3>
                    <div className="overflow-x-auto max-h-[500px] border border-gray-300 rounded-md">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead className="sticky top-0 bg-gray-200">
                                <tr>
                                    {Object.keys(recommendations[0]).map((column) => (
                                        <th key={column} className="border p-2">{column}</th>
                                    ))}
                                </tr>
                                {/* Dropdown Filters (excluding 'productDisplayName' and 'season') */}
                                <tr>
                                    {Object.keys(recommendations[0]).map((column) => (
                                        column !== "productDisplayName" && column !== "season" ? (
                                            <th key={column} className="border p-2">
                                                <select
                                                    className="border p-1 w-full"
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
                                            <th key={column} className="border p-2"></th>
                                        )
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <tr key={index} className="text-center">
                                            {Object.values(item).map((value, colIndex) => (
                                                <td key={colIndex} className="border p-2">{value}</td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={Object.keys(recommendations[0]).length} className="text-center p-4">
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
