import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      title: 'NodeJS',
      url: 'https://nodejs.org/en/',
      techs: ['Javascript', 'TypeScript']
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);

  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`).then(response => {
      const updateRepositories = repositories;

      const deletedRepId = updateRepositories.findIndex(rep => rep.id === response.data.id);
      updateRepositories.splice(deletedRepId, 1);

      setRepositories(updateRepositories);
    });

    api.get('repositories').then(response => {
      setRepositories(response.data);
    });

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
