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

// Everyone
function HomeContent() {
  return (
    <div className="tabcontent">
      <h2>This is the home page!</h2>
      <p>More will be added soon...</p>
    </div>
  );
}

// Mikhayla
function ChecklistContent() {
  return <div className="tabcontent"></div>;
}

// Mikhayla
function GuestlistContent() {
  return <div className="tabcontent"></div>;
}

// Ahana
function SeatingContent() {
  return <div className="tabcontent"></div>;
}

// Shaylee
function DayOfContent() {
  return <div className="tabcontent"></div>;
}

// Mikhayla
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

// Ahana
function BudgetContent() {
  const categories = {
    "Invites/Stationary": [
      "Guest Book",
      "Pens",
      "Save the Date Cards",
      "Invitations",
    ],
    Transportation: ["Limo/Car Rental", "Shuttle/transportation for guests"],
    "Venue/Catering": [
      "Rehearsal Dinner",
      "Ceremony Facility",
      "Ceremony Officiator",
      "Ushers",
      "Reception Facility",
      "Reception Bar Service",
      "Reception Food Service",
      "Tips",
      "Wedding Cake",
      "Wedding Cake Knife / serving set",
      "Desserts",
    ],
    "Gifts/Favors": [
      "Wedding Favors",
      "Bridal Party Gifts",
      "Groomsmen Gift",
      "Gift for Bride",
      "Gift for Groom",
      "Gifts for Parents",
    ],
    "Photo/Video": ["Engagement Photos", "Wedding Day Photos", "Videographer"],
  };

  const [budgetItems, setBudgetItems] = useState({});
  const [totals, setTotals] = useState({ budgeted: 0, actual: 0 });

  const handleBudgetItemChange = (category, name, budgeted, actual) => {
    setBudgetItems((prevItems) => ({
      ...prevItems,
      [category]: {
        ...prevItems[category],
        [name]: {
          budgeted: parseFloat(budgeted) || 0,
          actual: parseFloat(actual) || 0,
        },
      },
    }));
  };

  useEffect(() => {
    const newTotals = Object.values(budgetItems).reduce(
      (acc, categoryItems) => {
        Object.values(categoryItems).forEach((item) => {
          acc.budgeted += item.budgeted;
          acc.actual += item.actual;
        });
        return acc;
      },
      { budgeted: 0, actual: 0 }
    );
    setTotals(newTotals);
  }, [budgetItems]);

  return (
    <div className="budget-container">
      <h2>Wedding Budget Planner</h2>
      <div className="budget-header">
        <div className="budget-header-name">Item</div>
        <div className="budget-header-budgeted">Budgeted</div>
        <div className="budget-header-actual">Actual</div>
      </div>
      {Object.entries(categories).map(([category, items]) => (
        <BudgetCategory
          key={category}
          category={category}
          items={items}
          onValueChange={handleBudgetItemChange}
        />
      ))}
      <div className="budget-summary">
        <div>Total Budgeted: {totals.budgeted.toFixed(2)}</div>
        <div>Total Actual Spent: {totals.actual.toFixed(2)}</div>
      </div>
    </div>
  );
}

const BudgetItem = ({ category, name, onValueChange }) => {
  const [budgeted, setBudgeted] = useState("");
  const [actual, setActual] = useState("");

  const handleBudgetedChange = (e) => {
    const value = e.target.value;
    setBudgeted(value);
    onValueChange(category, name, value, actual);
  };

  const handleActualChange = (e) => {
    const value = e.target.value;
    setActual(value);
    onValueChange(category, name, budgeted, value);
  };

  return (
    <div className="budget-item">
      <div className="budget-item-name">{name}</div>
      <input
        className="budget-item-input"
        type="number"
        value={budgeted}
        onChange={handleBudgetedChange}
      />
      <input
        className="budget-item-input"
        type="number"
        value={actual}
        onChange={handleActualChange}
      />
    </div>
  );
};

const BudgetCategory = ({ category, items, onValueChange }) => {
  return (
    <div className="budget-category">
      <h2>{category}</h2>
      {items.map((item) => (
        <BudgetItem
          key={item}
          category={category}
          name={item}
          onValueChange={onValueChange}
        />
      ))}
    </div>
  );
};

// Ahana
function CalendarContent() {
  const colors = [
    "#FFB6C1",
    "#FFC0CB",
    "#DC143C",
    "#FFF0F5",
    "#DB7093",
    "#FFA07A",
    "#FA8072",
    "#FF4500",
    "#FFD700",
    "#FFA500",
    "#7FFF00",
    "#7CFC00",
    "#ADFF2F",
    "#006400",
    "#9ACD32",
    "#40E0D0",
    "#20B2AA",
    "#48D1CC",
    "#00FFFF",
    "#5F9EA0",
  ];
  const [events, setEvents] = useState({});
  const [inputValue, setInputValue] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const currentYear = new Date().getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (monthIndex, year) => {
    return Array.from(
      { length: new Date(year, monthIndex + 1, 0).getDate() },
      (_, i) => i + 1
    );
  };
  const handleDayClick = (day, monthIndex) => {
    const dateKey = `${day}-${months[monthIndex]}-${currentYear}`;
    setSelectedDate(dateKey);
    if (events[dateKey]) {
      removeEvent(dateKey);
    }
  };

  const addEvent = () => {
    if (inputValue.trim() && selectedDate) {
      const newEvents = {
        ...events,
        [selectedDate]: { name: inputValue, color: selectedColor },
      };
      setEvents(newEvents);
      setInputValue("");
      setSelectedDate(null);
    }
  };
  const removeEvent = (dateKey) => {
    const updatedEvents = { ...events };
    delete updatedEvents[dateKey];
    setEvents(updatedEvents);
  };

  const getEventListByColor = () => {
    return Object.values(events).reduce((acc, { name, color }) => {
      (acc[color] = acc[color] || new Set()).add(name);
      return acc;
    }, {});
  };

  return (
    <div className="calendar-container">
      <div className="controls">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Event Name"
        />
        <div
          className="color-selector"
          onClick={() => setShowColorOptions(!showColorOptions)}
        >
          <div
            className="selected-color"
            style={{ backgroundColor: selectedColor }}
          ></div>
          {showColorOptions && (
            <div className="color-options">
              {colors.map((color) => (
                <div
                  key={color}
                  className="color-option"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setSelectedColor(color);
                    setShowColorOptions(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <button onClick={addEvent}>Add Event</button>
      </div>

      <div className="legend">
        <h4>Color Legend:</h4>
        {Object.entries(getEventListByColor()).map(([color, eventNames]) => (
          <div key={color} className="legend-item">
            <span
              className="color-box"
              style={{ backgroundColor: color }}
            ></span>
            <span className="event-names">{[...eventNames].join(", ")}</span>
          </div>
        ))}
      </div>

      {months.map((month, index) => (
        <div key={month} className="month-container">
          <h3>{month}</h3>
          <div className="days-grid">
            {getDaysInMonth(index, currentYear).map((day) => {
              const dateKey = `${day}-${month}-${currentYear}`;
              return (
                <div
                  key={day}
                  className={`day ${events[dateKey] ? "event-day" : ""}`}
                  style={{
                    backgroundColor: events[dateKey]?.color || "transparent",
                  }}
                  onClick={() => handleDayClick(day, index)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// Shaylee
function PlaylistContent() {
  return <div className="tabcontent"></div>;
}

// Shaylee
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
