import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";
import { useEncounter } from "../../Context/EncounterContext";

interface Profile {
  email: string;
  username: string;
  about_me: string;
  role: string;
  creation_time: string;
  profile_pic: string;
}

interface Encounter {
  encounter_id: string;
  encounter_title: string;
  monsters: Monster[];
  saves: number;
  creation_time: string;
  campaign_title: string;
  created_by: string;
  setting: string;
}

interface Post {
  written_by: string;
  post_id: string;
  creation_time: string;
  body: string;
  title: string;
}

interface Monster {
  name: string;
  type: string;
}

function ProfilePage() {
  // #region Variables and States

  // Variables to determine view and profile
  const { username } = useParams(); // gets profile name from URL -- the profile to be loaded
  const TOKEN = localStorage.getItem("token") || ""; // get login token from local storage, permission check to edit profile
  const loggedInUser = localStorage.getItem("username") || ""; // gets username of currently logged user
  const isCurrentUser = loggedInUser === username; // check if the user should be able to make changes to this page

  // States that hold data to populate areas
  const [profile, setProfile] = useState<Profile>(); // holds user's profile
  const [encounters, setEncounters] = useState<Encounter[]>([]); // array holding user Encounters
  const [posts, setPosts] = useState<Post[]>([]); // array holding user Posts;

  // States that determine if editor or popups should show
  const [editAboutMe, setEditAboutMe] = useState(""); // holds new about me to patch
  const [isEditing, setIsEditing] = useState(false); // state to manage whether the about me editor is open
  const [encounterToDelete, setEncounterToDelete] = useState<string | null>(
    null
  ); // ID of the encounter to delete
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Whether to show the confirmation popup
  // #endregion

  // #region req/res interceptor setup
  axios.interceptors.request.use(
    (config: any): any => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response: any): any => {
      return response;
    },
    (error) => {
      console.error(error);
      return Promise.reject(error);
    }
  );
  // #endregion

  const user_posts = ["Post 1", "Post 2", "Post 3", "Post 4", "Post 5"];
  // const TOKEN = localStorage.getItem("token");

  // #region Get User Profile info w/ auth token & Edit About Me
  // const [profile, setProfile] = useState<Profile>();
  // const [editAboutMe, setEditAboutMe] = useState("");
  // const [isEditing, setIsEditing] = useState(false);

  const { setEncounter } = useEncounter();

  const getProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/accounts/profile/${username}`, {
      });
      setProfile(response.data.userProfile);
      setEditAboutMe(response.data.userProfile.about_me);
      console.log(profile);
      
    } catch (error) {
      console.error("Error fetching user profile: ", error);
    }
  }

  const updateAboutMe = async () => {
    try {
      await axios.patch(
        `http://localhost:4000/api/accounts/about-me`,
        {
          about_me: editAboutMe,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      setProfile((prev) => ({
        email: prev?.email || "",
        username: prev?.username || "",
        about_me: editAboutMe,
        role: prev?.role || "",
        creation_time: prev?.creation_time || "",
        profile_pic: prev?.profile_pic || ""
      }));
    } catch (error) {
      console.error("Error patching User about me section: ", error);
    } finally {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  // #endregion

  // #region Populates Encounters
  const getUserEncounters = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/encounters/${username}`,
        {
          // sends get request to the backend thru URL
        }
      );
      setEncounters(response.data.encounters); // encounters = response.data
    } catch (error) {
      console.error("Error fetching user encounters: ", error);
    }
  };

  useEffect(() => {
    // runs fetchUserEncounters after mounting (initial render)
    getUserEncounters();
  }, []);
  // #endregion

  // #region delete Encounter
  const deleteEncounter = async (encounter_id: string) => {
    console.log("inside deleteEncounter: ", encounter_id);

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/encounters/encounter`,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`, // Ensure the token is correct
          },
          params: { encounter_id }, // Send the encounter_id as a query parameter
        }
      );

      console.log("Encounter deleted:", response.data);

      setEncounters((prevEncounters) =>
        prevEncounters.filter(
          (encounter) => encounter.encounter_id !== encounter_id
        )
      );
    } catch (error) {
      console.error("Error deleting encounter from user profile: ", error);
    }
  };

  const handleDelete = () => {
    if (encounterToDelete) {
      deleteEncounter(encounterToDelete);
      setShowDeletePopup(false);
    }
  };
  // #endregion

  // #region Populate Forum Posts
  const getUserPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/forums/${username}`
      );
      setPosts(response.data);
      console.log("user posts: ", response.data);
    } catch (error) {
      console.error("Error getting user posts: ", error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, [username]);
  // #endregion

  // Populates "Your Campaigns" field
  const campaigns = Array.from(
    new Set(encounters.map((entry) => entry.campaign_title))
  );

  return (
    <>
      {/* User profile header, contains profile pic, username, and about me sections */}
      <div id="profile-bio-section" className="container-fluid row">
        <div
          id="image-container"
          className="col-4 d-flex justify-content-end align-self-start"
        >
          {" "}
          {/* Profile picture */}
          <img
            src="https://picsum.photos/200"
            alt="Profile placeholder"
            className="img-fluid"
          />
        </div>
        <div id="user_bio" className="col-8 text-start">
          <h1 id="username">{profile?.username}</h1> {/* Username */}
          {isEditing ? (
            <div className="about-me-container">
              <textarea
                value={editAboutMe}
                onChange={(e) => setEditAboutMe(e.target.value)}
                className="form-control mb-2"
                rows={4}
              />
              <button onClick={updateAboutMe} id="save-button">
                Save
              </button>
            </div>
          ) : (
            <div className="about-me-container">
              <p id="about_me">{profile?.about_me}</p> {/* About Me */}
              <button onClick={() => setIsEditing(true)} id="edit-button">
                Edit About Me
              </button>
            </div>
          )}
        </div>
      </div>

      <div id="profile-body-section">
        <div id="campaign-encounter-container" className="col-10 col-md-5">
          <div id="campaigns">
            <h1>Campaigns</h1>

            <div className="card-container">
              {campaigns.map((campaign, index) => (
                <Link
                  to={`/campaign/${encodeURIComponent(campaign)}`}
                  key={index}
                  className="content-card"
                  style={{ textDecoration: "none" }}
                >
                  <h3>{campaign}</h3>
                </Link>
              ))}
            </div>
          </div>

          <div id="encounters" className="mt-4">
            <h1>Encounters</h1>

            <div className="card-container">
              {encounters.map((entry) => {
                const date = new Date(entry.creation_time);
                const formattedDate = date.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <div key={entry.encounter_id} className="content-card">
                    <Link
                      className="title-link"
                      onClick={() => {
                        const thisEncounter = {
                          title: entry.encounter_title,
                          setting: entry.setting,
                          roster: entry.monsters,
                          id: entry.encounter_id,
                        };
                        setEncounter(thisEncounter);
                      }}
                      to={"/encounter"}
                    >
                      {entry.encounter_title}
                    </Link>
                    <p>
                      will be filled with preview of monsters comma separated
                    </p>
                    <div id="encounter-button-container">
                    {isCurrentUser && (
                      <button
                        onClick={() => {
                          setEncounterToDelete(entry.encounter_id);
                          setShowDeletePopup(true);
                        }}
                        className="delete-button"
                      >
                        &times;
                      </button>
                    )}
                    <p className="encounter-date">{formattedDate}</p>
                  </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div id="forum-post-container" className="col-10 col-md-5">
        <h1>Forum Posts</h1>
        <div className="card-container">
          {posts.map((post, index) => {
            const date = new Date(post.creation_time);
            const formattedDate = date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <div key={index} className="content-card">
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <p>{formattedDate}</p>
              </div>
            );
          })}
        </div>
      </div>
      </div>

      
    </>
  );
}

export default ProfilePage;
