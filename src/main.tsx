import React from "react";
import ReactDOM from "react-dom/client";
import { z } from "zod";
//
enum Hobbies {
  programming,
  gaming,
  reading,
  workingout,
}

const hobbies = [
  "Programming",
  "Reading",
  "Writing",
  "Drawing",
  "Gaming",
] as const;

const UserSchema = z
  .object({
    uuid: z.union([z.string(), z.number()]),
    // as an alternative of the above we can use the or method
    // uuid: z.string().or(z.number()),
    username: z.string().min(4),
    // age: z.number().default(19),
    // birthday: z.date(),
    // isProgrammer: z.literal(true),
    // hobbies: z.enum(hobbies),
    // friends: z.array(z.string()).nonempty(),
    // coords: z.tuple([z.number(), z.string(), z.number()]).rest(z.number()),
    // hobbies: z.nativeEnum(Hobbies),
  })
  .pick({ username: true, uuid: true });

type User = z.infer<typeof UserSchema>;

const user: User = {
  uuid: "24323",
  username: "nitesh",
  // age: 23,
  // birthday: new Date("2001-02-04"),
  // isProgrammer: true,
  // // hobbies: Hobbies.programming,
  // hobbies: "Programming",
  // friends: ["yuu", "aman", "shakti"],
  // coords: [1, "2", 3, 4, 4, 5, 2, 4, 5],
};

console.log(UserSchema.parse(user));

// if we want to use records or like hashmap we can use the followin
const UserMap = z.record(z.string(), z.number());
// if we are using a single paramer inside the record then the key and value both are going to be of the same type

const user = {
  nitesh: 23,
  yuu: 23,
};

console.log(UserMap.parse(user));

// custom emali validation using zod
const brandEmail = z
  .string()
  .email()
  .refine((val) => val.endsWith("@yuu.com"), {
    message: "Email must be a yuu.com email",
  });

const email = "nitesh@yuu.com";
console.log(brandEmail.parse(email));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode></React.StrictMode>
);
