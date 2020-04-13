/** User class for message.ly */

const db = require("../db");
const ExpressError = require("../expressError");
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require("../config")

/** User of the site. */


// const result = await db.query(
//   `INSERT INTO messages (
//         from_username,
//         to_username,
//         body,
//         sent_at)
//       VALUES ($1, $2, $3, current_timestamp)
//       RETURNING id, from_username, to_username, body, sent_at`,
//   [from_username, to_username, body]);

// return result.rows[0];
// }


// TO DECIDE LATER ON IF WE NEED TO PASS IN last_login_at INTO CREATION OF USER

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */
  
   // WHY DOESN'T MESSAGES HAVE SOME DESTRUCTURING OF VARIABLES LIKE THIS
  // const {username, password, first_name, last_name, phone} = req.body;

  static async register({username, password, first_name, last_name, phone}) { 
    
    const result = await db.query(
      `INSERT INTO users (
        username, 
        password, 
        first_name, 
        last_name, 
        phone,
        join_at)
        VALUE ($1, $2, $3, $4, $5, current_timestamp)
        RETURNING username, password, first_name, last_name, phone`, 
        [username, password, first_name, last_name, phone]);
  
        return result.rows[0];
  }
    

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) { }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {id, first_name, last_name, phone}
   */

  static async messagesTo(username) { }
}


module.exports = User;