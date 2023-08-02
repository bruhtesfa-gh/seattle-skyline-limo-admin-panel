import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Vehicle } from "../Model/Vehicle";
function VehicleCard({
  vehicle,
  setDeleteModalId,
}: {
  vehicle: Vehicle;
  setDeleteModalId: Dispatch<SetStateAction<string | undefined>>;
}) {
  return (
    <div className="col-md-6 col-lg-4 mt-4">
      <div className="card">
        <img
          className="card-img-top"
          style={{ height: "329px" }}
          src={vehicle.img}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">
            {vehicle.name} : {vehicle.model}
          </h5>
          <p className="card-text">
            {" "}
            {vehicle?.description?.length > 20
              ? vehicle?.description?.substr(0, 20)
              : vehicle?.description}
          </p>
        </div>
        {/* <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul> */}
        <div className="card-body">
          <Link to={`/vehicle/${vehicle.id}`} className="card-link">
            Edit
          </Link>
          <button
            type="button"
            className="card-link text-danger"
            data-bs-toggle="modal"
            onClick={() => setDeleteModalId(vehicle.id)}
            style={{ backgroundColor: "transparent", border: "none" }}
            data-bs-target="#modalToggle"
            // className=" "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default VehicleCard;
