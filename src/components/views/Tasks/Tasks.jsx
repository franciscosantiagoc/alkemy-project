import "./Tasks.styles.css";
import { useResize } from "../../../hooks/useResize";
import { Header } from "../../Header/Header";
import { cardsData } from "./data";
import { Card } from "../../Card/Card";

export const Tasks = () => {
  const { isPhone } = useResize();

  const limitString = (str) => {
    if (str.length > 370) {
      return { string: str.slice(0, 367).concat("..."), addButton: true };
    }
    return { string: str, addButton: false };
  };

  const renderAllCards = () => {
    return cardsData.map((card) => (
      <Card
        key={card.id}
        title={card.title}
        datetime={card.datetime}
        creator={card.creator}
        status={card.status}
        priority={card.priority}
        description={card.description}
      />
    ));
  };
  return (
    <>
      <Header />
      <main id="tasks">
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          {isPhone && <div className="list phone">{renderAllCards()}</div>}

          {!isPhone && (
            <div className="list_group">
              <div className="list">
                <h4>Nuevas</h4>
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h5>24/1</h5>
                  <h6>Francisco Santiago!</h6>
                  <button className="status" type="button">
                    Nueva
                  </button>
                  <button className="priority">Alta</button>
                  <p className="description">Descripcion de tarea a realizar</p>
                </div>
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h5>24/1</h5>
                  <h6>Francisco Santiago!</h6>
                  <button className="status" type="button">
                    Nueva
                  </button>
                  <button className="priority">Alta</button>
                  <p className="description">
                    {
                      limitString(
                        "Dolore et excepteur eiusmod dolore quis et qui reprehenderit tempor fugiat ipsum enim. Cillum adipisicing ut eu fugiat sit non. Qui nostrud fugiat consequat consectetur minim cillum dolor nostrud. Excepteur in adipisicing non sunt. Occaecat sint elit irure voluptate esse velit dolor aliquip commodo aute officia aute veniam. Dolore et excepteur eiusmod dolore quis et qui reprehenderit tempor fugiat ipsum enim. Cillum adipisicing ut eu fugiat sit non. Qui nostrud fugiat consequat consectetur minim cillum dolor nostrud. Excepteur in adipisicing non sunt. Occaecat sint elit irure voluptate esse velit dolor aliquip commodo aute officia aute veniam."
                      ).string
                    }
                  </p>
                </div>
              </div>
              <div className="list">
                <h4>En proceso</h4>
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h5>24/1</h5>
                  <h6>Francisco Santiago!</h6>
                  <button className="status" type="button">
                    Nueva
                  </button>
                  <button className="priority">Alta</button>
                  <p className="description">Descripcion de tarea a realizar</p>
                </div>
              </div>
              <div className="list">
                <h4>Finalizadas</h4>
                <div className="card">
                  <div className="close">x</div>
                  <h3>Tarea 1</h3>
                  <h5>24/1</h5>
                  <h6>Francisco Santiago!</h6>
                  <button className="status" type="button">
                    Nueva
                  </button>
                  <button className="priority">Alta</button>
                  <p className="description">Descripcion de tarea a realizar</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
