
import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useRooms } from "../../context/RoomContext";
import { useBookings } from "../../context/BookingContext";
import RoomCard from "../../components/RoomCard/RoomCard";
import RoomFilters from "../../components/RoomFilters/RoomFilters";
import SearchBar from "../../components/SearchBar/SearchBar";
import Availability from "../Availability/Availability";
import "./Rooms.css";

const categories = {
  1: "Beach Room",
  2: "Forest Room",
  3: "Luxury Kutir",
  4: "Deluxe Room",
  5: "Executive Suite",
};

const destinations = [
  "Maldives",
  "Bali",
  "Paris",
  "Dubai",
  "London",
  "Goa",
];

// Use the saved destination or assign a sample destination to older rooms
const getRoomDestination = (room) => {
  if (room.destination) {
    return room.destination;
  }

  const index = (Number(room.id) - 1) % destinations.length;
  return destinations[index];
};

function Rooms() {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();

  const selectedDestination = searchParams.get("destination") || "";

  const { rooms } = useRooms();
  const { bookings } = useBookings();

  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    sortBy: "default",
    guestCount: "all",
  });

  const [availabilityData, setAvailabilityData] = useState(null);
  const [availabilitySearched, setAvailabilitySearched] = useState(false);

  // Destination selected in the availability form takes priority
  const activeDestination =
    availabilitySearched && availabilityData?.destination
      ? availabilityData.destination
      : selectedDestination;

  useEffect(() => {
    if (categoryId) {
      document
        .getElementById(`category-${categoryId}`)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [categoryId]);

  const handleAvailabilitySearch = (searchData) => {
    setAvailabilityData(searchData);
    setAvailabilitySearched(true);
    setSearchTerm("");

    setFilters({
      sortBy: "default",
      guestCount: "all",
    });

    setTimeout(() => {
      document
        .getElementById("rooms-results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Check whether a room is already booked for selected dates
  const getRoomStatus = (room) => {
    if (!availabilitySearched || !availabilityData) {
      return undefined;
    }

    const hasBookingConflict = bookings.some(
      (booking) =>
        Number(booking.roomId) === Number(room.id) &&
        booking.status === "Confirmed" &&
        booking.checkIn < availabilityData.checkOut &&
        booking.checkOut > availabilityData.checkIn
    );

    return hasBookingConflict ? "Booked" : "Available";
  };

  // Filter rooms by destination, search, guests and availability
  const searchResults = rooms.filter((room) => {
    const search = searchTerm.trim().toLowerCase();

    const destination = getRoomDestination(room);

    const matchesDestination =
      !activeDestination ||
      destination.toLowerCase() === activeDestination.toLowerCase();

    const matchesSearch =
      room.name.toLowerCase().includes(search) ||
      room.category.toLowerCase().includes(search) ||
      room.description.toLowerCase().includes(search) ||
      destination.toLowerCase().includes(search);

    const matchesGuests =
      filters.guestCount === "all" ||
      room.guests >= Number(filters.guestCount);

    const matchesAvailabilityGuests =
      !availabilitySearched ||
      room.guests >= Number(availabilityData.guests);

    return (
      matchesDestination &&
      matchesSearch &&
      matchesGuests &&
      matchesAvailabilityGuests
    );
  });

  // Sort filtered rooms
  const sortedRooms = [...searchResults].sort((a, b) => {
    if (filters.sortBy === "low-to-high") {
      return a.price - b.price;
    }

    if (filters.sortBy === "high-to-low") {
      return b.price - a.price;
    }

    return a.id - b.id;
  });

  // Scroll to the first matching room when searching
  useEffect(() => {
    if (searchTerm.trim() && sortedRooms.length > 0) {
      const firstRoomId = sortedRooms[0].id;

      document
        .getElementById(`room-${firstRoomId}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }
  }, [searchTerm, filters.guestCount, filters.sortBy]);

  return (
    <main className="rooms-page">
      <section className="rooms-page-heading">
        <p>HILTON ACCOMMODATION</p>

        <h1>
          {activeDestination
            ? `${activeDestination} Rooms`
            : "Explore Our Rooms"}
        </h1>

        <span>
          {activeDestination
            ? `Discover our accommodation options in ${activeDestination}.`
            : "Discover our collection of comfortable and elegant accommodations."}
        </span>

        <Link to="/" className="rooms-back-link">
          Back to Home
        </Link>
      </section>

      <Availability onSearch={handleAvailabilitySearch} />

      <section className="rooms-list-section" id="rooms-results">
        <div className="rooms-category-list">
          {Object.entries(categories).map(([id, name]) => (
            <a
              key={id}
              href={`#category-${id}`}
              className="rooms-category-item"
            >
              {name}
            </a>
          ))}
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <RoomFilters onFilterChange={setFilters} />

        <div className="rooms-list-heading">
          <div>
            <h2>
              {availabilitySearched
                ? "Room Availability Results"
                : activeDestination
                ? `Accommodation in ${activeDestination}`
                : "Our Accommodation"}
            </h2>

            {availabilitySearched && (
              <p className="rooms-availability-result-dates">
                {availabilityData.checkIn} to {availabilityData.checkOut}
                {" · "}
                {availabilityData.guests} Guests
              </p>
            )}
          </div>

          <p>{sortedRooms.length} Rooms Found</p>
        </div>

        {availabilitySearched && (
          <p className="rooms-availability-result-dates">
            Green: Available | Red: Booked for selected dates
          </p>
        )}

        {Object.entries(categories).map(([id, name]) => {
          const categoryRooms = sortedRooms.filter(
            (room) => room.category === name
          );

          if (categoryRooms.length === 0) {
            return null;
          }

          return (
            <section
              className="room-category-section"
              id={`category-${id}`}
              key={id}
            >
              <div className="room-category-heading">
                <h2>{name}</h2>
                <span>{categoryRooms.length} Rooms</span>
              </div>

              <div className="rooms-grid">
                {categoryRooms.map((room) => (
                  <div id={`room-${room.id}`} key={room.id}>
                    <RoomCard
                      room={room}
                      availabilityStatus={getRoomStatus(room)}
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {sortedRooms.length === 0 && (
          <p className="no-rooms-message">
            No rooms found for this destination or your selected
            dates and guest count. Try changing your search.
          </p>
        )}
      </section>
    </main>
  );
}

export default Rooms;
