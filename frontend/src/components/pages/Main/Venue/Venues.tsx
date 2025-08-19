import { useState } from "react";
import {
  Edit,
  Eye,
  Filter,
  IndianRupee,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { Input } from "../../../ui/input";
import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { authStore } from "../../../../stores/authStore";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { venueStore } from "../../../../stores/venueStore";
import type { Venue } from "../../../../types/Venue";

const mockVenues = [
  {
    _id: "1",
    name: "Umaid Bhawan Palace Ballroom",
    location: "Jodhpur, Rajasthan",
    capacity: 300,
    pricePerDay: 320000,
    amenities: [
      "Royal Decor",
      "Traditional Rajasthani Cuisine",
      "Valet Parking",
      "Sound & Lighting",
    ],
    description:
      "Luxurious ballroom in the iconic Umaid Bhawan Palace, ideal for royal weddings and high-profile events.",
    imageUrl:
      "https://i.pinimg.com/1200x/b4/7f/c5/b47fc55ad6d2aa25683b357394aebdaf.jpg",
    available: true,
    rating: 4.9,
    category: "wedding",
  },
  {
    _id: "2",
    name: "Ganga Mahal Riverside Garden",
    location: "Varanasi, Uttar Pradesh",
    capacity: 200,
    pricePerDay: 90000,
    amenities: [
      "Ganga View",
      "Outdoor Seating",
      "Live Classical Music",
      "Catering",
    ],
    description:
      "Serene garden venue on the banks of the Ganga, perfect for cultural events and spiritual gatherings.",
    imageUrl:
      "https://i.pinimg.com/1200x/cc/7d/41/cc7d418e4c0b03822b2abf7f90febbb6.jpg",
    available: true,
    rating: 4.8,
    category: "outdoor",
  },
  {
    _id: "3",
    name: "Bangalore Tech Convention Hall",
    location: "Bengaluru, Karnataka",
    capacity: 500,
    pricePerDay: 150000,
    amenities: ["AV Equipment", "WiFi", "AC", "Cafeteria"],
    description:
      "Modern conference hall in the heart of India’s tech capital, ideal for corporate summits and product launches.",
    imageUrl:
      "https://images.pexels.com/photos/159213/hall-congress-architecture-building-159213.jpeg",
    available: true,
    rating: 4.7,
    category: "conference",
  },
  {
    _id: "4",
    name: "Kolkata Heritage Warehouse",
    location: "Kolkata, West Bengal",
    capacity: 250,
    pricePerDay: 80000,
    amenities: [
      "Vintage Decor",
      "Flexible Layout",
      "Stage Setup",
      "Bar Service",
    ],
    description:
      "Rustic heritage warehouse with colonial charm, perfect for cultural exhibitions and creative events.",
    imageUrl:
      "https://images.jdmagicbox.com/v2/comp/bokaro/d2/9999p6542.6542.250513143508.s7d2/catalogue/prashansa-banquet-hall-bokaro-sector-4-bokaro-convention-halls-fzvp5hidp9.jpg",
    available: true,
    rating: 4.6,
    category: "exhibition",
  },
  {
    _id: "5",
    name: "Mumbai Sea View Rooftop",
    location: "Mumbai, Maharashtra",
    capacity: 150,
    pricePerDay: 180000,
    amenities: [
      "Arabian Sea View",
      "Bar Service",
      "DJ Setup",
      "Lounge Seating",
    ],
    description:
      "Stylish rooftop venue overlooking the Arabian Sea, ideal for cocktail parties and receptions.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO14Npu9x93goemVEp19APYGSPSl5ixXW9mA&s",
    available: true,
    rating: 4.9,
    category: "restaurant",
  },
  {
    _id: "6",
    name: "Kerala Backwater Banquet Hall",
    location: "Alleppey, Kerala",
    capacity: 120,
    pricePerDay: 75000,
    amenities: [
      "Backwater View",
      "Traditional Sadya Catering",
      "Boat Access",
      "Open Air",
    ],
    description:
      "Charming venue by the backwaters, offering an exotic experience for weddings and intimate celebrations.",
    imageUrl:
      "https://i.pinimg.com/1200x/e4/42/9d/e4429d9b8aa260119a036c5b483e5c00.jpg",
    available: true,
    rating: 4.8,
    category: "wedding",
  },
  {
    _id: "7",
    name: "Hyderabad Charminar View Banquet",
    location: "Hyderabad, Telangana",
    capacity: 400,
    pricePerDay: 160000,
    amenities: [
      "Charminar View",
      "Mughlai Cuisine",
      "Decor Lighting",
      "Parking",
    ],
    description:
      "Spacious banquet hall offering a magnificent Charminar backdrop, perfect for weddings and cultural events.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrvCa5ymdjxiRiCqmgoRUxm0bHW9FJLaP_zg&s",
    available: true,
    rating: 4.7,
    category: "wedding",
  },
  {
    _id: "8",
    name: "Jaipur Pink City Pavilion",
    location: "Jaipur, Rajasthan",
    capacity: 350,
    pricePerDay: 220000,
    amenities: [
      "Rajasthani Folk Performances",
      "Traditional Thali",
      "Heritage Decor",
      "Stage Setup",
    ],
    description:
      "Heritage venue within the Pink City walls, ideal for royal-themed weddings and destination celebrations.",
    imageUrl:
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    available: true,
    rating: 4.9,
    category: "wedding",
  },
  {
    _id: "9",
    name: "Delhi International Convention Centre",
    location: "New Delhi, Delhi",
    capacity: 1000,
    pricePerDay: 300000,
    amenities: [
      "High-Speed Internet",
      "Multiple Halls",
      "Security",
      "Professional AV Equipment",
    ],
    description:
      "Modern convention center located in India’s capital, perfect for large-scale conferences and expos.",
    imageUrl:
      "https://content.jdmagicbox.com/v2/comp/delhi/m6/011pxx11.xx11.181025011904.t5m6/catalogue/india-international-convention-and-expo-center-dwarka-sector-25-delhi-exhibition-halls-kzoM23BAul.jpg",
    available: true,
    rating: 4.8,
    category: "corporate",
  },
  {
    _id: "10",
    name: "Shimla Hills Outdoor Lawn",
    location: "Shimla, Himachal Pradesh",
    capacity: 180,
    pricePerDay: 60000,
    amenities: [
      "Mountain View",
      "Open Air Stage",
      "Bonfire Area",
      "Flower Decor",
    ],
    description:
      "Scenic lawn nestled in the Himalayan hills, ideal for destination weddings and intimate parties.",
    imageUrl:
      "https://cdn0.weddingwire.in/vendor/2583/3_2/960/jpeg/whatsapp-image-2024-10-15-at-10-50-17-am-1_15_482583-172897010028740.jpeg",
    available: true,
    rating: 4.6,
    category: "outdoor",
  },
  {
    _id: "11",
    name: "Goa Beachside Resort Hall",
    location: "Calangute, Goa",
    capacity: 220,
    pricePerDay: 200000,
    amenities: ["Beach Access", "Sea View", "Live Music", "Barbecue"],
    description:
      "Beachside venue in Goa, ideal for sunset weddings, receptions, and beach parties.",
    imageUrl:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    available: true,
    rating: 4.9,
    category: "wedding",
  },
  {
    _id: "12",
    name: "Ahmedabad Heritage Haveli Courtyard",
    location: "Ahmedabad, Gujarat",
    capacity: 150,
    pricePerDay: 85000,
    amenities: [
      "Heritage Architecture",
      "Gujarati Cuisine",
      "Folk Dance Stage",
      "Lighting",
    ],
    description:
      "Beautiful courtyard of a restored haveli, perfect for cultural events and traditional weddings.",
    imageUrl:
      "https://assets.cntraveller.in/photos/67223093b4e08a4ae75093ad/4:3/w_1920,h_1440,c_limit/Facade-OP1.jpg",
    available: true,
    rating: 4.8,
    category: "cultural",
  },
];

const Venues = () => {
  const { isAdmin } = authStore();
  const { deleteVenue } = venueStore();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");

  const filteredVenues = mockVenues.filter((venue) => {
    const matchesSearch =
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || venue.category === selectedCategory;
    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "under150000" && venue.pricePerDay < 150000) ||
      (priceRange === "150000-200000" &&
        venue.pricePerDay >= 150000 &&
        venue.pricePerDay <= 200000) ||
      (priceRange === "over200000" && venue.pricePerDay > 200000);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleBooking = (venue: Venue) => {
    const createEventUrl = `/events/create?venue=${encodeURIComponent(
      venue.name
    )}&location=${encodeURIComponent(venue.location)}`;
    window.location.href = createEventUrl;
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Venues</h1>
          <p className="text-muted-foreground">
            Find the perfect venue for your event
          </p>
        </div>
      </div>
      <Card>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="outdoor">Outdoor</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="All Prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under150000">Under ₹1,50,000</SelectItem>
                <SelectItem value="150000-200000">
                  ₹1,50,000 - ₹2,00,000
                </SelectItem>
                <SelectItem value="over200000">Over ₹2,00,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {filteredVenues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map((venue: any) => (
            <Card
              key={venue._id}
              className="overflow-hidden hover:shadow-lg pt-0 transition-shadow flex flex-col"
            >
              <div className="relative">
                <img
                  src={venue.imageUrl}
                  alt={venue.name}
                  className="w-full h-48 object-cover"
                />
                {!venue.available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Not Available
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="size-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{venue.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col flex-1 p-4">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{venue.name}</CardTitle>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {venue.category}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="size-4 mr-1" />
                    <span className="text-sm">{venue.location}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col flex-1">
                  <CardDescription className="mb-4">
                    {venue.description}
                  </CardDescription>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <Users className="size-4 mr-1" />
                      <span className="text-sm">
                        Up to {venue.capacity} guests
                      </span>
                    </div>
                    <div className="flex items-center text-gray-900 font-semibold">
                      <span>₹{venue.pricePerDay.toLocaleString()}/day</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      Amenities
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {venue.amenities.slice(0, 3).map((amenity: string) => (
                        <span
                          key={amenity}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button
                      className="w-full"
                      disabled={!venue.available}
                      onClick={() => handleBooking(venue)}
                    >
                      {venue.available ? "Book Now" : "Unavailable"}
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <img
              src="/undraw_no-data_ig65.png"
              alt="No venues found"
              className="w-64 h-64 mx-auto mb-6 opacity-50"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No venues found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Venues;
