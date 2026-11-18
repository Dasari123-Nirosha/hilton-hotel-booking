
import { useState } from "react";
import { Plus, Pencil, Trash2, BedDouble } from "lucide-react";
import { useRooms } from "../../context/RoomContext";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import RoomForm from "../../components/RoomForm/RoomForm";
import "./AdminRooms.css";

function AdminRooms() {
  const { rooms, addRoom, updateRoom, deleteRoom } = useRooms();

  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const handleAdd = () => {
    setEditingRoom(null);
    setShowForm(true);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setShowForm(true);
  };

  const handleSubmit = (roomData) => {
    if (editingRoom) {
      updateRoom(editingRoom.id, roomData);
    } else {
      addRoom(roomData);
    }

    setShowForm(false);
    setEditingRoom(null);
  };

  const handleDelete = (room) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${room.name}?`
    );

    if (confirmed) {
      deleteRoom(room.id);
    }
  };

  return (
    <main className="admin-rooms-page">
      <AdminSidebar />

      <section className="admin-rooms-content">
        <div className="admin-rooms-heading">
          <div>
            <p>HILTON MANAGEMENT</p>
            <h1>Manage Rooms</h1>
            <span>Add, update and manage your hotel rooms.</span>
          </div>

          <button
            type="button"
            className="admin-add-room-button"
            onClick={handleAdd}
          >
            <Plus size={19} />
            Add New Room
          </button>
        </div>

        <div className="admin-rooms-summary">
          <BedDouble size={25} />
          <div>
            <h2>{rooms.length}</h2>
            <p>Total Rooms</p>
          </div>
        </div>

        {showForm && (
          <div className="admin-room-form-container">
            <RoomForm
              room={editingRoom}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingRoom(null);
              }}
            />
          </div>
        )}

        <div className="admin-rooms-table-container">
          <div className="admin-rooms-table-heading">
            <h2>All Hotel Rooms</h2>
            <span>{rooms.length} Rooms</span>
          </div>

          {rooms.length > 0 ? (
            <div className="admin-rooms-list">
              {rooms.map((room) => (
                <article className="admin-room-item" key={room.id}>
                  <img src={room.image} alt={room.name} />

                  <div className="admin-room-info">
                    <p>{room.category}</p>
                    <h3>{room.name}</h3>
                    <span>
                      {room.guests} Guests · ₹
                      {Number(room.price).toLocaleString("en-IN")} / night
                    </span>
                  </div>

                  <div className="admin-room-actions">
                    <button
                      type="button"
                      className="admin-edit-room-button"
                      onClick={() => handleEdit(room)}
                      aria-label={`Edit ${room.name}`}
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      type="button"
                      className="admin-delete-room-button"
                      onClick={() => handleDelete(room)}
                      aria-label={`Delete ${room.name}`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="admin-rooms-empty">
              <BedDouble size={45} />
              <h2>No Rooms Available</h2>
              <p>Add your first room to get started.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default AdminRooms;
