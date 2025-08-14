import { WorkflowList } from "@renderer/components/WorkflowList";
import { Repository } from "@shared/types/Repository";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { AddRepositoryForm } from "./AddRepositoryForm";

export const RepositoryList = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleAddRepository = async (repository: Repository) => {
    await window.app.addRepository(repository);
    fetchRepositories();
  };

  const handleRemoveRepository = async (repository: Repository) => {
    await window.app.removeRepository(repository);
    fetchRepositories();
  };

  const fetchRepositories = async () => {
    const repos = await window.app.getRepositories();
    setRepositories(repos);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold">Repositories</h2>
      <Separator className="my-4" />
      <AddRepositoryForm onAddRepository={handleAddRepository} />
      <ul className="mt-4">
        {repositories.map((repo) => (
          <WorkflowList owner={repo.owner} repo={repo.repo} key={`${repo.owner}/${repo.repo}`}
            onDelete={() => handleRemoveRepository(repo)} />
        ))}
      </ul>
    </div>
  );
};
