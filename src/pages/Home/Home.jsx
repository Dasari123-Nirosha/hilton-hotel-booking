
import Hero from "../../components/Hero/Hero";
import RoomCard from "../../components/RoomCard/RoomCard";
import DestinationCard from "../../components/DestinationCard/DestinationCard";
import About from "../../components/About/About";
import Amenities from "../../components/Amenities/Amenities";
import Footer from "../../components/Footer/Footer";
import destinations from "../../data/destinations";
import "./Home.css";

const featuredRooms = [
  {
    id: 1,
    name: "Beach Room",
    description:
      "Enjoy a relaxing stay with beautiful beach views and refreshing ocean breezes.",
    image:
      "https://media.istockphoto.com/id/172423682/photo/holiday-resort.jpg?s=612x612&w=0&k=20&c=gfRhr31AcOMwbwveD2b9jydeC0FpIY429X9BKtu_t9o=",
  },
  {
    id: 2,
    name: "Forest Room",
    description:
      "Experience peaceful accommodation surrounded by beautiful green landscapes.",
    image:
      "https://thumbs.dreamstime.com/b/serene-bedroom-wooden-platform-bed-surrounded-lush-greenery-natural-light-skylight-creating-tranquil-eco-405532736.jpg",
  },
  {
    id: 3,
    name: "Luxury Kutir",
    description:
      "Discover traditional cottage living with rustic charm and modern comfort.",
    image:
      "https://cdn.sanity.io/images/ocl5w36p/ihcl_prod/826b81fcc23aefc4967038357e4e3fff383fe0ac-1280x1760.jpg",
  },
  {
    id: 4,
    name: "Deluxe Room",
    description:
      "Relax in an elegant room featuring stylish interiors and modern amenities.",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
  },
  {
    id: 5,
    name: "Executive Suite",
    description:
      "Enjoy spacious accommodation with premium interiors and extra comfort.",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  },
];

function Home() {
  return (
    <>
      <Hero />

      <section className="featured-rooms-section">
        <div className="featured-rooms-heading">
          <p>DISCOVER YOUR STAY</p>
          <h2>Our Featured Rooms</h2>
          <span>
            Explore our collection of beautiful stays designed
            for comfort, relaxation and memorable experiences.
          </span>
        </div>

        <div className="featured-rooms-grid">
          {featuredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section className="destinations-section">
        <div className="destinations-heading">
          <p>EXPLORE THE WORLD</p>
          <h2>Popular Destinations</h2>
          <span>
            Discover beautiful destinations and find the perfect
            place for your next memorable getaway.
          </span>
        </div>

        <div className="destinations-grid">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>
      </section>

      <About />
      <Amenities />
      <Footer />
    </>
  );
}

export default Home;
