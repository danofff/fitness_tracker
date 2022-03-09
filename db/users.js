const { client } = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ username, password }) {
  try {
    const saltCount = Number.parseInt(process.env.SALT_COUNT) || 10;

    const hashedPassword = await bcrypt.hash(password, saltCount);

    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username, password)
            VALUES($1, $2)
            RETURNING *;
        `,
      [username, hashedPassword]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      throw new Error("User does not exist");
    }

    const result = await bcrypt.compare(password, user.password);

    if (user && result) {
      delete user.password;
      return user;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE username = $1;
        `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE id = $1;
        `,
      [id]
    );

    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserByUsername,
  getUserById,
};
