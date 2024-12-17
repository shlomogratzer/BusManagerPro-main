import fs from "fs";
import bcrypt from "bcrypt";
import User from "./models/user"; // המודל של המשתמש
import Bus from "./models/bus"; // המודל של האוטובוס
import Line from "./models/line"; // המודל של הקו
import Room from "./models/room";
/**
 * Encrypts passwords for all users in the provided data array.
 * @param userData - Array of user objects containing plaintext passwords.
 * @returns A promise that resolves to the user data array with encrypted passwords.
 */
async function encryptPasswords(userData: any[]) {
  return Promise.all(
    userData.map(async (user) => {
      if (user.password) {
        // Hash the password using bcrypt
        user.password = await bcrypt.hash(user.password, 10);
      }
      return user;
    })
  );
}

/**
 * Loads initial user data into the database if no users exist.
 * Reads user data from a JSON file, encrypts passwords, and inserts data into the database.
 */
async function loadInitialData() {
  // Read user data from a JSON file
  const userData = JSON.parse(fs.readFileSync("./data/Users.json", "utf8"));

  // Check if the database is empty
  if ((await User.countDocuments()) === 0) {
    // Encrypt passwords before inserting into the database
    const encryptedUserData = await encryptPasswords(userData);
    await User.insertMany(encryptedUserData);
    console.log("Initial users have been added to the database.");
  } else {
    console.log("Users already exist in the database.");
  }

  const busData = JSON.parse(fs.readFileSync("./data/Buses.json", "utf8"));
  const lineData = JSON.parse(fs.readFileSync("./data/Lines.json", "utf8"));
  const roomData = JSON.parse(fs.readFileSync("./data/Room.json", "utf8"));

  if ((await Bus.countDocuments()) === 0) {
    await Bus.insertMany(busData);
    console.log("Initial buses have been added to the database.");
  } else {
    console.log("Buses already exist in the database.");
  }

  // Check if lines exist and insert if necessary
  if ((await Line.countDocuments()) === 0) {
    await Line.insertMany(lineData);
    console.log("Initial lines have been added to the database.");
  } else {
    console.log("Lines already exist in the database.");
  }
  if ((await Room.countDocuments()) === 0) {
    await Room.insertMany(roomData);
    console.log("Initial rooms have been added to the database.");
  } else {
    console.log("Room already exist in the database.");
  }
}

export default loadInitialData;
