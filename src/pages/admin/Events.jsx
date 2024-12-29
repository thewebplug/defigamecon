import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
  } from "@mui/material";
  import { Link } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useEffect } from "react";
// import { deletePoem, getAllPoems } from "../../apis";
import { useState } from "react";  
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteEvent, getAllEvents } from "../../apis";



  const AdminEvents = () => {
    const auth = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const [events, setEvents] = useState([])

    const handleGetEvents = async () => {
        const response = await getAllEvents(auth?.token);
        console.log('getAllEvents', response);
        if(response?.status === 200) {
          setEvents(response?.data);
        }
    }


    useEffect(() => {
        handleGetEvents();
    }, [])

    const handleEventDelete = async (id) => {
      const response = await deleteEvent(auth?.token, id);
      if(response?.status === 200) {
        alert(response?.data?.message)
        handleGetEvents();
      }else{
        alert('Something went wrong please try again')
      }
  }

    
    return (
      <div className="admin-events">
        <Sidebar />
        <div className="main">
          <div className="title">Events</div>
          <Link to="/admin/create-event">
        <button className="register">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M6 12H18M12 6V18"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>{" "}
            </g>
          </svg>
          Create event
        </button>
        </Link>
          <TableContainer className="student_table">
            <Table>
              <TableHead className="student_table-head">
                <TableRow className="student_table-head">
                  <TableCell className="table_row">S/N</TableCell>
                  <TableCell className="table_row">Title</TableCell>
                  <TableCell className="table_row">Description</TableCell>
                  <TableCell className="table_row">Categories</TableCell>
                  <TableCell className="table_row">Update</TableCell>
                  <TableCell className="table_row">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table_body">
                {events?.map((item, index) => <TableRow>
                  <TableCell className="table_row">{index + 1}</TableCell>
                  <TableCell className="table_row">{item?.title}</TableCell>
                  <TableCell className="table_row">{item?.description}</TableCell>
                  <TableCell className="table_row">{item?.categories?.map(category => `${category}, `)}</TableCell>
                 <TableCell className="table_row active"><a 
                 onClick={() => navigate(`/admin/edit-event/${item?._id}`)}
                 >Update Event</a></TableCell>
                 <TableCell className="table_row active"><a 
                 onClick={() => handleEventDelete(item?._id)}
                 >Delete Event</a></TableCell>
                </TableRow>)}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  };
  
  export default AdminEvents;
  