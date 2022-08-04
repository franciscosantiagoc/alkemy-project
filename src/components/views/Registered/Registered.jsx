import { useParams } from "react-router-dom";
export default function Registered () {
  const { teamID } = useParams();
  return (
    <div className="container">
      Te has registrado correctamente, el ID de tu equipo es: {teamID}
    </div>
  )
}