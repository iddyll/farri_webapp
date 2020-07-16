import { api } from "../utils/api";

const API = new api();

const getSteamID64 = async (custom_id: string): Promise<any> => {
  if (
    custom_id.includes("/") ||
    custom_id.includes(".") ||
    custom_id.includes(",")
  ) {
    return false; // invalid query
  }

  try {
    const steamID64 = await API.getSteamID64(custom_id);
    return steamID64;
  } catch (err) {
    throw new Error(err);
  }
};

// TODO: BRUH YOU GOTTA FIX THIS MESS DOWN BELOW, THERE MUST BE A BETTER WAY!!
const validateQueryGetSteamID = async (
  queryText: string
): Promise<string | boolean> => {
  let customID: string;
  let steamID64: string | Promise<string> | boolean;

  if (queryText.includes("steamcommunity.com")) {
    // Search query that look like "https://steamcommunity.com/id/..."
    if (queryText.includes("steamcommunity.com/id/")) {
      // Try block is used to check that if `queryText` contains "https://"
      // (protocol) or not. Catch block is executed for query like
      // "steamcommunity.com/id/stonecoldman" and try block for query like
      // "https://steamcommunity.com/id/stonecoldman"
      try {
        const parse = new URL(queryText);

        // Validate the protocol, return false if not a valid HTTP protocol.
        if (parse.protocol === "http:" || parse.protocol === "https:") {
          const pathName = parse.pathname;

          // Slice "/id/"
          const slicedPathName = pathName.slice(4);

          // Sometimes the user might enter search query like "/id/stonecoldman/",
          // so we are triming the last "/" otherwise return without trimming
          if (slicedPathName.endsWith("/")) {
            customID = slicedPathName.slice(0, -1);
            // "http://steamcommunity.com/id/stonecoldman/a/aa/", those extra "/"
            steamID64 = getSteamID64(customID);

            return steamID64;
          } else {
            customID = slicedPathName;
            steamID64 = getSteamID64(customID);
            return steamID64;
          }
        } else {
          // Invalid HTTP protocol
          return false;
        }
      } catch (error) {
        // Slice "steamcommunity.com/id/"
        const slicedQuery = queryText.slice(22);

        // Sometimes the user might enter search query like "/id/stonecoldman/",
        // so we are triming the last "/" otherwise return without trimming
        if (slicedQuery.endsWith("/")) {
          customID = slicedQuery.slice(0, -1);

          steamID64 = getSteamID64(customID);
          return steamID64;
        } else {
          customID = slicedQuery;
          steamID64 = getSteamID64(customID);
          return steamID64;
        }
      }
    }

    // Search query that look like "https://steamcommunity.com/profiles/..."
    if (queryText.includes("steamcommunity.com/profiles/")) {
      // Try block is used to check that if `queryText` contains "https://"
      // (protocol) or not. Catch block is executed for query like
      // "steamcommunity.com/profiles/71892379812739123..." and try block for query like
      // "https://steamcommunity.com/profiles/71892379812739123..."
      try {
        const parse = new URL(queryText);

        // Validate the protocol, return false if not a valid HTTP protocol.
        if (parse.protocol === "http:" || parse.protocol === "https:") {
          const pathName = parse.pathname;

          // slice "/profiles/"
          let slicedPathName = pathName.slice(10);

          if (slicedPathName.endsWith("/")) {
            // Sometimes the user might enter search query like "/profiles/",
            // so we are triming the last "/" otherwise return without trimming
            slicedPathName = slicedPathName.slice(0, -1);
          }

          // steamID64 string is of length 17 and starts with "765611"
          if (
            slicedPathName.startsWith("765611") &&
            slicedPathName.length === 17
          ) {
            steamID64 = slicedPathName;

            // Validate if the given steamDI64 by the user is a valid steam id
            const validSteamID = await API.validateSteamID64(steamID64);

            if (validSteamID === steamID64) {
              return steamID64;
            } else {
              return false; // Invalid steamID64 was given by the user
            }
          }
        } else return false; // steamID64 length not 17 & not start with "765611"
      } catch (error) {
        // Slice "steamcommunity.com/profiles/"
        let slicedQuery = queryText.slice(28);

        if (slicedQuery.endsWith("/")) {
          // Sometimes the user might enter search query like "/profiles/",
          // so we are triming the last "/" otherwise return without trimming
          slicedQuery = slicedQuery.slice(0, -1);
        }

        // steamID64 string is of length 17 and starts with "765611"
        if (slicedQuery.startsWith("765611") && slicedQuery.length === 17) {
          steamID64 = slicedQuery;

          // Validate if the given steamDI64 by the user is a valid steam id
          const validSteamID = await API.validateSteamID64(steamID64);

          if (validSteamID === steamID64) {
            return steamID64;
          } else {
            return false; // Invalid steamID64 was given by the user
          }
        } else return false; // steamID64 length not 17 & not start with "765611"
      }
    }

    return false;
  }

  if (queryText.startsWith("765611") && queryText.length === 17) {
    // This if block is executed if the user enters the steamID64
    steamID64 = queryText;

    // Validate if the given steamDI64 by the user is a valid steam id
    const validSteamID = await API.validateSteamID64(steamID64);

    if (validSteamID === steamID64) {
      return steamID64;
    } else {
      return false; // Invalid steamID64 was given by the user
    }
  }

  // The last case can be that the user has entered its CUSTOM_URL that looks
  // like steamcommunity.com/id/{CUSTOM_URL}
  try {
    steamID64 = await getSteamID64(queryText);
    return steamID64;
  } catch (err) {
    throw new Error(err);
  }
};

export default validateQueryGetSteamID;
