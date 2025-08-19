import { amenityOptions, type VenueFormData } from "../../../../types/Venue";
import { Categories } from "../../../../types/Event";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import { Checkbox } from "../../../ui/checkbox";
import { VenueSchema } from "../../../../schemas/VenueSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Image,
  IndianRupee,
  Loader,
  MapPin,
  Star,
  Tag,
  Users,
} from "lucide-react";
import { Button } from "../../../ui/button";
import { venueStore } from "../../../../stores/venueStore";

const AddVenueForm = () => {
  const { addVenue } = venueStore();

  const defaultValues: VenueFormData = {
    name: "",
    location: "",
    capacity: 50,
    pricePerDay: 1000,
    amenities: [],
    description: "",
    imageURL: [],
    available: true,
    rating: 4.0,
    category: Categories.Conference,
  };

  const handleAddVenue = async (values: VenueFormData) => {
    await addVenue(values);
    console.log("Venue to add: ", values);
  };
  return (
    <div>
      <Formik
        initialValues={defaultValues}
        onSubmit={handleAddVenue}
        validationSchema={VenueSchema}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-8">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Venue Name *</Label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    placeholder="Enter venue name"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-sm text-red-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    <Tag className="inline h-4 w-4 mr-1" /> Category *
                  </Label>
                  <Field
                    as="select"
                    name="category"
                    className="w-full border rounded-md p-2"
                  >
                    <option value="conference">Conference</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="restaurant">Restaurant</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="p"
                    className="text-sm text-red-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  <MapPin className="inline h-4 w-4 mr-1" /> Location *
                </Label>
                <Field
                  as={Input}
                  id="location"
                  name="location"
                  placeholder="Full address"
                />
                <ErrorMessage
                  name="location"
                  component="p"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  rows={4}
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-sm text-red-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">
                  <Image className="inline h-4 w-4 mr-1" /> Image URL *
                </Label>
                <Field
                  as={Input}
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                />
                <ErrorMessage
                  name="imageUrl"
                  component="p"
                  className="text-sm text-red-600"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Capacity & Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">
                    <Users className="inline h-4 w-4 mr-1" /> Capacity *
                  </Label>
                  <Field
                    as={Input}
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                  />
                  <ErrorMessage
                    name="capacity"
                    component="p"
                    className="text-sm text-red-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricePerDay">
                    <IndianRupee className="inline h-4 w-4 mr-1" /> Price per
                    Day *
                  </Label>
                  <Field
                    as={Input}
                    id="pricePerDay"
                    name="pricePerDay"
                    type="number"
                  />
                  <ErrorMessage
                    name="pricePerDay"
                    component="p"
                    className="text-sm text-red-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">
                    <Star className="inline h-4 w-4 mr-1" /> Rating *
                  </Label>
                  <Field
                    as={Input}
                    id="rating"
                    name="rating"
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                  />
                  <ErrorMessage
                    name="rating"
                    component="p"
                    className="text-sm text-red-600"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {amenityOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={values.amenities.includes(amenity)}
                      onCheckedChange={(checked: boolean) => {
                        if (checked) {
                          setFieldValue("amenities", [
                            ...values.amenities,
                            amenity,
                          ]);
                        } else {
                          setFieldValue(
                            "amenities",
                            values.amenities.filter(
                              (a: string) => a !== amenity
                            )
                          );
                        }
                      }}
                    />
                    <Label htmlFor={amenity} className="text-sm">
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
              <ErrorMessage
                name="amenities"
                component="p"
                className="text-sm text-red-600"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Availability</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={values.available}
                  onCheckedChange={(checked) =>
                    setFieldValue("available", checked)
                  }
                />
                <Label htmlFor="available">
                  This venue is currently available for booking
                </Label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader size="sm" className="mr-2" /> : "Add"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddVenueForm;
