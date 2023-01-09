const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];
repositories.techs =[
  {"id":1,"Type":'React'},
  {"id":2,"Type":'React-Native'},
  {"id":3,"Type":'TypeScript'},
  {"id":4,"Type":'ContextApi'},
];
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;
  const repository = repositories.find(repo => repo.id === id);
  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repository.title = updatedRepository.title;
  repository.url = updatedRepository.url;
  repository.techs = updatedRepository.techs;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const addLike = repositories.find(repository => repository.id === id);

  if (!addLike) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = addLike.likes++;
  repositories.map(rep=> rep.likes === likes)
  
  return response.json(addLike);
});

module.exports = app;
