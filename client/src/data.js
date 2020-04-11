import { v4 as uuid } from "uuid";

export const defaultUser = {
  _id: uuid(),
  username: "username",
  name: "name",
  profile_image:
    "https://img.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg?size=338&ext=jpg"
};
export function getDefaultUser() {
  return {
    _id: uuid(),
    username: "username",
    name: "name",
    profile_image:
      "https://img.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg?size=338&ext=jpg"
  };
}
export const pin1 = {
  _id: uuid(),
  title: "pin-Title-1",
  category: "maisonette",
  latitude: 38.026795441888225,
  longitude: 23.93124740445667,
  content: "This is a test pin1",
  picture:
    "http://res.cloudinary.com/atana/image/upload/v1586588283/maisonette_1_nkjuxm.png"
};
export const pin2 = {
  _id: uuid(),
  title: "pin-Title-2",
  category: "maisonette",
  latitude: 38.02709627962513,
  longitude: 23.932003557059872,
  content: "This is a test pin2",
  picture:
    "http://res.cloudinary.com/atana/image/upload/v1586588283/maisonette_1_nkjuxm.png"
};

export function getPins() {
  return [
    {
      _id: uuid(),
      title: "pin-Title-1",
      category: "maisonette",
      latitude: 38.026795441888225,
      longitude: 23.93124740445667,
      content: "This is a test pin1",
      picture:
        "http://res.cloudinary.com/atana/image/upload/v1586588283/maisonette_1_nkjuxm.png"
    },
    {
      _id: uuid(),
      title: "pin-Title-2",
      category: "maisonette",
      latitude: 38.02709627962513,
      longitude: 23.932003557059872,
      content: "This is a test pin2",
      picture:
        "http://res.cloudinary.com/atana/image/upload/v1586588283/maisonette_1_nkjuxm.png"
    }
  ];
}

export const property = {
  _id: uuid(),
  pin: pin1,
  isRental: false,
  rentals: [],
  owner: ["atana", "lily"],
  remarks: "This is my house were I stay",
  created_at: "2020-02-28T03:08:14.522421+00:00"
};

export const defaultRental = {
  _id: uuid(),
  rent: 1000,
  remarks: "This is my house were I stay",
  created_at: "2020-02-28T03:08:14.522421+00:00"
};

export const rentalProperty = {
  _id: uuid(),
  pin: pin2,
  isRental: true,
  rentals: [defaultRental],
  owner: ["atana", "lily"],
  remarks: "This is my house were I stay",
  created_at: "2020-02-28T03:08:14.522421+00:00"
};

export function getProperty() {
  return {
    _id: uuid(),
    pin: pin1,
    isRental: false,
    rentals: [],
    owner: ["atana", "lily"],
    remarks: "This is my house were I stay",
    created_at: "2020-02-28T03:08:14.522421+00:00"
  };
}
export function getRentalProperty() {
  return {
    _id: uuid(),
    pin: pin2,
    isRental: true,
    rentals: [defaultRental],
    owner: ["atana", "lily"],
    remarks: "This is my house were I stay",
    created_at: "2020-02-28T03:08:14.522421+00:00"
  };
}
export function getProperties() {
  return [
    {
      _id: uuid(),
      pin: pin1,
      isRental: false,
      rentals: [],
      owner: ["atana", "lily"],
      remarks: "This is my house were I stay",
      created_at: "2020-02-28T03:08:14.522421+00:00"
    },
    {
      _id: uuid(),
      pin: pin2,
      isRental: true,
      rentals: [rentals],
      owner: ["atana", "lily"],
      remarks: "This is my house were I stay",
      created_at: "2020-02-28T03:08:14.522421+00:00"
    }
  ];
}

export const rentals = [
  {
    _id: uuid(),
    rent: 1000,
    remarks: "This is rental 1 were I stay",
    created_at: "2020-02-28T03:08:14.522421+00:00"
  },
  {
    _id: uuid(),
    rent: 1500,
    remarks: "This is rental 2 were I stay",
    created_at: "2020-02-28T03:08:14.522421+00:00"
  }
];
