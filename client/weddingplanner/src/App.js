import "./App.css";
import Login from "./Login.js";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import TableChairsImg from "./table_chairs.png";

function Header({ onLogout }) {
  return (
    <header>
      <h1>Welcome To Your Wedding Planner!</h1>
      <button onClick={onLogout} className="logoutButton">
        Logout
      </button>
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

  useEffect(() => {
    // Fetch initial checklist data from the server when component mounts
    fetchChecklist();
  }, []);

  const fetchChecklist = async () => {
    try {
      const username = localStorage.getItem("user");
      const response = await fetch(
        `http://localhost:5002/api/checklist/${username}`
      );
      if (response.ok) {
        const data = await response.json();
        setCheckedItems(data.items || {});
      } else {
        console.error("Failed to fetch checklist:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching checklist:", error);
    }
  };

  const handleCheckboxChange = async (category, item) => {
    const updatedCheckedItems = {
      ...checkedItems,
      [category]: {
        ...checkedItems[category],
        [item]: !checkedItems[category]?.[item],
      },
    };
    console.log("Updated checked items:", updatedCheckedItems);

    try {
      const username = localStorage.getItem("user");
      console.log("user: ", username);
      const response = await fetch(
        `http://localhost:5002/api/checklist/${username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: updatedCheckedItems }),
        }
      );

      if (response.ok) {
        setCheckedItems(updatedCheckedItems);
      } else {
        console.error("Failed to update checklist");
      }
    } catch (error) {
      console.error("Error updating checklist:", error);
    }
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

  useEffect(() => {
    // Fetch initial guest list from the server when component mounts
    fetchGuestList();
  }, []);

  const fetchGuestList = async () => {
    try {
      const username = localStorage.getItem("user");
      const response = await fetch(
        `http://localhost:5002/api/guests?username=${username}`
      ); // Assumes your backend route for fetching guests is '/api/guests'
      const data = await response.json();
      setGuests(data);
    } catch (error) {
      console.error("Error fetching guest list:", error);
    }
  };

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

  const handleAddGuest = async () => {
    if (inputName.trim() !== "") {
      const username = localStorage.getItem("user");
      const newGuest = {
        user: username,
        firstName: inputName,
        phoneNumber: inputPhoneNumber,
        address: inputAddress,
        mealPreference: inputMealPreference,
        rsvpStatus: inputRSVP ? "RSVP'd" : "Not RSVP'd",
      };
      try {
        const response = await fetch("http://localhost:5002/api/addGuest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newGuest),
        });
        if (response.ok) {
          fetchGuestList(); // Refresh guest list after adding a guest
          setInputName("");
          setInputPhoneNumber("");
          setInputAddress("");
          setInputMealPreference("");
          setInputRSVP(false);
        } else {
          console.error("Failed to add guest");
        }
      } catch (error) {
        console.error("Error adding guest:", error);
      }
    }
  };

  const handleRemoveGuest = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5002/api/removeGuest/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchGuestList(); // Refresh guest list after removing a guest
      } else {
        console.error("Failed to remove guest");
      }
    } catch (error) {
      console.error("Error removing guest:", error);
    }
  };

  const handleEditRSVP = (index) => {
    setEditIndex(index);
    setInputRSVP(guests[index].rsvpStatus === "RSVP'd");
  };

  const handleSaveRSVP = async () => {
    console.log("editIndex:", editIndex);
    console.log("guests:", guests);
    if (editIndex !== null) {
      const updatedGuests = guests[editIndex];
      console.log("updatedGuest:", updatedGuests);
      updatedGuests.rsvpStatus = inputRSVP ? "RSVP'd" : "Not RSVP'd";
      try {
        const response = await fetch(
          `http://localhost:5002/api/updateGuest/${updatedGuests._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedGuests),
          }
        );

        if (response.ok) {
          fetchGuestList(); // Refresh guest list after updating RSVP
          setEditIndex(null); // Reset edit index
        } else {
          console.error("Failed to update RSVP");
        }
      } catch (error) {
        console.error("Error updating RSVP:", error);
      }
    }
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
            <li key={guest._id}>
              {guest.firstName} - {guest.phoneNumber} - {guest.address} -{" "}
              {guest.mealPreference} -{" "}
              {guest.rsvpStatus === "RSVP'd" ? "RSVP'd" : "Not RSVP'd"}
              <button onClick={() => handleRemoveGuest(guest._id)}>
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
  function TableAndChairs({ tableNum }) {
    const [guests, setGuests] = useState(Array.from({ length: 8 }, () => ""));
    const [activeIndex, setActiveIndex] = useState(null);
    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
      // Directly use tableNum from the component's props
      fetchSeatingData(tableNum);
    }, [tableNum]); // Correctly list tableNum in the dependency array

    const fetchSeatingData = async (tableNum) => {
      try {
        const username = localStorage.getItem("user");
        const response = await fetch(
          `http://localhost:5002/api/seating/${username}`
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          const tableData = data.table.find(
            (table) => table.tableNum === tableNum
          );
          console.log(data);
          console.log(tableData);
          if (tableData) {
            const updatedGuests = Array.from(
              { length: 8 },
              (_, index) => tableData.guests[index] || ""
            );
            setGuests(updatedGuests);
          } else {
            // If no data for the specified table is found, initialize with empty strings
            setGuests(Array.from({ length: 8 }, () => ""));
          }
          //console.log(data);
          //setGuests(data.guests || []);
        } else {
          throw new Error("Failed to fetch seating data");
        }
      } catch (error) {
        console.error("Error fetching guest list:", error);
      }
    };

    const handleGuestNameChange = (index, event) => {
      const updatedGuests = [...guests];
      updatedGuests[index] = event.target.value;
      setGuests(updatedGuests);
    };

    const handleKeyDown = async (event) => {
      if (event.key === "Enter") {
        try {
          const username = localStorage.getItem("user");
          const response = await fetch(
            "http://localhost:5002/api/seating/add",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user: username,
                tableNum: tableNum,
                guests: guests.filter((guest) => guest !== ""),
              }),
            }
          );
          if (response.ok) {
            const updatedGuests = [...guests];
            updatedGuests[activeIndex] = event.target.value;
            setGuests(updatedGuests);
            setActiveIndex(null);
            setShowInput(false); // Hide the input box after hitting enter
          } else {
            console.error("Failed to add guest: ", response.statusText);
          }
        } catch (error) {
          console.error("Error adding guest: ", error);
        }
      }
    };

    const handleTableClick = (index) => {
      setActiveIndex(index);
      setShowInput(true);
    };

    return (
      <div className="tableAndChairsContainer">
        <div className="imageContainer">
          <img
            className="imageProperties"
            src={TableChairsImg}
            alt="TableAndChairsSet"
          />
        </div>
        <div className="guestNamesContainer">
          <table className="guestNamesTable">
            <thead>
              <tr>
                <th colSpan="2">Table {tableNum}</th>
              </tr>
              <tr>
                <th>Seat #</th>
                <th>Guest Name</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }, (_, index) => (
                <tr key={index}>
                  <td onClick={() => handleTableClick(index)}>{index + 1}</td>
                  <td>
                    {activeIndex === index && showInput ? (
                      <input
                        type="text"
                        value={guests[index] || ""}
                        onChange={(event) =>
                          handleGuestNameChange(index, event)
                        }
                        onKeyDown={handleKeyDown}
                        autoFocus
                      />
                    ) : (
                      guests[index] || "" // Render empty string if guest name is not available
                    )}
                  </td>
                </tr>
              ))}
              {/* {guests.map((guest, index) => (
                <tr key={guest._id}>
                  <td onClick={() => handleTableClick(index)}>{index + 1}</td>
                  <td>{activeIndex === index && showInput ? (
                    <input
                      type="text"
                      value={guest}
                      onChange={(event) => handleGuestNameChange(index, event)}
                      onKeyDown={handleKeyDown}
                      autoFocus />
                    //<button onClick={handleGuestSave}>Save</button>
                  ) : (
                    guest
                  )}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="tabcontent SeatingContentContainer">
      <TableAndChairs tableNum={1} />
      <TableAndChairs tableNum={2} />
      <TableAndChairs tableNum={3} />
      <TableAndChairs tableNum={4} />
    </div>
  );
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
        `http://localhost:5002/api/dayof/events?username=${username}`
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
      const response = await fetch("http://localhost:5002/api/dayof/addEvent", {
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
      const response = await fetch(
        `http://localhost:5002/api/dayof/removeEvent/${indexToRemove}`,
        {
          method: "DELETE",
        }
      );
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

  const [vendorData, setVendorData] = useState([]);

  useEffect(() => {
    fetchVendorData();
  }, []);

  const fetchVendorData = async () => {
    try {
      const username = localStorage.getItem("user");
      const response = await fetch(
        `http://localhost:5002/api/vendors/${username}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched vendor data:", data);
        setVendorData(data.vendors || []);
      } else {
        console.error(
          "Failed to fetch vendor information:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching vendor information:", error);
    }
  };

  const handleSave = async () => {
    try {
      const username = localStorage.getItem("user");
      const vendorData = [];

      vendors.forEach((vendor) => {
        const nameInput = document.getElementById(
          `${vendor.title.toLowerCase()}_name`
        );
        const phoneNumberInput = document.getElementById(
          `${vendor.title.toLowerCase()}_number`
        );
        const emailInput = document.getElementById(
          `${vendor.title.toLowerCase()}_email`
        );

        if (nameInput && phoneNumberInput && emailInput) {
          const data = {
            title: vendor.title,
            name: nameInput.value,
            phoneNumber: phoneNumberInput.value,
            email: emailInput.value,
          };
          vendorData.push(data);
        }
      });
      console.log("Vendor Data before sending:", vendorData);

      const response = await fetch("http://localhost:5002/api/vendors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: username, vendors: vendorData }),
      });

      console.log("Response:", response);

      if (response.ok) {
        alert("Vendor information saved successfully!");
      } else {
        throw new Error("Failed to save vendor information");
      }
    } catch (error) {
      console.error("Error saving vendor information:", error);
      alert("Failed to save vendor information.");
    }
  };

  return (
    <div className="tabcontent">
      <h2>Vendor List</h2>
      <p>
        This is where you can edit and view your vendor information!
        <br />
        Save your vendor information with the button at the bottom of the page.
      </p>

      {vendors.map((vendor) => (
        <Vendor
          key={vendor.title}
          title={vendor.title}
          emoji={vendor.emoji}
          vendor={vendorData.find((data) => data.title === vendor.title) || {}} // Pass the corresponding vendor data from vendorData array
        />
      ))}
      <input
        style={{ marginLeft: "35%" }}
        type="button"
        value="Save Vendor Information"
        id="save"
        onClick={handleSave}
      />
    </div>
  );
}

function Vendor({ title, emoji, vendor }) {
  const vendorName = vendor.name || "";
  const vendorPhoneNumber = vendor.phoneNumber || "";
  const vendorEmail = vendor.email || "";

  // Initialize state with values from vendor prop
  const [name, setName] = useState(vendorName);
  const [phoneNumber, setPhoneNumber] = useState(vendorPhoneNumber);
  const [email, setEmail] = useState(vendorEmail);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    // Update state when vendor prop changes
    setName(vendor.name || "");
    setPhoneNumber(vendor.phoneNumber || "");
    setEmail(vendor.email || "");
  }, [vendor]);

  const nameId = `${title.toLowerCase()}_name`;
  const phoneNumberId = `${title.toLowerCase()}_number`;
  const emailId = `${title.toLowerCase()}_email`;

  return (
    <>
      <h3>
        {title} {emoji}
      </h3>
      <h4>
        Name:{" "}
        <input
          type="text"
          id={nameId}
          value={name}
          onChange={handleNameChange}
        />
      </h4>
      <h4>
        Phone Number:{" "}
        <input
          type="text"
          id={phoneNumberId}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </h4>
      <h4>
        E-Mail:{" "}
        <input
          type="email"
          id={emailId}
          value={email}
          onChange={handleEmailChange}
        />
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

  const [budgetData, setBudgetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    try {
      const username = localStorage.getItem("user");
      const response = await fetch(
        `http://localhost:5002/api/budget/${username}`
      );
      if (response.ok) {
        const data = await response.json();
        setBudgetData(data.budgetCategories || []);
      } else {
        console.error("Failed to fetch budget data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching budget data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const username = localStorage.getItem("user");
      const response = await fetch("http://localhost:5002/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: username, budgetCategories: budgetData }),
      });

      if (response.ok) {
        alert("Budget data saved successfully!");
      } else {
        throw new Error("Failed to save budget data");
      }
    } catch (error) {
      console.error("Error saving budget data:", error);
      alert("Failed to save budget data.");
    }
  };

  const handleBudgetItemChange = (
    categoryTitle,
    itemName,
    budgeted,
    actual
  ) => {
    const updatedBudgetData = budgetData.map((category) => {
      if (category.title === categoryTitle) {
        return {
          ...category,
          items: category.items.map((item) => {
            if (item.name === itemName) {
              return { ...item, budgeted, actual };
            }
            return item;
          }),
        };
      }
      return category;
    });
    setBudgetData(updatedBudgetData);
  };

  return (
    <div className="tabcontent">
      <h2>Wedding Budget Planner</h2>
      {isLoading && <div>Loading...</div>}
      {!isLoading && budgetData.length === 0 && (
        <div>No budget data available.</div>
      )}
      {!isLoading && budgetData.length > 0 && (
        <>
          {budgetData.map((category) => (
            <BudgetCategory
              key={category.title}
              category={category.title}
              items={category.items}
              onValueChange={handleBudgetItemChange}
            />
          ))}
          <button onClick={handleSave}>Save Budget</button>
        </>
      )}
    </div>
  );
}

const BudgetItem = ({ category, name, budgeted, actual, onValueChange }) => {
  return (
    <div className="budget-item">
      <div className="budget-item-name">{name}</div>
      <input
        className="budget-item-input"
        type="number"
        value={budgeted}
        onChange={(e) =>
          onValueChange(category, name, parseFloat(e.target.value), actual)
        }
      />
      <input
        className="budget-item-input"
        type="number"
        value={actual}
        onChange={(e) =>
          onValueChange(category, name, budgeted, parseFloat(e.target.value))
        }
      />
    </div>
  );
};

const BudgetCategory = ({ category, items, onValueChange }) => {
  const totalBudgeted = items.reduce((sum, item) => sum + item.budgeted, 0);
  const totalActual = items.reduce((sum, item) => sum + item.actual, 0);

  return (
    <div className="budget-category">
      <h2>{category}</h2>
      {items.map((item) => (
        <BudgetItem
          key={item.name}
          category={category}
          name={item.name}
          budgeted={item.budgeted}
          actual={item.actual}
          onValueChange={onValueChange}
        />
      ))}
      <div className="budget-totals">
        <div>Total Budgeted: ${totalBudgeted.toFixed(2)}</div>
        <div>Total Actual: ${totalActual.toFixed(2)}</div>
      </div>
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

  useEffect(() => {
    fetchEvents();
  }, []);


  const fetchEvents = async () => {
    const username = localStorage.getItem("user");
    const response = await fetch(`http://localhost:5002/api/calendar/events/${username}`);
    const data = await response.json();
    const formattedEvents = data.reduce((acc, event) => {
      // Assuming each event has a unique date, if not, consider using a different structure
      acc[event.date] = { ...event }; // Spread the entire event object, including its _id
      return acc;
    }, {});
    setEvents(formattedEvents);
  };
  
  const removeEvent = async (dateKey) => {
    if (events[dateKey] && events[dateKey]._id) {
      const eventId = events[dateKey]._id;
      const response = await fetch(
        `http://localhost:5002/api/calendar/deleteEvent/${eventId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        fetchEvents(); // Refresh events from the server to ensure UI is up-to-date
      } else {
        console.error("Failed to delete event");
      }
    } else {
      console.warn("Event ID not found for date:", dateKey);
    }
  };
  
  // const fetchEvents = async () => {
  //   const username = localStorage.getItem("user");
  //   const response = await fetch(
  //     `http://localhost:5002/api/calendar/events/${username}`
  //   );
  //   const data = await response.json();
  //   const formattedEvents = data.reduce((acc, event) => {
  //     acc[event.date] = { name: event.eventName, color: event.color };
  //     return acc;
  //   }, {});
  //   setEvents(formattedEvents);
  // };

  const addEvent = async () => {
    if (inputValue.trim() && selectedDate) {
      const username = localStorage.getItem("user");
      const newEvent = {
        user: username,
        date: selectedDate,
        eventName: inputValue,
        color: selectedColor,
      };
      const response = await fetch(
        "http://localhost:5002/api/calendar/addEvent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        }
      );
      if (response.ok) {
        fetchEvents();
        setInputValue("");
        setSelectedDate(null);
      } else {
        console.error("Failed to add event");
      }
    }
  };


  const getEventListByColor = () => {
    return Object.values(events).reduce((acc, event) => {
      const { eventName, color } = event;
      if (!acc[color]) {
        acc[color] = [];
      }
      acc[color].push(eventName);
      return acc;
    }, {});
  };

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

  const fetchPlaylistContent = async () => {
    try {
      const username = localStorage.getItem("user");
      const response = await fetch(
        `http://localhost:5002/api/playlist/${username}`
      );

      if (response.ok) {
        const data = await response.json();
        setPlaylist(data.songs || []);
        setSpotifyPlaylists(data.spotifyPlaylists || []);
      } else {
        console.error(
          "Failed to fetch playlist information: ",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching playlist information: ", error);
    }
  };

  useEffect(() => {
    fetchPlaylistContent();
  }, []);

  const addSongToPlaylist = async () => {
    try {
      const username = localStorage.getItem("user");
      const response = await fetch(
        "http://localhost:5002/api/playlist/addSong",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: username,
            song: songValue,
            artist: artistValue,
          }),
        }
      );

      if (response.ok) {
        await fetchPlaylistContent();
        setSongValue("");
        setArtistValue("");
      } else {
        console.error("Failed to add song to playlist: ", response.statusText);
      }
    } catch (error) {
      console.error("Error adding song to playlist: ", error);
    }
  };

  const deleteSongFromPlaylist = async (id) => 
  {
    const username = localStorage.getItem("user");
    try {
      const response = await fetch(
        `http://localhost:5002/api/playlist/deleteSong/${username}/${id}`,
        { method: "DELETE" }
      );
  
      if (response.ok) 
      {
        // Optionally, refresh the playlist content here
        fetchPlaylistContent();
      } else {
        console.error("Failed to delete song from playlist:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting song from playlist:", error);
    }
  };

  const addSpotifyPlaylist = async (spotifyPlaylistName) => {
    const username = localStorage.getItem("user");
  
    try {
      const response = await fetch("http://localhost:5002/api/playlist/addSpotify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: username,
          url: spotifyLink,
          name: spotifyPlaylistName, // Passed from the prompt
        }),
      });
  
      if (response.ok) {
        await fetchPlaylistContent(); // Refresh the Spotify playlists displayed
        setspotifyLink(""); // Optionally reset the Spotify link
      } else {
        console.error("Failed to add Spotify playlist: ", response.statusText);
      }
    } catch (error) {
      console.error("Error adding Spotify playlist: ", error);
    }
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

  const handleSavePlaylist = () => {
    if (spotifyLink.trim() !== "" && spotifyLink.includes("spotify.com")) {
      const playlistName = prompt("Enter a name for this playlist:");
      if (playlistName) {
        // Adds the new Spotify playlist to the state
        setSpotifyPlaylists(prevPlaylists => [
          ...prevPlaylists,
          { name: playlistName, url: spotifyLink }
        ]);
        setspotifyLink(""); // Reset for next input
      }
    } else {
      alert("Please provide a valid Spotify playlist link.");
    }
  };
  
  
  const handleDeletePlaylist = (index) => {
    setSpotifyPlaylists(prevPlaylists => prevPlaylists.filter((_, i) => i !== index));
  };


  const handlePlaylistSelect = (id) => {
    setspotifyLink(id);
  };

  return (
    <div className="tabcontent">
      <h1 className="Title">Playlist</h1>
      <br />
      <a id="spotifyLink" href="https://open.spotify.com/" target="_blank">
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
                id="artistName"
              />
            </div>
          </div>
          <button id="AddSongButton" onClick={addSongToPlaylist}>
            {" "}
            Add Song{" "}
          </button>
          <ul>
            {playlist.map((item, index) => (
              <li key={index} className="PlaylistItem">
                {item.song} - {item.artist}
                <span
                  className="DeleteMessage"
                  onClick={() => deleteSongFromPlaylist(item._id)}
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
                    onClick={() => handlePlaylistSelect(playlist.url)}>
                    Play
                  </span>
                  {" "}
                  <span
                    className="DeleteButton"
                    onClick={() => handleDeletePlaylist(index)}>
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

  useEffect(() => {
    fetchMoodBoardData();
  }, []);

  const fetchMoodBoardData = async () => {
    try {
      const username = localStorage.getItem("user");
      const response = await fetch(
        `http://localhost:5002/api/moodboard/${username}`
      );

      if (response.ok) {
        const data = await response.json();
        setPhotos(data ? [data] : []);
      } else {
        console.error(
          "Failed to fetch moodboard information:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching moodboard information: ", error);
    }
  };

  const handleInputChange = (event) => {
    setUrlLink(event.target.value);
  };

  const handleAddPhoto = async () => {
    try {
      const username = localStorage.getItem("user");
      const response = await fetch("http://localhost:5002/api/moodboard/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: username, urlLink: urlLink }),
      });
      if (response.ok) {
       // const data = await response.json();
        setPhotos([...photos, urlLink]);
        setUrlLink("");
      } else {
        console.error("Failed to add photo: ", response.statusText);
      }
    } catch (error) {
      console.error("Error adding photo: ", error);
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5002/api/moodboard/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedPhotos = photos.filter((photo) => photo._id !== id);
        setPhotos(updatedPhotos);
      } else {
        console.error("Failed to delete photo: ", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting photo: ", error);
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
          <div key={photo._id} className="PhotoContainer">
            <img src={photo.urlLink} alt={`Photo ${index}`} />
            <button onClick={() => handleDeletePhoto(photo._id)}>Delete</button>
          </div>
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
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    console.log("isLoggedIn after update:", isLoggedIn);
  }, [isLoggedIn]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = () => {
    console.log("Attempting login...");
    console.log("isLoggedIn before login:", isLoggedIn);
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    //sessionStorage.setItem('isLoggedIn', 'true');
    console.log("isLoggedIn after login:", isLoggedIn);
  };

  const handleLogout = () => {
    console.log("Attempting logout...");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  console.log("Rendering App component with isLoggedIn:", isLoggedIn);

  return (
    <div className="container">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Header onLogout={handleLogout} />
          <div className="main-content">
            <Sidebar onTabChange={handleTabChange} />
            <Content activeTab={activeTab} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
