import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import AddVenueForm from "./AddVenueForm";

const AddVenue = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Venue</CardTitle>
          <CardDescription>
            Fill in the details to add a new venue to the directory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddVenueForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddVenue;
