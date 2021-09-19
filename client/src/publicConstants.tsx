export const HOME_PAGE_URL = "http://localhost:3000";
// export const ROOT_API_URL = "http://localhost:5000";
export const ROOT_API_URL = "https://price-guesser-api1.herokuapp.com";

export const CORRECT_TIMEOUT = 0;
export const INCORRECT_TIMEOUT = 0;
// export const CORRECT_TIMEOUT = 1000;
// export const INCORRECT_TIMEOUT = 1500;

const AMAZON_PHOTO_SIZE = 800; // px
export const AMAZON_PHOTO_LINK = (src: string) =>
  `https://m.media-amazon.com/images/I/${src}._AC_UL${AMAZON_PHOTO_SIZE}_.jpg`; //px

export const MINIMUM_VISIT_GAP_FOR_MODAL = 2; //60 * 60; // 1 hour;

export const AMOUNT_OF_JEFF_BEZOS_GIFS_IN_MEDIA_FOLDER_AS_A_NUMBER = 4;
export const JEFF_WAITING_SRC = "media/jeff-bezos-waiting.jpeg";

export const LOW_SCORE_LOSING_PHRASES = [
  "I guess aiming for the bottom of the leaderboard.",
  "after just giving up lol",
  "because you didn't know... the rules ? maybe??",
  "before your younger sibling came in the room, right?",
  "probably thinking this was like golf.",
  "before testing how fast you could end the game.",
];
export const LOSING_PHRASES = [
  "then flew too close to the sun.",
  "but forgot to blink.",
  "and could not sustain the pressure.",
  "but Amazon changed their prices. 🤷‍♀️",
];

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
