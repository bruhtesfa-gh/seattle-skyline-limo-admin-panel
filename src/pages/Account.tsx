//@ts-nocheck
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { changePassword, updateProfile } from "../api";
import userAvatar from "../assets/img/avatar.png";
import { changePasswordSchema, userUpdateProfileSchema } from "../utils/schema";
import { showImagePreview } from "../utils";
import { FullScreenSpinner } from "../components/Spinner";
function Account() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const updateMutation = useMutation("update-profile", updateProfile);
  const me = queryClient.getQueriesData("getme");
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: me[0][1]["firstName"],
      lastName: me[0][1]["lastName"],
      email: me[0][1]["email"],
      img: "",
    },
    resolver: yupResolver(userUpdateProfileSchema),
  });
  const imgRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { ref, ...rest } = register("img");
  useEffect(() => {
    if (fileRef.current) {
      showImagePreview(fileRef.current, imgRef.current!);
    }
  }, [fileRef.current]);
  const onSubmit = (data: any) => {
    const { firstName, lastName, email, img } = data as {
      firstName: string;
      lastName: string;
      email: string;
      img: FileList;
    };
    updateMutation.mutate({
      firstName,
      lastName,
      email,
      img: img[0],
    });
  };
  if (updateMutation.isLoading) {
    return <FullScreenSpinner />;
  }
  if (updateMutation.isSuccess) {
    (async () => {
      queryClient.refetchQueries("getme");
      navigate("/");
    })();
  }
  return (
    <>
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Account Settings /</span> Account
      </h4>

      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <h5 className="card-header">Profile Details</h5>
            {/* <!-- Account --> */}
            <div className="card-body">
              <div className="row">
                <form
                  className="col"
                  id="formAccountSettings"
                  method="POST"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="d-flex align-items-start align-items-sm-center gap-4">
                    <img
                      src={me[0][1]["img"] ? me[0][1]["img"] : userAvatar}
                      style={{ objectFit: "contain" }}
                      alt="user-avatar"
                      className="d-block rounded"
                      height="100"
                      width="100"
                      id="uploadedAvatar"
                    />
                    <div className="button-wrapper">
                      <label
                        htmlFor="upload"
                        className="btn btn-primary me-2 mb-4"
                        tabIndex={0}
                      >
                        <span className="d-none d-sm-block">Select photo</span>
                        <i className="bx bx-upload d-block d-sm-none"></i>
                        <input
                          id="upload"
                          type="file"
                          {...rest}
                          ref={(iref) => {
                            ref(iref);
                            fileRef.current = iref;
                          }}
                          // ref={fileRef}
                          className={`form-control ${
                            errors.img ? "border-danger" : ""
                          }`}
                          aria-describedby="inputGroupFileAddon04"
                          aria-label="Upload"
                          accept="image/*"
                          hidden
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <Controller
                      name="firstName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextInput
                          id="firstName"
                          label="First Name"
                          isError={Boolean(errors.firstName)}
                          type={"text"}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="lastName"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextInput
                          id="lastName"
                          label="Last Name"
                          isError={Boolean(errors.lastName)}
                          type={"text"}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextInput
                          id="email"
                          label="Email Name"
                          isError={Boolean(errors.lastName)}
                          type={"text"}
                          {...field}
                        />
                      )}
                    />
                    <div className="mt-2">
                      <button type="submit" className="btn btn-primary me-2">
                        Save changes
                      </button>
                    </div>
                  </div>
                </form>
                <ChangePassword />
              </div>
            </div>
            {/* <!-- /Account --> */}
          </div>
        </div>
      </div>
    </>
  );
}

function TextInput({
  label,
  id,
  type,
  isError,
  ...rest
}: {
  label: string;
  id: string;
  isError: boolean;
  type: string;
}) {
  return (
    <div className="mb-3  col-md-8">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        className={`form-control  ${isError ? "border-danger" : ""}`}
        {...rest}
        placeholder={label}
        type={type}
        id={id}
      />
    </div>
  );
}
function ChangePassword() {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation("changePassword", changePassword);
  const onSubmit = function (data: any) {
    mutation.mutate({
      oldPassword: data.oldPassword as string,
      newPassword: data.newPassword as string,
      confirmPassword: data.confirmPassword as string,
    });
  };
  if (mutation.isLoading) {
    return <FullScreenSpinner />;
  }
  if (mutation.isSuccess) {
    (async () => {
      queryClient.refetchQueries("getme");
      navigate("/");
    })();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="col">
      <Controller
        name="oldPassword"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            id="oldPassword"
            label="Old Password"
            isError={Boolean(errors.oldPassword)}
            type={"password"}
            {...field}
          />
        )}
      />
      <Controller
        name="newPassword"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            id="newPassword"
            label="New Password"
            type={"password"}
            isError={Boolean(errors.newPassword)}
            {...field}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            id="confirmPassword"
            isError={Boolean(errors.confirmPassword)}
            label="Confirm Password"
            type={"password"}
            {...field}
          />
        )}
      />
      <div className="mt-2">
        <button type="submit" className="btn btn-primary">
          Change Password
        </button>
      </div>
    </form>
  );
}
export default Account;
