import "./Tasks.styles.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useState, useEffect } from "react";
import { useResize } from "../../../hooks/useResize";
import { Header } from "../../Header/Header";
import { TaskForm } from "../../TaskForm/TaskForm";
import { Card } from "../../Card/Card";

const { VITE_API_ENDPOINT } = import.meta.env;

export const Tasks = () => {
  const { isPhone } = useResize();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(null);

  const limitString = (str) => {
    if (str.length > 370) {
      return { string: str.slice(0, 367).concat("..."), addButton: true };
    }
    return { string: str, addButton: false };
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${VITE_API_ENDPOINT}task`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(({ status_code, result }) => {
        if (status_code === 200) {
          setList(result);
          setTimeout(() => {
            setLoading(false);
          }, 4000);
        } else {
          setList(null);
        }
      });
  }, []);

  const renderAllCards = (status_filter) => {
    return list
      ?.filter((card) => {
        if (status_filter) {
          return card.status === status_filter;
        }
        return true;
      })
      .map((card) => {
        let {
          _id,
          title,
          createdAt,
          user: { userName },
          status,
          importance,
          description,
        } = card;

        return (
          <Card
            key={_id}
            title={title}
            datetime={createdAt}
            creator={userName}
            status={status.toLowerCase()}
            importance={importance.toLowerCase()}
            description={description}
          />
        );
      });
  };
  return (
    <>
      <Header />
      <main id="tasks">
        <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          {isPhone && (
            <div className="list phone">
              {!list?.length ? (
                <div>No hay tareas registradas</div>
              ) : loading ? (
                <>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </>
              ) : (
                renderAllCards(null)
              )}
            </div>
          )}

          {!isPhone && (
            <div className="list_group">
              {!list?.length ? (
                <div>No hay tareas registradas</div>
              ) : loading ? (
                <>
                  <Skeleton height={150} />
                  <Skeleton height={150} />
                  <Skeleton height={150} />
                </>
              ) : (
                <>
                  <div className="list">
                    <h4>Nuevas</h4>
                    {renderAllCards("NEW")}
                  </div>
                  <div className="list">
                    <h4>En proceso</h4>
                    {renderAllCards("IN PROGRESS")}
                  </div>
                  <div className="list">
                    <h4>Finalizadas</h4>
                    {renderAllCards("FINISHED")}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </>
  );
};
