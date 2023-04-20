// import { parse, v4 as uuidv4 } from "uuid";

import { useState, useEffect } from "react";

import styles from "./Projects.module.css";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectCard from "../project/ProjectCard";
// import Message from "../layout/Message";

function Project() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setLoading] = useState(true);
    // const [message, setMessage] = useState("");
    // const [type, setType] = useState("success");

    const fetchData = () => {
        // Para ver o loading
        setTimeout(
            () =>
                fetch(`http://localhost:5000/projects/`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((resp) => resp.json())
                    .then((data) => {
                        setProjects(data);
                        setLoading(false);
                    }),
            1000
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    function removeProject(projectId) {
        try {
            fetch(`http://localhost:5000/projects/${projectId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
            </div>
            <Container>
                {!isLoading ? (
                    projects.map((project) => {
                        return (
                            <ProjectCard
                                key={project.id}
                                id={project.id}
                                name={project.name}
                                category={project.category.name}
                                budget={project.budget}
                                handleRemove={removeProject}
                            />
                        );
                    })
                ) : (
                    <Loading />
                )}
            </Container>
        </div>
    );
}

export default Project;
