import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { deleteVehicle, getVehicles } from "../api";
import { useInfiniteQuery } from "react-query";
import DeleteConfirmationModal from "../components/Menu/DeleteConfirmationModal";
import { Vehicle } from "../components/Model/Vehicle";
import VehicleCard from "../components/Cards/VehicleCard";
import { FullScreenSpinner } from "../components/Spinner";

function Vehicles() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [deleteModalId, setDeleteModalId] = useState<string>();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    ["vehicles"],
    ({ pageParam = 1 }) => {
      return getVehicles(pageParam);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length) {
          return pages.length + 1;
        }
      },
    }
  );
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <>
      <DeleteConfirmationModal
        mutationFunction={deleteVehicle}
        mutationName="delete-vehicle"
        queryName="vehicles"
        id={deleteModalId}
      />
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Admin /</span> Vehicles
      </h4>
      <ul className="nav nav-pills flex-column flex-md-row mb-3">
        <li className="nav-item">
          <Link to="/vehicle" className="nav-link active">
            <i className="bx bx-plus me-1"></i> Add
          </Link>
        </li>
      </ul>
      <div className="row mb-5">
        {data?.pages.map((vehicles: Vehicle[]) => {
          return vehicles.map((vehicle: Vehicle) => {
            return (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                setDeleteModalId={setDeleteModalId}
              />
            );
          });
        })}
      </div>
      {(isFetching || isLoading) && <FullScreenSpinner />}
      <div ref={ref}></div>
    </>
  );
}

export default Vehicles;
