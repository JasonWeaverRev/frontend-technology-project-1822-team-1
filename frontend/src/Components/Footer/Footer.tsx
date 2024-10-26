import React, { CSSProperties } from "react";
import "./Footer.css";

function Footer() {

  return (
    <footer className="footer-dd">
      <div className="footer-content-dd">
        <div>© 2024 Dungeon Delver. All rights reserved*.</div>
        <div>Built using the D&D 5e API </div>
        <div className="footer-bottom-dd">*Dungeon Delver is not actually a patented name. We do not reserve any rights to this domain or the content herewithin</div>
        {/* You can add more links or content here */}
      </div>
    </footer>
  );
}

export default Footer;
