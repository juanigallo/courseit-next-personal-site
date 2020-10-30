import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key == "Enter") {
      handleClick();
    }
  }

  async function handleClick() {
    setIsFetching(true);
    const github = await axios.get(
      `https://api.github.com/users/${searchTerm}`
    );

    const projectsData = await axios.get(
      "https://api.jsonbin.io/b/5f9c9b21857f4b5f9ae05b30"
    );

    const userProjects = projectsData.data.find(
      (user) => user.name == searchTerm
    );

    setSearchTerm("");

    setData({
      githubData: github.data,
      projects: userProjects ? userProjects.projects : []
    });

    setIsFetching(false);
  }

  return (
    <main>
      <h1>Busca tu perfil</h1>
      <Input
        placeholder="Buscar tu perfil"
        name="searchInput"
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <Button value="buscar" name="searchAction" onClick={handleClick} />

      {isFetching && <h1>Cargando</h1>}
      <section>
        {data.githubData && (
          <div>
            <div className="img">
              <img src={data.githubData.avatar_url} />
            </div>
            <div>
              <h2>{data.githubData.name}</h2>
              <h3>{data.githubData.bio}</h3>
            </div>
          </div>
        )}
        {data.projects && (
          <div>
            {data.projects.map((project, key) => {
              return (
                <div key={key}>
                  <h4>{project.name}</h4>
                  <h5>{project.desc}</h5>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
