import { useMutation, useQueryClient } from "react-query";

function DeleteConfirmationModal({
  id,
  mutationFunction,
  queryName,
  mutationName,
}: {
  id: string | undefined;
  mutationFunction: (id: string) => Promise<any>;
  queryName: string;
  mutationName: string;
}) {
  const mutation = useMutation(mutationName, () =>
    mutationFunction(id as string)
  );
  const queryClient = useQueryClient();
  if (mutation.isSuccess) {
    (async () => {
      // await queryClient.refetchQueries("blogs");
      await queryClient.refetchQueries(queryName);
      mutation.reset();
    })();
  }
  // console.log(id);
  return (
    <div
      className="modal fade"
      id="modalToggle"
      aria-labelledby="modalToggleLabel"
      tabIndex={-1}
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h4>Are sure you want to delete this?</h4>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => mutation.mutate()}
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeleteConfirmationModal;
