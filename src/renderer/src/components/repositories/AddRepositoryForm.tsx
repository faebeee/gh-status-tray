import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const AddRepositoryForm = ({ onAddRepository }) => {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (owner && repo) {
      onAddRepository({ owner, repo });
      setOwner("");
      setRepo("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Repository"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
      />
      <Button type="submit" variant={'outline'} className={'curstor-pointer'}>Add</Button>
    </form>
  );
};
