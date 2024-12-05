export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveler in exploration",
    icon: "🧳",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "💕",
    people: "2",
  },
  {
    id: 3,
    title: "Road Trip",
    desc: "Traveling by car to various destinations",
    icon: "🚗",
    people: "3 to 5",
  },
  {
    id: 4,
    title: "Family Adventure",
    desc: "A family embarking on a journey",
    icon: "👨‍👩‍👧‍👦",
    people: "4",
  },
  {
    id: 5,
    title: "Exploring Together",
    desc: "A group of friends traveling together",
    icon: "🕺🎶",
    people: "5 to 20",
  },
  {
    id: 6,
    title: "Luxury Cruise",
    desc: "Traveling on a luxurious cruise ship with gang",
    icon: "🛳️",
    people: "10 to 50",
  },
];

export const selectBudgetOptions = [
  {
    id: 1,
    title: "Economy",
    desc: "Budget-friendly options",
    icon: "👌",
  },
  {
    id: 2,
    title: "Mid-range",
    desc: "Balance between cost and quality",
    icon: "🤷‍♂️",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "😎",
  },
  {
    id: 4,
    title: "Premium",
    desc: "High-end options with extra features",
    icon: "🤑",
  },
  {
    id: 5,
    title: "Executive",
    desc: "Premium options for business use",
    icon: "🎫",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {source} to {destination}, for {totalDays} Days for  {traveler}  with a  {budget}  budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Travel cost, Time travel each of the location for {totalDays} days with each day many plans with best time to visit in only JSON format";
