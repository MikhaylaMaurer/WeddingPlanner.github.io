import "./App.css";
import { useState, useEffect } from "react";

function Header() {
  return (
    <header>
      <h1>Welcome To Your Wedding Planner!</h1>
    </header>
  );
}

function Sidebar({ onTabChange }) {
  return (
    <div className="sidebar">
      <div className="sidebar-title">Menu</div>
      <div className="tab" onClick={() => onTabChange("home")}>
        Home
      </div>
      <div className="tab" onClick={() => onTabChange("checklist")}>
        Check List
      </div>
      <div className="tab" onClick={() => onTabChange("guestlist")}>
        Guest List
      </div>
      <div className="tab" onClick={() => onTabChange("seating")}>
        Seating
      </div>
      <div className="tab" onClick={() => onTabChange("dayof")}>
        Day of Timeline
      </div>
      <div className="tab" onClick={() => onTabChange("vendors")}>
        Vendors
      </div>
      <div className="tab" onClick={() => onTabChange("budget")}>
        Budget
      </div>
      <div className="tab" onClick={() => onTabChange("calendar")}>
        Calendar
      </div>
      <div className="tab" onClick={() => onTabChange("playlist")}>
        Playlist
      </div>
      <div className="tab" onClick={() => onTabChange("moodboard")}>
        Mood Board
      </div>
    </div>
  );
}

function HomeContent() {
  return (
    <div className="tabcontent">
      <h2>This is the home page!</h2>
      <p>More will be added soon...</p>
    </div>
  );
}

function ChecklistContent() {
  return <div className="tabcontent"></div>;
}

function GuestlistContent() {
  return <div className="tabcontent"></div>;
}

function SeatingContent() {
  return <div className="tabcontent"></div>;
}

function DayOfContent() {
  return <div className="tabcontent"></div>;
}

function VendorContent() {
  const vendors = [
    { title: "Photographer", emoji: "📷" },
    { title: "Videographer", emoji: "🎥" },
    { title: "Caterer", emoji: "🍽️" },
    { title: "Dessert", emoji: "🍰" },
    { title: "Bar", emoji: "🍹" },
    { title: "Decorator", emoji: "🎨" },
    { title: "Florist", emoji: "💐" }
  ];
  return (
    <div className="tabcontent">

      <h2>Vendor List</h2>
      <p>
        This is where you can edit and view your vendor information!
        <br />
        Save your vendor information with the button at the bottom of the page.
      </p>

      {vendors.map((vendor, index) => (
        <Vendor key={index} title={vendor.title} emoji={vendor.emoji}/>
      ))}
      <input style={{marginLeft: '35%'}} type="button" value="Save Vendor Information" id="save"/>
      
    </div>
  );
}

function Vendor({title, emoji}){
  return(
    <>
      <h3>{title} {emoji}</h3>
      <h4>Name: <input type="text" id={`${title.toLowerCase()}_name`} /></h4>
      <h4>Phone Number: <input type="text" id={`${title.toLowerCase()}_number`} /></h4>
      <h4>E-Mail: <input type="email" id={`${title.toLowerCase()}_email`} /></h4>
      <br />
    </>
  );
}

function BudgetContent() {
  return <div className="tabcontent"></div>;
}

function CalendarContent() {
  return <div className="tabcontent"></div>;
}

function PlaylistContent() {
  return <div className="tabcontent"></div>;
}

function MoodBoardContent() {
  return <div className="tabcontent"></div>;
}

function Content({ activeTab }) {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    setContentVisible(true);
  }, [activeTab]);

  let content;
  switch (activeTab) {
    case "home":
      content = <HomeContent />;
      break;
    case "checklist":
      content = <ChecklistContent />;
      break;
    case "guestlist":
      content = <GuestlistContent />;
      break;
    case "seating":
      content = <SeatingContent />;
      break;
    case "dayof":
      content = <DayOfContent />;
      break;
    case "vendors":
      content = <VendorContent />;
      break;
    case "budget":
      content = <BudgetContent />;
      break;
    case "calendar":
      content = <CalendarContent />;
      break;
    case "playlist":
      content = <PlaylistContent />;
      break;
    case "moodboard":
      content = <MoodBoardContent />;
      break;
    default:
      content = null;
  }
  return (
    <aside className={`aside ${contentVisible ? "animate-opacity" : ""}`}>
      {content}
    </aside>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <Header />
      <div className="main-content">
        <Sidebar onTabChange={handleTabChange} />
        <Content activeTab={activeTab} />
      </div>
    </div>
  );
}

export default App;
