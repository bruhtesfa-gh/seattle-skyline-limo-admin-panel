import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { Blog } from "../Model/Blog";
function BlogCard({
  blog,
  setDeleteModalId,
}: {
  blog: Blog;
  setDeleteModalId: Dispatch<SetStateAction<string | undefined>>;
}) {
  return (
    <div className="col-md-6 col-lg-4 mt-4">
      <div className="card">
        <img
          className="card-img-top"
          style={{ height: "329px" }}
          src={blog.img}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">
            {" "}
            {blog?.title?.length > 20
              ? blog?.title?.substr(0, 20)
              : blog?.title}
          </h5>
          {/* TODO fix the number of words limit and elipses */}
          <p className="card-text">
            {blog?.content?.length > 50
              ? blog?.content?.substr(0, 50)
              : blog?.content}
          </p>
        </div>
        <div className="card-body">
          <Link to={`/blog/${blog.id}`} className="card-link">
            Edit
          </Link>
          <button
            type="button"
            className="card-link text-danger"
            data-bs-toggle="modal"
            onClick={() => setDeleteModalId(blog.id)}
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
export default BlogCard;
