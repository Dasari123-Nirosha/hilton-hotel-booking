
import { useState, useEffect } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Pencil,
  Save,
} from "lucide-react";

import {
  getStorageData,
  saveStorageData,
} from "../../utils/localStorage";

import {
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import { db } from "../../firebase";
import "./Profile.css";

const defaultProfile = {
  fullName: "Guest User",
  email: "",
  phone: "",
  address: "",
};

const profileRef = doc(db, "sharedData", "profile");

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState(() =>
    getStorageData("hilton-profile", defaultProfile)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(
      profileRef,
      async (snapshot) => {
        try {
          if (snapshot.exists()) {
            const cloudProfile = snapshot.data().details;
            setProfile(cloudProfile);
            saveStorageData("hilton-profile", cloudProfile);
          } else {
            const localProfile = getStorageData(
              "hilton-profile",
              defaultProfile
            );

            await setDoc(profileRef, { details: localProfile });
          }
        } catch (error) {
          console.error("Firebase profile error:", error);
        }
      },
      (error) => {
        console.error("Could not load shared profile:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setProfile((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await setDoc(profileRef, { details: profile });
      saveStorageData("hilton-profile", profile);
      setIsEditing(false);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Profile save error:", error);
      alert("Could not save profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setProfile(getStorageData("hilton-profile", defaultProfile));
    setIsEditing(false);
  };

  return (
    <main className="profile-page">
      <section className="profile-heading">
        <p>HILTON GUEST ACCOUNT</p>
        <h1>My Profile</h1>
        <span>Manage your personal information and guest details.</span>
      </section>

      <section className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar">
            <UserRound size={55} />
          </div>
          <h2>{profile.fullName || "Guest User"}</h2>
          <p>HILTON Guest</p>
          <div className="profile-member">
            <CalendarDays size={17} />
            <span>Guest Profile</span>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-details-heading">
            <div>
              <h2>Personal Information</h2>
              <p>Keep your contact details up to date.</p>
            </div>

            {!isEditing && (
              <button
                type="button"
                className="profile-edit-button"
                onClick={() => setIsEditing(true)}
              >
                <Pencil size={16} /> Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleSave}>
            <div className="profile-form-grid">
              <div className="profile-field">
                <label>Full Name</label>
                <div className="profile-input-wrapper">
                  <UserRound size={18} />
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Email Address</label>
                <div className="profile-input-wrapper">
                  <Mail size={18} />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Phone Number</label>
                <div className="profile-input-wrapper">
                  <Phone size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Address</label>
                <div className="profile-input-wrapper">
                  <MapPin size={18} />
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="profile-form-actions">
                <button
                  type="button"
                  className="profile-cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button type="submit" className="profile-save-button">
                  <Save size={17} /> Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}

export default Profile;
