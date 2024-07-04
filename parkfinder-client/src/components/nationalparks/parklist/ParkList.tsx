import React, { useEffect, useState } from "react";
import axios from "axios";
import ParkCard from "../card/ParkCard";
import PaginationComponent from "../pagination/Paginationcomponent";
import "./ParkList.css";
const { VITE_NPS_API_KEY: apiconfig } = import.meta.env;

interface Activity {
  id: string;
  name: string;
}

interface Address {
  postalCode: string;
}

interface Park {
  id: string;
  fullName: string;
  description: string;
  url: string;
  images: { url: string }[];
  activities: Activity[];
  addresses: Address[];
}

interface ParksListProps {
  filters: { activity?: string; zipCode?: string; parkName?: string };
  setActivities: (activities: string[]) => void;
}

const ParksList: React.FC<ParksListProps> = ({ filters, setActivities }) => {
  const [parks, setParks] = useState<Park[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const parksPerPage = 6;

  useEffect(() => {
    const fetchParks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://developer.nps.gov/api/v1/parks?api_key=${apiconfig}&limit=471&stateCode=NY`
        );
        const fetchedParks: Park[] = response.data.data;
        setParks(fetchedParks);
        const uniqueActivities = Array.from(
          new Set(
            fetchedParks.flatMap((park: Park) =>
              park.activities.map((activity) => activity.name)
            )
          )
        );
        setActivities(uniqueActivities);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchParks();
  }, [filters, setActivities]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredParks = parks.filter((park) => {
    const matchesActivity =
      !filters.activity ||
      park.activities.some((activity) => activity.name === filters.activity);
    const matchesZipCode =
      !filters.zipCode ||
      park.addresses.some((address) =>
        address.postalCode.startsWith(filters.zipCode || "")
      );
    const matchesParkName =
      !filters.parkName ||
      park.fullName.toLowerCase().includes(filters.parkName.toLowerCase());
    return matchesActivity && matchesZipCode && matchesParkName;
  });

  const indexOfLastPark = currentPage * parksPerPage;
  const indexOfFirstPark = indexOfLastPark - parksPerPage;
  const currentParks = filteredParks.slice(indexOfFirstPark, indexOfLastPark);
  const totalPages = Math.ceil(filteredParks.length / parksPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="parkscontainer">
      <div className="parkslist">
        {currentParks.map((park) => (
          <ParkCard key={park.id} park={park} />
        ))}
      </div>
      <div className="paginationcontainer">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ParksList;
