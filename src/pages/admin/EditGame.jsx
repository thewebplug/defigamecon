import { Select, MenuItem, Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useForm } from "react-hook-form";
import { getGame, updateGame } from "../../apis";

const EditGame = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {id} = useParams();
  console.log('id', id);
  
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  console.log("errors form react-hook-form", errors);

  const [videoLoading, setVideoLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [videos, setVideos] = useState([]);
  const mediaRef = useRef(null);

  

  const fileUpload = (e, dataType, setListItem, setLoading, mediaType) => {
    if(mediaType === "video"){
      const maxSize = 15 * 1024 * 1024; // 15MB in bytes
      if (e.size > maxSize) {
        setLoading(false);
        alert('File size must be less than 15MB');
        return;
      }
    }else {
      const maxSize = 250 * 1024; // 250KB in bytes
      if (e.size > maxSize) {
        setLoading(false);
        alert('File size must be less than 250KB');
        return;
      }
    }

    setLoading(true);

    // let files = e.target.files;
    // let allUploadedFiles = images;

    const fileToUri = (file, cb) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(null, reader.result);
      };
      reader.onerror = function (error) {
        cb(error, null);
      };
    };

    if (e) {
      // for (let i = 0; i < files.length; i++) {
      fileToUri(e, (err, result) => {
        if (result) {
          axios
            .post(
              // `${process.env.REACT_APP_DEV_URL}/files/upload`,
              `${process.env.REACT_APP_PROD_URL}/files/upload`,
              {
                image: result,
              },
              {
                headers: {
                  Authorization: `Bearer ${auth ? auth.token : ""}`,
                },
              }
            )
            .then((response) => {
              if (dataType === "string") {
                setListItem(response?.data);
              } else {
                setListItem((prev) => [...prev, response?.data]);
              }
              // setPoemMedia(response?.data);
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              console.log("ERROR", error);
              if (error?.response?.data?.message) {
                alert(error?.response?.data?.message);
              } else {
                alert(error?.response?.statusText);
              }
            });
        }
      });
      // }
    }
  };

  const handleMediaAssetRemove = (id, setListItem, dataType) => {
    if(dataType === "string"){
      setListItem(null);
    }else {
      setListItem((prev) => prev.filter((item) => item?.public_id !== id));
    }
  };
  const onSubmit = async (data) => {
    if (image?.length < 1) {
      alert("Please include an image of the past edition of this event");
      return;
    }  else if (videos?.length < 1) {
      alert("Please include videos of the past edition of this event");
      return;
    }
    setLoading(true);

    const response = await updateGame(
      id, 
      {
        ...data,
        image,
        videos,
      },
      auth?.token
    );

    console.log("response", response);

    if (response?.status === 200) {
      alert(response?.data?.message);
      navigate("/admin/games")
      reset();
    } else {
      alert("Something went wrong please try again");
    }
    setLoading(false);
  };

  const handleGetGame = async () => {
    const response = await getGame(id);
    reset(response?.data);
    setImage(response?.data?.image)
    setVideos(response?.data?.videos)
  } 

  useEffect(() => {
    handleGetGame();
  }, [])

  return (
    <div className="admin-form">
      <Sidebar />

      <div className="admin-form__main">
        <svg
          className="admin-form__main__svg"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          onClick={() => navigate("/admin/games")}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#000000"
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
            ></path>
            <path
              fill="#000000"
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
            ></path>
          </g>
        </svg>
        <h1 className="admin-form__main__title">Update game</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="admin-form__main__form"
        >
          <div className="admin-form__main__form__flex">
            <div>
              <label htmlFor="poemTitle">Title</label>
              <input
                required
                type="text"
                id="poemTitle"
                name="poemTitle"
                {...register("title")}
              />
            </div>
            <div>
              <label htmlFor="poemTitle">Creator</label>
              <input
                required
                type="text"
                id="poemTitle"
                name="poemTitle"
                {...register("creator")}
              />
            </div>
            <div>
              <label htmlFor="poemTitle">Categories</label>
              <select
                name=""
                id=""
                {...register("category")}
              >
                {/* This should be a multi selection */}
                {/* categories should limited to 5 */}
                <option value="">Select category</option>
                <option value="Gaming">Gaming</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Tech">Tech</option>
                <option value="Web3">Web3</option>
              </select>
            </div>

       

            <div>
              <label htmlFor="poemTitle">Link</label>
              <input
                required
                type="text"
                id="poemTitle"
                name="poemTitle"
                {...register("link")}
              />
            </div>
          </div>

          <label className="admin-form__main__form__upload-label">Image(maximum size allowed: 250kb)</label>

                  <div className="admin-form__main__form__uploaded">
                      {!!image &&
                          <Badge
                            overlap="circular"
                            onClick={() => handleMediaAssetRemove(image?.public_id, setImage, "string")}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            badgeContent={
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M21.12 6.98L17.02 2.88C16.54 2.4 15.58 2 14.9 2H9.1C8.42 2 7.46 2.4 6.98 2.88L2.88 6.98C2.4 7.46 2 8.42 2 9.1V14.9C2 15.58 2.4 16.54 2.88 17.02L6.98 21.12C7.46 21.6 8.42 22 9.1 22H14.9C15.58 22 16.54 21.6 17.02 21.12L21.12 17.02C21.6 16.54 22 15.58 22 14.9V9.1C22 8.42 21.6 7.46 21.12 6.98ZM16.03 14.97C16.32 15.26 16.32 15.74 16.03 16.03C15.88 16.18 15.69 16.25 15.5 16.25C15.31 16.25 15.12 16.18 14.97 16.03L12 13.06L9.03 16.03C8.88 16.18 8.69 16.25 8.5 16.25C8.31 16.25 8.12 16.18 7.97 16.03C7.68 15.74 7.68 15.26 7.97 14.97L10.94 12L7.97 9.03C7.68 8.74 7.68 8.26 7.97 7.97C8.26 7.68 8.74 7.68 9.03 7.97L12 10.94L14.97 7.97C15.26 7.68 15.74 7.68 16.03 7.97C16.32 8.26 16.32 8.74 16.03 9.03L13.06 12L16.03 14.97Z"
                                  fill="#292D32"
                                />
                              </svg>
                            }
                          >
                            <img className="admin-form__main__form__uploaded__media" src={image?.url} />
                          </Badge>
                      }
                    </div>
          <label className="admin-form__main__form__drop-area-container">
            {!imageLoading && (
               <input
               type="file"
               multiple
               accept="image/*"
               hidden
               onChange={(e) =>
                 fileUpload(
                   e?.target?.files[0],
                   "string",
                   setImage,
                   setImageLoading,
                   "image"
                 )
               }
               ref={mediaRef}
             />
            )}

            <div className="admin-form__main__form__drop-area-container__drop-area">
              <div className="admin-form__main__form__drop-area-container__drop-area__area">
                {imageLoading ? (
                  <div>Loading...</div>
                ) : (
                  <div>
                    <div>Choose an image</div>
                    <div>or drag it here</div>
                  </div>
                )}
              </div>
            </div>
          </label>
         
          <label className="admin-form__main__form__upload-label">Videos(Highlights)(maximum size allowed: 15mb)</label>

          <div className="admin-form__main__form__uploaded">
            {!!videos &&
              videos?.map((video) => (
                <Badge
                  overlap="circular"
                  onClick={() => handleMediaAssetRemove(video?.public_id, setVideos, "array")}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.12 6.98L17.02 2.88C16.54 2.4 15.58 2 14.9 2H9.1C8.42 2 7.46 2.4 6.98 2.88L2.88 6.98C2.4 7.46 2 8.42 2 9.1V14.9C2 15.58 2.4 16.54 2.88 17.02L6.98 21.12C7.46 21.6 8.42 22 9.1 22H14.9C15.58 22 16.54 21.6 17.02 21.12L21.12 17.02C21.6 16.54 22 15.58 22 14.9V9.1C22 8.42 21.6 7.46 21.12 6.98ZM16.03 14.97C16.32 15.26 16.32 15.74 16.03 16.03C15.88 16.18 15.69 16.25 15.5 16.25C15.31 16.25 15.12 16.18 14.97 16.03L12 13.06L9.03 16.03C8.88 16.18 8.69 16.25 8.5 16.25C8.31 16.25 8.12 16.18 7.97 16.03C7.68 15.74 7.68 15.26 7.97 14.97L10.94 12L7.97 9.03C7.68 8.74 7.68 8.26 7.97 7.97C8.26 7.68 8.74 7.68 9.03 7.97L12 10.94L14.97 7.97C15.26 7.68 15.74 7.68 16.03 7.97C16.32 8.26 16.32 8.74 16.03 9.03L13.06 12L16.03 14.97Z"
                        fill="#292D32"
                      />
                    </svg>
                  }
                >
                  <video className="admin-form__main__form__uploaded__media" src={video?.url}></video>
                </Badge>
              ))}
          </div>
          <label className="admin-form__main__form__drop-area-container">
            {!videoLoading && (
              <input
                type="file"
                multiple
                accept="video/*"
                hidden
                onChange={(e) =>
                  fileUpload(
                    e?.target?.files[0],
                    "array",
                    setVideos,
                    setVideoLoading,
                    "video"
                  )
                }
                ref={mediaRef}
              />
            )}
            <div className="admin-form__main__form__drop-area-container__drop-area">
              <div className="admin-form__main__form__drop-area-container__drop-area__area">
                {videoLoading ? (
                  <div>Loading...</div>
                ) : (
                  <div>
                    <div>Choose an image</div>
                    <div>or drag it here</div>
                  </div>
                )}
              </div>
            </div>
          </label>
          <button
            type="submit"
            disabled={loading || imageLoading || videoLoading}
          >
            {loading ? "Loading..." : "Update game"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGame;
