import React from "react";
import "./ProfilePage.css";

function ProfilePage() {
  const username = "rickyly123456789";
  const about_me = "dungeon delver about me";

  const campaigns = ['Campaign 1', 'Campaign 2', 'Campaign 3'];
  const encounters = ['Encounter 1', 'Encounter 2', 'Encounter 3', 'Encounter 4'];
  const user_posts = ['Post 1', 'Post 2', 'Post 3', 'Post 4', 'Post 5'];

  return (
  <>
    {/* User profile header, contains profile pic, username, and about me sections */}
    <div id="profile-bio-section" className="container-fluid row bg-light">
      <div id="image-container" className="col-4 d-flex justify-content-end align-self-start"> {/* Profile picture */}
        <img src="https://picsum.photos/200" alt="Profile placeholder" className="img-fluid" />
      </div>
      <div id="user_bio" className="col-8 text-start">
        <h1 id="username">{username}</h1> {/* Username */}
        <p id="about_me">{about_me}</p> {/* About Me */}
      </div>
    </div>

    <div id="profile-body-section" className="d-flex mt-5">
      <div className="col-1 col-md-2"></div> {/* Empty Space */}

      <div id="campaign-encounter-container" className="col-10 col-md-5">
        <div id="campaigns">
          <h1 className="text-start">Your Campaigns</h1>

          <div>
            {campaigns.map((entry, index) => (
              <div 
                key={index} 
                className="p-2 mb-2" 
                style={{ backgroundColor: 'green', width: '70%', height: '50px' }}>
                {entry}
              </div>
            ))}
          </div>

        </div>

        <div id="encounters" className="mt-4">
          <h1 className="text-start">Your Encounters</h1>

          <div>
            {encounters.map((entry, index) => (
              <div 
                key={index} 
                className="p-2 mb-2" 
                style={{ backgroundColor: 'green', width: '70%', height: '50px' }}>

                {entry}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="forum-post-container" className="col-10 col-md-5">
        <h1 className="text-start">Your Forum Posts</h1>
        <div>
          {user_posts.map((entry, index) => (
            <div 
              key={index} 
              className="p-2 mb-2" 
              style={{ backgroundColor: 'green', width: '70%', height: '50px' }}>

              {entry}
            </div>
          ))}
        </div>
      </div>

      <div className="col-1 col-md-2"></div> {/* Empty Space */}
    </div>
  </>
  )
}

export default ProfilePage;
