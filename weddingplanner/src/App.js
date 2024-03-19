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

const checklistData = {
  MB12: [
    "Decide on a budget",
    "Draft a guest list",
    "Research reception and ceremony sites",
    "Throw an Engagement Party",
    "Set your Wedding Date",
    "Research vendors",
    "Book Venue(s)",
    "Pick wedding dress",
    "Hire wedding planner or day-of-coordinator",
  ],
  MB10: [
    "Choose your Wedding party",
    "Book hair and makeup",
    "Book photographer",
    "Book videographer",
    "Book event rentals",
    "Book decorator",
    "Hire an officiant",
    "Book florist",
    "Finalize guest list",
    "Send save the dates",
  ],
  MB8: [
    "Book band/DJ",
    "Go cake tasting",
    "Book desserts",
    "Make a registry",
    "Plan ceremony and reception decor",
    "Choose music for ceremony",
    "Decide on bridesmaid dresses",
  ],
  MB6: [
    "Purchase wedding bands",
    "Plan/book honeymoon",
    "Book rehersal dinner venue",
    "Book hotel block for out of town guests",
  ],
  MB4: [
    "Decide on groomsmen attire",
    "Send out wedding invitations",
    "Order wedding favors",
    "Schedule dance lessons",
  ],
  MB2: [
    "Hair and makeup trial",
    "Apply for marriage license",
    "Finalize menu with caterer",
    "Finalize wedding decor",
    "Finalize wedding cake details",
    "Finalize floral arrangements",
    "Purchase day of accessories",
    "Final dress fitting and alterations",
  ],
  WB1: [
    "Pay outstanding balances to vendors",
    "Write your wedding vows",
    "Make final seating chart",
    "Pick up your wedding rings",
    "Follow up with guests who have not sent RSVP",
    "Inform venue of final guest count",
    "Finalize shot list with photographer",
    "Arrange transportation from reception",
  ],
  DB: [
    "Get manicure and pedicure",
    "Attend Rehersal",
    "Confirm transport for after reception",
    "Pack for and confirm honeymoon reservations",
  ],
  MO: [
    "Eat a healthy breakfast",
    "Pack your emergency kit",
    "Get hair and makeup done",
  ],
};

const categories = [
  { title: "12+ Months Before", name: "MB12" },
  { title: "10-12 Months Before", name: "MB10" },
  { title: "8-10 Months Before", name: "MB8" },
  { title: "6-8 Months Before", name: "MB6" },
  { title: "4-6 Months Before", name: "MB4" },
  { title: "2-4 Months Before", name: "MB2" },
  { title: "1-2 Weeks Before", name: "WB1" },
  { title: "Day Before", name: "DB" },
  { title: "Morning Of", name: "MO" },
];

function ChecklistContent() {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (category, item) => {
    setCheckedItems({
      ...checkedItems,
      [category]: {
        ...checkedItems[category],
        [item]: !checkedItems[category]?.[item],
      },
    });
  };

  return (
    <div className="tabcontent">
      <div className="container">
        <h2>Check List</h2>
        {categories.map(({ title, name }) => (
          <div key={name} className="check-container">
            <h3>{title}</h3>
            {checklistData[name].map((item) => (
              <div key={item}>
                <label>
                  <input
                    type="checkbox"
                    checked={checkedItems[name]?.[item] || false}
                    onChange={() => handleCheckboxChange(name, item)}
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function GuestlistContent() {
  const [guests, setGuests] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputMealPreference, setInputMealPreference] = useState("");
  const [inputRSVP, setInputRSVP] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleNameChange = (e) => {
    setInputName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setInputPhoneNumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setInputAddress(e.target.value);
  };

  const handleMealPreferenceChange = (e) => {
    setInputMealPreference(e.target.value);
  };

  const handleRSVPChange = (e) => {
    setInputRSVP(e.target.checked);
  };

  const handleAddGuest = () => {
    if (inputName.trim() !== "") {
      const newGuest = {
        name: inputName,
        phoneNumber: inputPhoneNumber,
        address: inputAddress,
        mealPreference: inputMealPreference,
        rsvp: inputRSVP,
      };
      setGuests([...guests, newGuest]);
      setInputName("");
      setInputPhoneNumber("");
      setInputAddress("");
      setInputMealPreference("");
      setInputRSVP(false);
    }
  };

  const handleRemoveGuest = (index) => {
    const updatedGuests = [...guests];
    updatedGuests.splice(index, 1);
    setGuests(updatedGuests);
  };

  const handleEditRSVP = (index) => {
    setEditIndex(index);
    setInputRSVP(guests[index].rsvp);
  };

  const handleSaveRSVP = () => {
    const updatedGuests = [...guests];
    updatedGuests[editIndex].rsvp = inputRSVP;
    setGuests(updatedGuests);
    setEditIndex(null);
  };

  return (
    <div className="tabcontent">
      <h2>Guest List</h2>
      <div className="enter-info">
        <div className="input-container">
          <input
            type="text"
            value={inputName}
            onChange={handleNameChange}
            placeholder="Name"
          />
          <input
            type="text"
            value={inputPhoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Phone Number"
          />
          <input
            type="text"
            value={inputAddress}
            onChange={handleAddressChange}
            placeholder="Address"
          />
          <input
            type="text"
            value={inputMealPreference}
            onChange={handleMealPreferenceChange}
            placeholder="Meal Preference"
          />
          <label>
            RSVP:
            <input
              type="checkbox"
              checked={inputRSVP}
              onChange={handleRSVPChange}
            />
          </label>
        </div>
        <div className="button-container">
          {editIndex !== null ? (
            <button onClick={handleSaveRSVP}>Save RSVP</button>
          ) : (
            <button onClick={handleAddGuest}>Add Guest</button>
          )}
        </div>
      </div>
      <div className="list">
        <ul>
          {guests.map((guest, index) => (
            <li key={index}>
              {guest.name} - {guest.phoneNumber} - {guest.address} -{" "}
              {guest.mealPreference} - {guest.rsvp ? "RSVP'd" : "Not RSVP'd"}
              <button onClick={() => handleRemoveGuest(index)}>
                Remove Guest
              </button>
              {!editIndex && (
                <button onClick={() => handleEditRSVP(index)}>Edit RSVP</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SeatingContent() {
  return <div className="tabcontent"></div>;
}

function DayOfContent() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ time: "", description: "" });

  useEffect(() => {
    fetchDayOfEvents();
  }, []);

  const fetchDayOfEvents = async () => {
    try {
      const username = localStorage.getItem("user");
      const response = await fetch(
        `http://localhost:5000/api/dayof/events?username=${username}`
      ); // Fetch events from backend
      const data = await response.json();
      setEvents(data); // Set events state with fetched events
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const addEvent = async (event) => {
    event.preventDefault();
    try {
      const username = localStorage.getItem("user");
      const requestBody = { user: username, ...newEvent }; // Construct the request body
      console.log("Request Body:", requestBody);
      console.log(username);
      const response = await fetch("http://localhost:5000/api/dayof/addEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        const eventData = await response.json();
        setEvents([...events, eventData]);
        setNewEvent({ time: "", description: "" });
      } else {
        throw new Error("Failed to add event");
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }

    const sortedEvents = [...events, newEvent].sort((a, b) =>
      a.time.localeCompare(b.time)
    );
    setEvents(sortedEvents);
    setNewEvent({ time: "", description: "" }); // Reset the input fields
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const removeEvent = async (indexToRemove) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dayof/removeEvent/${indexToRemove}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchDayOfEvents();
      } else {
        throw new Error("Failed to remove event");
      }
    } catch (error) {
      console.error("Error removing event:", error);
    }
  };

  return (
    <div className="tabcontent">
      <div className="timeline-container">
        <h2>Wedding Day Timeline</h2>
        <form onSubmit={addEvent}>
          <input
            type="time"
            name="time"
            value={newEvent.time}
            onChange={handleInputChange}
            requried
          />
          <input
            type="text"
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            placeholder="Enter event description"
            required
          />
          <button type="submit">Add Event</button>
        </form>
        <ul>
          {events.map((event, index) => (
            <li key={index} className="event-item">
              <span>{event.time}</span> - <span>{event.description}</span>
              <button
                onClick={() => removeEvent(event._id)}
                className="remove-button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function VendorContent() {
  const vendors = [
    { title: "Photographer", emoji: "📷" },
    { title: "Videographer", emoji: "🎥" },
    { title: "Caterer", emoji: "🍽️" },
    { title: "Dessert", emoji: "🍰" },
    { title: "Bar", emoji: "🍹" },
    { title: "Decorator", emoji: "🎨" },
    { title: "Florist", emoji: "💐" },
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
        <Vendor key={index} title={vendor.title} emoji={vendor.emoji} />
      ))}
      <input
        style={{ marginLeft: "35%" }}
        type="button"
        value="Save Vendor Information"
        id="save"
      />
    </div>
  );
}

function Vendor({ title, emoji }) {
  return (
    <>
      <h3>
        {title} {emoji}
      </h3>
      <h4>
        Name: <input type="text" id={`${title.toLowerCase()}_name`} />
      </h4>
      <h4>
        Phone Number: <input type="text" id={`${title.toLowerCase()}_number`} />
      </h4>
      <h4>
        E-Mail: <input type="email" id={`${title.toLowerCase()}_email`} />
      </h4>
      <br />
    </>
  );
}

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

function PlaylistContent() {
  const [playlist, setPlaylist] = useState([]);
  const [songValue, setSongValue] = useState("");
  const [artistValue, setArtistValue] = useState("");
  const [spotifyLink, setspotifyLink] = useState("");
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);

  const addToList = () => {
    const newSong = { song: songValue, artist: artistValue };
    setPlaylist([...playlist, newSong]);
    setSongValue("");
    setArtistValue("");
  };

  const deleteItem = (index) => {
    const newPlaylist = [...playlist];
    newPlaylist.splice(index, 1);
    setPlaylist(newPlaylist);
  };

  const handleSpotifyLinkChange = (event) => {
    const link = event.target.value;
    const regex = /playlist\/([a-zA-Z0-9]+)/;
    const match = link.match(regex);
    if (match && match.length > 1) {
      const playlistId = match[1];
      setspotifyLink(`https://open.spotify.com/embed/playlist/${playlistId}`);
    } else {
      setspotifyLink("");
    }
  };

  const handleSpotifyLinkKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.value = ""; // Clear the input value
    }
  };

  const handleArtistKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addToList(); // Add to playlist when Enter key is pressed in artist input
    }
  };

  const handleSavePlaylist = () => {
    if (spotifyLink.trim() !== "") {
      const playlistName = prompt("Enter a name for this playlist:");
      if (playlistName) {
        setSpotifyPlaylists([
          ...spotifyPlaylists,
          { name: playlistName, id: spotifyLink },
        ]);
        setspotifyLink("");
      }
    }
  };

  const handlePlaylistSelect = (id) => {
    setspotifyLink(id);
  };

  const handleDeletePlaylist = (index) => {
    const newPlaylists = [...spotifyPlaylists];
    newPlaylists.splice(index, 1);
    setSpotifyPlaylists(newPlaylists);
  };

  return (
    <div className="tabcontent">
      <h1 className="Title">Playlist</h1>
      <br />
      <a id="spotifyLink" href="" target="_blank">
        Find Your Spotify Library
      </a>
      <div className="PlaylistContainer">
        <div className="SongListContainer">
          <h3 className="PlaylistSubHeaders">Playlist Songs</h3>
          <div className="InputContainer">
            <div>
              <input
                type="text"
                value={songValue}
                placeholder="Song Name"
                onChange={(e) => setSongValue(e.target.value)}
                id="songName"
              />
            </div>
            <div>
              <input
                type="text"
                value={artistValue}
                placeholder="Artist Name"
                onChange={(e) => setArtistValue(e.target.value)}
                onKeyDown={handleArtistKeyDown}
                id="artistName"
              />
            </div>
          </div>
          <button id="AddSongButton" onClick={addToList}>
            {" "}
            Add Song{" "}
          </button>
          <ul>
            {playlist.map((item, index) => (
              <li key={index} className="PlaylistItem">
                {item.song} - {item.artist}
                <span
                  className="DeleteMessage"
                  onClick={() => deleteItem(index)}
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="SpotifyContainer">
          <h3 className="PlaylistSubHeaders">Spotify Playlist</h3>
          <label>
            {" "}
            Enter the playlist link:
            <input
              type="text"
              value={spotifyLink}
              placeholder="Playlist Link"
              onChange={handleSpotifyLinkChange}
              onKeyDown={handleSpotifyLinkKeyDown} // Handle Enter key press
            />
            <p>
              {" "}
              Help: "https://open.spotify.com/embed/playlist/
              <span className="helpMessage">[your-playlist-id-here]</span>
            </p>
          </label>
          <button onClick={handleSavePlaylist}>Save Playlist</button>
          <ul>
            {spotifyPlaylists.map((playlist, index) => (
              <li key={index} id="SpotifyList">
                <span id="PlaylistName">{playlist.name}</span>
                <span id="PlaylistButtons">
                  <span
                    className="PlayButton"
                    onClick={() => handlePlaylistSelect(playlist.id)}
                  >
                    Play
                  </span>{" "}
                  <span
                    className="DeleteButton"
                    onClick={() => handleDeletePlaylist(index)}
                  >
                    Delete
                  </span>
                </span>
              </li>
            ))}
          </ul>
          {spotifyLink && (
            <iframe
              style={{ borderRadius: "12px" }}
              src={spotifyLink}
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}

function MoodBoardContent() {
  const [urlLink, setUrlLink] = useState("");
  const [photos, setPhotos] = useState([]);

  const handleInputChange = (event) => {
    setUrlLink(event.target.value);
  };

  const handleAddPhoto = () => {
    if (urlLink.trim() !== "") {
      setPhotos([...photos, urlLink]);
      setUrlLink("");
    }
  };
  return (
    <div className="tabcontent">
      <h2 className="Title">Mood Board</h2>
      <br />
      <a
        id="pinterestLink"
        href="https://www.pinterest.ca/search/pins/?q=wedding%20mood%20board%20palettes&rs=typed"
        target="_blank"
      >
        Explore Pinterest Ideas
      </a>
      <div>
        <label id="label" htmlFor="urlInput">
          Paste the URL for your inspiration photo here:
        </label>
        <input
          type="text"
          id="urlInput"
          value={urlLink}
          onChange={handleInputChange}
          placeholder="URL..."
        />
        <button onClick={handleAddPhoto}>Add Photo</button>
      </div>
      <div className="ContentContainer">
        {photos.map((photo, index) => (
          <img key={index} src={photo} alt={`Photo ${index}`} />
        ))}
      </div>
    </div>
  );
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
