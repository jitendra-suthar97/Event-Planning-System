import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { useState } from "react";

const AddGuestModal = ({
  onAddGuest,
}: {
  onAddGuest: (guest: any) => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    onAddGuest({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <Dialog>
      {/* The Button that opens modal */}
      <DialogTrigger asChild>
        <Button className="bg-blue-500">+ Add Guest</Button>
      </DialogTrigger>

      {/* Modal content */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Guest</DialogTitle>
          <DialogDescription>
            Enter the guest’s details and send them an invitation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Guest Name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Guest Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Button onClick={handleSubmit} className="w-full bg-green-500">
            Save Guest
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddGuestModal;
